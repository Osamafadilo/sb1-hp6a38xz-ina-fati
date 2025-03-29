import React from 'react';
import DashboardLayout from './DashboardLayout';
import { CreditCard, Users, CalendarCheck, Star, ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'إجمالي الأرباح',
    value: '15,240 ر.س',
    change: '+12.5%',
    trend: 'up',
    icon: <CreditCard className="h-6 w-6 text-primary" />
  },
  {
    title: 'عدد الحجوزات',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: <CalendarCheck className="h-6 w-6 text-green-600" />
  },
  {
    title: 'العملاء الجدد',
    value: '32',
    change: '+3.1%',
    trend: 'up',
    icon: <Users className="h-6 w-6 text-blue-600" />
  },
  {
    title: 'متوسط التقييم',
    value: '4.8',
    change: '+0.3',
    trend: 'up',
    icon: <Star className="h-6 w-6 text-yellow-500" />
  }
];

const recentBookings = [
  {
    id: '#12345',
    customer: 'أحمد محمد',
    service: 'حجز فندق',
    date: '20 مارس 2024',
    amount: '750 ر.س',
    status: 'pending'
  },
  {
    id: '#12344',
    customer: 'سارة علي',
    service: 'حجز شقة',
    date: '19 مارس 2024',
    amount: '500 ر.س',
    status: 'confirmed'
  },
  {
    id: '#12343',
    customer: 'خالد عبدالله',
    service: 'حجز فندق',
    date: '18 مارس 2024',
    amount: '1,200 ر.س',
    status: 'completed'
  }
];

const recentReviews = [
  {
    id: 1,
    customer: 'خالد عبدالله',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid',
    rating: 4,
    date: '18 مارس 2024',
    comment: 'خدمة ممتازة وتجربة رائعة. سأعود مرة أخرى بالتأكيد.'
  },
  {
    id: 2,
    customer: 'نورة أحمد',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noura',
    rating: 5,
    date: '17 مارس 2024',
    comment: 'تجربة مميزة وخدمة راقية جداً.'
  }
];

const DashboardHome = () => {
  return (
    <DashboardLayout>
      <div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium flex items-center ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">آخر الحجوزات</h2>
              <button className="text-primary text-sm hover:underline">
                عرض الكل
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-right border-b">
                    <th className="pb-3 font-medium">رقم الحجز</th>
                    <th className="pb-3 font-medium">العميل</th>
                    <th className="pb-3 font-medium">الخدمة</th>
                    <th className="pb-3 font-medium">التاريخ</th>
                    <th className="pb-3 font-medium">المبلغ</th>
                    <th className="pb-3 font-medium">الحالة</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b">
                      <td className="py-4">{booking.id}</td>
                      <td className="py-4">{booking.customer}</td>
                      <td className="py-4">{booking.service}</td>
                      <td className="py-4">{booking.date}</td>
                      <td className="py-4">{booking.amount}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status === 'pending'
                            ? 'قيد الانتظار'
                            : booking.status === 'confirmed'
                            ? 'مؤكد'
                            : 'مكتمل'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">آخر التقييمات</h2>
              <button className="text-primary text-sm hover:underline">
                عرض الكل
              </button>
            </div>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <img
                        src={review.avatar}
                        alt={review.customer}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{review.customer}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">الأداء</h2>
              <div className="flex items-center space-x-2 space-x-reverse">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-500">+23% هذا الشهر</span>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500">
              سيتم إضافة الرسم البياني هنا
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;