import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import { Search, Calendar, Users, Building, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceType: string;
  customerName: string;
  customerEmail: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

const mockBookings: Booking[] = [
  {
    id: 'B001',
    serviceId: '1',
    serviceName: 'غرفة ديلوكس - فندق القصر الملكي',
    serviceType: 'accommodation',
    customerName: 'أحمد محمد',
    customerEmail: 'ahmed@example.com',
    checkIn: '2024-03-25',
    checkOut: '2024-03-28',
    guests: 2,
    totalPrice: 2250,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-03-20'
  },
  {
    id: 'B002',
    serviceId: '2',
    serviceName: 'جناح عائلي - فندق القصر الملكي',
    serviceType: 'accommodation',
    customerName: 'سارة علي',
    customerEmail: 'sara@example.com',
    checkIn: '2024-03-22',
    checkOut: '2024-03-24',
    guests: 4,
    totalPrice: 1800,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-03-19'
  },
  {
    id: 'B003',
    serviceId: '1',
    serviceName: 'غرفة ديلوكس - فندق القصر الملكي',
    serviceType: 'accommodation',
    customerName: 'خالد عبدالله',
    customerEmail: 'khalid@example.com',
    checkIn: '2024-03-21',
    checkOut: '2024-03-23',
    guests: 2,
    totalPrice: 1500,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-03-18'
  }
];

const DashboardBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'confirmed':
        return 'مؤكد';
      case 'cancelled':
        return 'ملغي';
      case 'completed':
        return 'مكتمل';
      default:
        return status;
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    // In a real application, this would make an API call
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">إدارة الحجوزات</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="ابحث عن حجز..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="all">جميع الحالات</option>
              <option value="pending">قيد الانتظار</option>
              <option value="confirmed">مؤكد</option>
              <option value="cancelled">ملغي</option>
              <option value="completed">مكتمل</option>
            </select>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus === 'paid' ? 'مدفوع' : booking.paymentStatus === 'refunded' ? 'مسترجع' : 'قيد الدفع'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">رقم الحجز: {booking.id}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => handleStatusChange(booking.id, 'cancelled')}
                        >
                          <XCircle className="h-4 w-4 ml-2" />
                          إلغاء
                        </Button>
                        <Button
                          className="bg-primary text-white"
                          onClick={() => handleStatusChange(booking.id, 'confirmed')}
                        >
                          <CheckCircle className="h-4 w-4 ml-2" />
                          تأكيد
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 ml-2" />
                    <div>
                      <p className="font-medium">{booking.customerName}</p>
                      <p className="text-gray-500">{booking.customerEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 ml-2" />
                    <div>
                      <p className="font-medium">موعد الإقامة</p>
                      <p className="text-gray-500">
                        {booking.checkIn} - {booking.checkOut}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 ml-2" />
                    <div>
                      <p className="font-medium">تاريخ الحجز</p>
                      <p className="text-gray-500">{booking.createdAt}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-400 ml-2" />
                    <span className="text-sm text-gray-500">
                      عدد الضيوف: {booking.guests} أشخاص
                    </span>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    {booking.totalPrice} ر.س
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardBookings;