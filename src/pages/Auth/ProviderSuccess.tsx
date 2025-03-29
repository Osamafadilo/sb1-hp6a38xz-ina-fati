import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { Button } from '../../components/ui/button';

const ProviderSuccess = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4 rtl">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            تم استلام طلبك بنجاح!
          </h1>
          
          <p className="text-gray-600 mb-8">
            شكراً لتسجيلك كمقدم خدمة. سيتم مراجعة طلبك خلال 2-3 أيام عمل وسيتم إخطارك عبر البريد الإلكتروني بحالة طلبك.
          </p>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-primary text-white"
            >
              العودة للرئيسية
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/contact')}
              className="w-full"
            >
              تواصل معنا
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProviderSuccess;