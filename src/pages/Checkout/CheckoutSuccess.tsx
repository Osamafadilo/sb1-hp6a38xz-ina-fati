import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { Button } from '../../components/ui/button';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 rtl">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            تم استلام طلبك بنجاح!
          </h1>
          
          <p className="text-gray-600 mb-4">
            رقم الطلب: {orderId}
          </p>

          <p className="text-gray-600 mb-8">
            سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني. يمكنك متابعة حالة طلبك من صفحة الطلبات.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/orders')}
              className="w-full bg-primary text-white"
            >
              متابعة الطلبات
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutSuccess;