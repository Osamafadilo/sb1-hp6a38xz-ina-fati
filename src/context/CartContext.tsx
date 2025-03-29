import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  type: 'accommodation' | 'restaurant' | 'store' | 'service' | 'transport';
  title: string;
  price: number;
  quantity: number;
  providerId: string;
  image: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'pending' | 'paid' | 'refunded';
  details: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    roomType?: string;
    deliveryAddress?: string;
    specialInstructions?: string;
  };
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateItem: (id: string, updates: Partial<CartItem>) => Promise<void>;
  clearCart: () => Promise<void>;
  total: number;
  platformFee: number;
  grandTotal: number;
}

const CartContext = createContext<CartState | undefined>(undefined);

const PLATFORM_FEE_PERCENTAGE = 0.05; // 5% platform fee

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedItems = localStorage.getItem('cartItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [total, setTotal] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    
    const itemsTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const fee = itemsTotal * PLATFORM_FEE_PERCENTAGE;
    const total = itemsTotal + fee;
    
    setTotal(itemsTotal);
    setPlatformFee(fee);
    setGrandTotal(total);
  }, [items]);

  const addItem = async (item: CartItem) => {
    try {
      if (import.meta.env.DEV) {
        setItems(prevItems => {
          const existingItem = prevItems.find(i => i.id === item.id);
          if (existingItem) {
            return prevItems.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            );
          }
          return [...prevItems, { ...item, quantity: 1 }];
        });
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      setItems(prevItems => {
        const existingItem = prevItems.find(i => i.id === item.id);
        if (existingItem) {
          return prevItems.map(i =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prevItems, { ...item, quantity: 1 }];
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };

  const removeItem = async (id: string) => {
    try {
      if (import.meta.env.DEV) {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  };

  const updateItem = async (id: string, updates: Partial<CartItem>) => {
    try {
      if (import.meta.env.DEV) {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === id ? { ...item, ...updates } : item
          )
        );
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }

      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, ...updates } : item
        )
      );
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      if (import.meta.env.DEV) {
        setItems([]);
        return;
      }

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/cart/clear`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateItem,
      clearCart,
      total,
      platformFee,
      grandTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};