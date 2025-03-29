import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShoppingCart, Clock, Check, X, Truck, Calendar, CreditCard, Building } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartHeader.css';

const CartHeader = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart items from backend when component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        // Cart items will be handled by the CartContext
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setError('Failed to load cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'accommodation':
        return <Building className="h-4 w-4" />;
      case 'restaurant':
        return <Truck className="h-4 w-4" />;
      case 'store':
        return <ShoppingCart className="h-4 w-4" />;
      case 'service':
        return <Calendar className="h-4 w-4" />;
      default:
        return <ShoppingCart className="h-4 w-4" />;
    }
  };

  return (
    <div className="cart-header">
      <button
        className="cart-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle cart"
      >
        <ShoppingCart className="h-6 w-6" />
        <span className="cart-count">{items.length}</span>
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header-title">
            <h3>{t('cart')}</h3>
          </div>

          {loading && (
            <div className="p-4 text-center text-gray-500">
              جاري تحميل السلة...
            </div>
          )}

          {error && (
            <div className="p-4 text-center text-red-500">
              {error}
            </div>
          )}

          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-icon">
                  {getTypeIcon(item.type)}
                </div>
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <div className="cart-item-meta">
                    <span className="cart-item-price">
                      {item.price} {t('currency')}
                    </span>
                    {item.details.checkIn && (
                      <span className="text-sm text-gray-500">
                        {item.details.checkIn} - {item.details.checkOut}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {!loading && !error && items.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                السلة فارغة
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="cart-footer">
              <Link 
                to="/checkout" 
                className="view-all-orders"
                onClick={() => setIsOpen(false)}
              >
                إتمام الشراء
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartHeader;