import { User } from './user';

export interface CartItem {
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

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  total: number;
  platformFee: number;
  grandTotal: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  platformFee: number;
  grandTotal: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'unpaid' | 'pending' | 'paid' | 'refunded';
  paymentMethod?: 'credit_card' | 'cash_on_delivery';
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  providerId: string;
  amount: number;
  platformFee: number;
  status: 'pending' | 'completed' | 'refunded';
  paymentMethod: 'credit_card' | 'cash_on_delivery';
  transactionId?: string;
  createdAt: string;
  releasedAt?: string;
}