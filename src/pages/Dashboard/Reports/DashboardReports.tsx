import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building,
  Star,
  Filter,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface ReportMetrics {
  revenue: {
    total: number;
    change: number;
    trend: 'up' | 'down';
  };
  bookings: {
    total: number;
    change: number;
    trend: 'up' | 'down';
  };
  customers: {
    total: number;
    change: number;
    trend: 'up' | 'down';
  };
  occupancy: {
    rate: number;
    change: number;
    trend: 'up' | 'down';
  };
}

interface ServicePerformance {
  id: string;
  name: string;
  revenue: number;
  bookings: number;
  rating: number;
  trend: 'up' | 'down';
  change: number;
}

const mockMetrics: ReportMetrics = {
  revenue: {
    total: 45680,
    change: 12.5,
    trend: 'up'
  },
  bookings: {
    total: 256,
    change: 8.3,
    trend: 'up'
  },
  customers: {
    total: 189,
    change: 15.2,
    trend: 'up'
  },
  occupancy: {
    rate: 78,
    change: -2.1,
    trend: 'down'
  }
};

const mockServicePerformance: ServicePerformance[] = [
  {
    id: '1',
    name: 'فندق القصر الملكي - غرفة ديلوكس',
    revenue: 15200,
    bookings: 45,
    rating: 4.8,
    trend: 'up',
    change: 12.3
  },
  {
    id: '2',
    name: 'فندق القصر الملكي - جناح عائلي',
    revenue: 28500,
    bookings: 32,
    rating: 4.6,
    trend: 'up',
    change: 8.7
  },
  {
    id: '3',
    name: 'شقة مفروشة الصفوة',
    revenue: 12800,
    bookings: 28,
    rating: 4.5,
    trend: 'down',
    change: -3.2
  }
];

const DashboardReports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['revenue', 'bookings']);

  const handleExportReport = () => {
    // In a real application, this would generate and download a report
    console.log('Exporting report...');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">التقارير والتحليلات</h2>
            <p className="text-gray-500 mt-1">تحليل أداء الخدمات والإيرادات</p>
          </div>
          <div className="flex gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="today">اليوم</option>
              <option value="week">هذا الأسبوع</option>
              <option value="month">هذا الشهر</option>
              <option value="quarter">هذا الربع</option>
              <option value="year">هذا العام</option>
            </select>
            <Button
              onClick={handleExportReport}
              className="bg-primary text-white flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              تصدير التقرير
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className={`flex items-center ${
                mockMetrics.revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {mockMetrics.revenue.trend === 'up' ? (
                  <ArrowUpRight className="h-5 w-5" />
                ) : (
                  <ArrowDownRight className="h-5 w-5" />
                )}
                <span className="text-sm">{mockMetrics.revenue.change}%</span>
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">إجمالي الإيرادات</h3>
            <p className="text-2xl font-bold">{mockMetrics.revenue.total} ر.س</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className={`flex items-center ${
                mockMetrics.bookings.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {mockMetrics.bookings.trend === 'up' ? (
                  <ArrowUpRight className="h-5 w-5" />
                ) : (
                  <ArrowDownRight className="h-5 w-5" />
                )}
                <span className="text-sm">{mockMetrics.bookings.change}%</span>
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">إجمالي الحجوزات</h3>
            <p className="text-2xl font-bold">{mockMetrics.bookings.total}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className={`flex items-center ${
                mockMetrics.customers.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {mockMetrics.customers.trend === 'up' ? (
                  <ArrowUpRight className="h-5 w-5" />
                ) : (
                  <ArrowDownRight className="h-5 w-5" />
                )}
                <span className="text-sm">{mockMetrics.customers.change}%</span>
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">العملاء النشطون</h3>
            <p className="text-2xl font-bold">{mockMetrics.customers.total}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Building className="h-6 w-6 text-orange-600" />
              </div>
              <div className={`flex items-center ${
                mockMetrics.occupancy.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {mockMetrics.occupancy.trend === 'up' ? (
                  <ArrowUpRight className="h-5 w-5" />
                ) : (
                  <ArrowDownRight className="h-5 w-5" />
                )}
                <span className="text-sm">{Math.abs(mockMetrics.occupancy.change)}%</span>
              </div>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">معدل الإشغال</h3>
            <p className="text-2xl font-bold">{mockMetrics.occupancy.rate}%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">تحليل الإيرادات</h3>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                تصفية
              </Button>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500">
              سيتم إضافة الرسم البياني للإيرادات هنا
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">تحليل الحجوزات</h3>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                تصفية
              </Button>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500">
              سيتم إضافة الرسم البياني للحجوزات هنا
            </div>
          </div>
        </div>

        {/* Service Performance */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">أداء الخدمات</h3>
            <div className="flex gap-4">
              <select
                className="rounded-md border border-gray-300 px-3 py-2"
                defaultValue="revenue"
              >
                <option value="revenue">حسب الإيرادات</option>
                <option value="bookings">حسب الحجوزات</option>
                <option value="rating">حسب التقييم</option>
              </select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                تصفية
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-right border-b">
                  <th className="pb-3 font-medium">الخدمة</th>
                  <th className="pb-3 font-medium">الإيرادات</th>
                  <th className="pb-3 font-medium">الحجوزات</th>
                  <th className="pb-3 font-medium">التقييم</th>
                  <th className="pb-3 font-medium">التغيير</th>
                </tr>
              </thead>
              <tbody>
                {mockServicePerformance.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="py-4">{service.name}</td>
                    <td className="py-4">{service.revenue} ر.س</td>
                    <td className="py-4">{service.bookings}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                        {service.rating}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className={`flex items-center ${
                        service.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {service.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 ml-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 ml-1" />
                        )}
                        {service.change}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">توزيع العملاء</h3>
            <div className="h-48 flex items-center justify-center text-gray-500">
              سيتم إضافة رسم بياني دائري هنا
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">معدل الإشغال الشهري</h3>
            <div className="h-48 flex items-center justify-center text-gray-500">
              سيتم إضافة رسم بياني خطي هنا
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">متوسط التقييمات</h3>
            <div className="h-48 flex items-center justify-center text-gray-500">
              سيتم إضافة رسم بياني عمودي هنا
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardReports;