export interface CartItem {
  id: string;
  type: 'accommodation' | 'restaurant' | 'store' | 'service';
  title: string;
  price: number;
  quantity: number;
  image: string;
  details: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    roomType?: string;
  };
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}