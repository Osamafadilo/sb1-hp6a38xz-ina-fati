import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/ui/button';
import { Trash2, CreditCard, Wallet } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout/MainLayout';

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateItem, total, platformFee, grandTotal } = useCart();
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateItem(id, { quantity: newQuantity });
    }
  };

  const handleRemoveItem = async (id: string) => {
    try {
      await removeItem(id);
    } catch (error) {
      console.error('Error removing item:', error);
      // Show error message to user
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 rtl">
        <h1 className="text-2xl font-bold mb-8">سلة المشتريات</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">السلة فارغة</p>
            <Button
              onClick={() => navigate('/services')}
              className="bg-primary text-white"
            >
              تصفح الخدمات
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.title}</h3>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">
                      {item.details.checkIn && (
                        <>
                          {item.details.checkIn} - {item.details.checkOut}
                          <br />
                          {item.details.guests} ضيوف
                        </>
                      )}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-2 py-1 border rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2 py-1 border rounded"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold">
                        {item.price * item.quantity} ر.س
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
              <h2 className="text-lg font-semibold mb-4">ملخص الطلب</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>المجموع</span>
                  <span>{total} ر.س</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>رسوم المنصة (5%)</span>
                  <span>{platformFee} ر.س</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>الإجمالي</span>
                    <span>{grandTotal} ر.س</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <CreditCard className="h-5 w-5" />
                  {loading ? 'جاري المعالجة...' : 'الدفع الإلكتروني'}
                </Button>
                <Button
                  onClick={handleCheckout}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <Wallet className="h-5 w-5" />
                  الدفع عند الاستلام
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                بالضغط على زر الدفع، أنت توافق على شروط الخدمة وسياسة الخصوصية
              </p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;