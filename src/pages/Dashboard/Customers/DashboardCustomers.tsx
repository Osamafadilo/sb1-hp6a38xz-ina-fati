import React, { useState, useEffect } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import {
  Search,
  Users,
  UserPlus,
  Calendar,
  Star,
  Filter,
  Mail,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Building,
  TrendingUp,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location: string;
  joinDate: string;
  totalBookings: number;
  totalSpent: number;
  lastBooking?: {
    id: string;
    service: string;
    date: string;
    amount: number;
    checkOut?: string;
  };
  status: 'active' | 'inactive' | 'archived';
  bookings: {
    id: string;
    service: string;
    date: string;
    checkOut: string;
    amount: number;
    status: 'completed' | 'upcoming' | 'cancelled';
  }[];
  reviews: {
    id: string;
    service: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  lastActive: string;
}

interface CustomerStats {
  totalCustomers: number;
  activeCustomers: number;
  newCustomersThisMonth: number;
  customerRetentionRate: number;
}

const mockCustomers: Customer[] = [
  {
    id: 'C001',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    location: 'الرياض، المملكة العربية السعودية',
    joinDate: '2024-01-15',
    totalBookings: 5,
    totalSpent: 4500,
    lastBooking: {
      id: 'B001',
      service: 'فندق القصر الملكي - غرفة ديلوكس',
      date: '2024-03-20',
      amount: 750,
      checkOut: '2024-03-25'
    },
    status: 'active',
    bookings: [
      {
        id: 'B001',
        service: 'فندق القصر الملكي - غرفة ديلوكس',
        date: '2024-03-20',
        checkOut: '2024-03-25',
        amount: 750,
        status: 'upcoming'
      },
      {
        id: 'B002',
        service: 'فندق القصر الملكي - جناح عائلي',
        date: '2024-02-15',
        checkOut: '2024-02-18',
        amount: 1200,
        status: 'completed'
      }
    ],
    reviews: [
      {
        id: 'R001',
        service: 'فندق القصر الملكي - غرفة ديلوكس',
        rating: 5,
        comment: 'تجربة رائعة! الغرفة نظيفة ومريحة والخدمة ممتازة.',
        date: '2024-02-16'
      }
    ],
    lastActive: '2024-03-20'
  }
];

const customerStats: CustomerStats = {
  totalCustomers: 256,
  activeCustomers: 180,
  newCustomersThisMonth: 24,
  customerRetentionRate: 85
};

const DashboardCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('active');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const shouldArchiveCustomer = (customer: Customer) => {
    const now = new Date();
    const lastBookingCheckOut = customer.lastBooking?.checkOut 
      ? new Date(customer.lastBooking.checkOut)
      : null;
    
    if (lastBookingCheckOut) {
      const timeSinceCheckout = now.getTime() - lastBookingCheckOut.getTime();
      const hasUpcomingBookings = customer.bookings.some(booking => 
        new Date(booking.date) > now && booking.status === 'upcoming'
      );

      return !hasUpcomingBookings && timeSinceCheckout > (24 * 60 * 60 * 1000);
    }

    return false;
  };

  useEffect(() => {
    const updateCustomerStatuses = () => {
      setCustomers(prevCustomers => 
        prevCustomers.map(customer => {
          if (shouldArchiveCustomer(customer)) {
            return { ...customer, status: 'archived' };
          }
          return customer;
        })
      );
    };

    updateCustomerStatuses();
    const interval = setInterval(updateCustomerStatuses, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    
    return matchesSearch && matchesStatus && customer.status !== 'archived';
  });

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">إدارة العملاء</h2>
          <Button
            className="bg-primary text-white flex items-center gap-2"
          >
            <UserPlus className="h-5 w-5" />
            إضافة عميل جديد
          </Button>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-400" />
            <div className="mr-3">
              <p className="text-sm text-blue-700">
                يتم أرشفة العملاء تلقائياً بعد 24 ساعة من انتهاء آخر حجز لهم، ولن يظهروا في القائمة الرئيسية.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">إجمالي العملاء</h3>
            <p className="text-2xl font-bold">{customerStats.totalCustomers}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">عملاء جدد هذا الشهر</h3>
            <p className="text-2xl font-bold">{customerStats.newCustomersThisMonth}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-green-600">+5.2%</span>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">العملاء النشطون</h3>
            <p className="text-2xl font-bold">{customerStats.activeCustomers}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm text-green-600">+2.3%</span>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">معدل الاحتفاظ بالعملاء</h3>
            <p className="text-2xl font-bold">{customerStats.customerRetentionRate}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {selectedCustomer ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCustomer(null)}
                >
                  العودة للقائمة
                </Button>
                <Button className="bg-primary text-white">
                  تحرير البيانات
                </Button>
              </div>

              <div className="flex items-start gap-6 mb-8">
                <img
                  src={selectedCustomer.avatar}
                  alt={selectedCustomer.name}
                  className="w-24 h-24 rounded-full"
                />
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedCustomer.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      {selectedCustomer.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      {selectedCustomer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {selectedCustomer.location}
                    </div>
                  </div>
                </div>
                <div className="mr-auto text-left">
                  <div className="text-sm text-gray-500">تاريخ الانضمام</div>
                  <div className="font-medium">{selectedCustomer.joinDate}</div>
                  <div className="mt-2 text-sm text-gray-500">الحالة</div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    selectedCustomer.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedCustomer.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                  <TabsTrigger value="bookings">الحجوزات</TabsTrigger>
                  <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <h4 className="font-medium">إجمالي الحجوزات</h4>
                      </div>
                      <p className="text-2xl font-bold">{selectedCustomer.totalBookings}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <h4 className="font-medium">إجمالي الإنفاق</h4>
                      </div>
                      <p className="text-2xl font-bold">{selectedCustomer.totalSpent} ر.س</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Star className="h-5 w-5 text-gray-400" />
                        <h4 className="font-medium">التقييمات</h4>
                      </div>
                      <p className="text-2xl font-bold">{selectedCustomer.reviews.length}</p>
                    </div>
                  </div>

                  {selectedCustomer.lastBooking && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-4">آخر حجز</h4>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{selectedCustomer.lastBooking.service}</div>
                          <div className="text-primary font-bold">
                            {selectedCustomer.lastBooking.amount} ر.س
                          </div>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 ml-2" />
                          {selectedCustomer.lastBooking.date}
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="bookings" className="mt-6">
                  <div className="space-y-4">
                    {selectedCustomer.bookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium">{booking.service}</div>
                            <div className="flex items-center text-gray-500 text-sm mt-1">
                              <Calendar className="h-4 w-4 ml-2" />
                              {booking.date}
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="text-primary font-bold">
                              {booking.amount} ر.س
                            </div>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                              booking.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'upcoming'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.status === 'completed'
                                ? 'مكتمل'
                                : booking.status === 'upcoming'
                                ? 'قادم'
                                : 'ملغي'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <div className="space-y-4">
                    {selectedCustomer.reviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{review.service}</div>
                          <div className="flex">
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
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <div className="text-sm text-gray-500">
                          <Clock className="h-4 w-4 inline ml-1" />
                          {review.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="ابحث عن عميل..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="active">العملاء النشطون</option>
                    <option value="inactive">العملاء غير النشطين</option>
                    <option value="archived">العملاء المؤرشفون</option>
                    <option value="all">جميع العملاء</option>
                  </select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    فلترة متقدمة
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleCustomerClick(customer)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold">{customer.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{customer.email}</span>
                            <span>{customer.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-500 mb-1">إجمالي الحجوزات</div>
                        <div className="font-medium">{customer.totalBookings} حجز</div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm text-gray-500 mb-1">إجمالي الإنفاق</div>
                        <div className="font-medium">{customer.totalSpent} ر.س</div>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          customer.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {customer.status === 'active' ? 'نشط' : 'غير نشط'}
                        </span>
                        {customer.status === 'archived' && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            مؤرشف
                          </span>
                        )}
                      </div>
                    </div>
                    {customer.lastBooking?.checkOut && (
                      <div className="mt-2 text-sm text-gray-500">
                        آخر موعد مغادرة: {customer.lastBooking.checkOut}
                      </div>
                    )}
                  </div>
                ))}

                {filteredCustomers.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    لا يوجد عملاء مطابقون للبحث
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardCustomers;