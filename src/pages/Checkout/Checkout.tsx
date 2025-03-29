import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  CreditCard,
  Wallet,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  AlertTriangle
} from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, platformFee, grandTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'cash_on_delivery'>('credit_card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const orderResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          items,
          total,
          platformFee,
          grandTotal,
          paymentMethod,
          customerDetails: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address
          }
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const order = await orderResponse.json();

      if (paymentMethod === 'credit_card') {
        // Process payment
        const paymentResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/payments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            orderId: order.id,
            amount: grandTotal,
            cardDetails: {
              number: formData.cardNumber,
              expiryDate: formData.expiryDate,
              cvv: formData.cvv
            }
          }),
        });

        if (!paymentResponse.ok) {
          throw new Error('Payment failed');
        }
      }

      // Clear cart and redirect to success page
      await clearCart();
      navigate('/checkout/success', { state: { orderId: order.id } });
    } catch (error) {
      console.error('Checkout error:', error);
      // Show error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 rtl">
        <h1 className="text-2xl font-bold mb-8">إتمام الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">معلومات العميل</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">الاسم</Label>
                  <div className="relative mt-1">
                    <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">العنوان</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">طريقة الدفع</h2>
              <div className="space-y-4">
                <button
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`w-full p-4 border rounded-lg flex items-center gap-3 ${
                    paymentMethod === 'credit_card' ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <CreditCard className={`h-5 w-5 ${
                    paymentMethod === 'credit_card' ? 'text-primary' : 'text-gray-400'
                  }`} />
                  <div className="text-right">
                    <div className="font-medium">الدفع الإلكتروني</div>
                    <div className="text-sm text-gray-500">بطاقة ائتمان أو مدى</div>
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`w-full p-4 border rounded-lg flex items-center gap-3 ${
                    paymentMethod === 'cash_on_delivery' ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <Wallet className={`h-5 w-5 ${
                    paymentMethod === 'cash_on_delivery' ? 'text-primary' : 'text-gray-400'
                  }`} />
                  <div className="text-right">
                    <div className="font-medium">الدفع عند الاستلام</div>
                    <div className="text-sm text-gray-500">الدفع نقداً عند استلام الخدمة</div>
                  </div>
                </button>

                {paymentMethod === 'credit_card' && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">رقم البطاقة</Label>
                      <div className="relative mt-1">
                        <CreditCard className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="pr-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">رمز الأمان</Label>
                        <div className="relative">
                          <Shield className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="pr-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">ملخص الطلب</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">
                        {item.details.checkIn && (
                          <>
                            {item.details.checkIn} - {item.details.checkOut}
                            <br />
                            {item.details.guests} ضيوف
                          </>
                        )}
                      </p>
                    </div>
                    <div className="text-left">
                      <span className="font-medium">{item.price * item.quantity} ر.س</span>
                      <div className="text-sm text-gray-500">الكمية: {item.quantity}</div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>المجموع</span>
                    <span>{total} ر.س</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>رسوم المنصة (5%)</span>
                    <span>{platformFee} ر.س</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>الإجمالي</span>
                      <span>{grandTotal} ر.س</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <div className="mr-3">
                  <p className="text-sm text-yellow-700">
                    سيتم تعليق المبلغ حتى اكتمال الخدمة وتأكيد الاستلام
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-primary text-white"
              disabled={loading}
            >
              {loading ? 'جاري المعالجة...' : 'تأكيد الطلب'}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              بالضغط على زر تأكيد الطلب، أنت توافق على شروط الخدمة وسياسة الخصوصية
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;