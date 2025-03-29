import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { Button } from '../../components/ui/button';
import { Check } from 'lucide-react';

const BookingConfirmation = () => {
  const { accommodationId, roomId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Mock data - In a real app, this would come from your backend
  const bookingDetails = {
    id: `${accommodationId}-${roomId}-${Date.now()}`,
    type: 'accommodation',
    title: 'فندق القصر الملكي - غرفة ديلوكس',
    price: 750,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    details: {
      checkIn: '2024-03-20',
      checkOut: '2024-03-25',
      guests: 2,
      roomType: 'غرفة ديلوكس'
    }
  };

  const handleAddToCart = () => {
    addItem(bookingDetails);
    setIsAdded(true);
    setTimeout(() => {
      navigate('/accommodations');
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 rtl">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              تم تأكيد الحجز بنجاح!
            </h2>
            <p className="text-gray-600">
              تمت إضافة حجزك إلى السلة. يمكنك مراجعة تفاصيل الحجز وإتمام عملية الدفع.
            </p>
          </div>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">تفاصيل الحجز:</span>
              <span className="text-primary">{bookingDetails.title}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="block font-medium">موعد الوصول:</span>
                <span>{bookingDetails.details.checkIn}</span>
              </div>
              <div>
                <span className="block font-medium">موعد المغادرة:</span>
                <span>{bookingDetails.details.checkOut}</span>
              </div>
              <div>
                <span className="block font-medium">عدد الضيوف:</span>
                <span>{bookingDetails.details.guests} أشخاص</span>
              </div>
              <div>
                <span className="block font-medium">نوع الغرفة:</span>
                <span>{bookingDetails.details.roomType}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold">المبلغ الإجمالي:</span>
            <span className="text-2xl font-bold text-primary">
              {bookingDetails.price} ر.س
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white hover:bg-primary/90"
              disabled={isAdded}
            >
              {isAdded ? 'تمت الإضافة إلى السلة' : 'إضافة إلى السلة'}
            </Button>
            <Button
              onClick={() => navigate('/accommodations')}
              variant="outline"
              className="w-full"
            >
              العودة إلى قائمة الإقامات
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingConfirmation;