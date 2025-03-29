import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import {
  Search,
  CreditCard,
  Calendar,
  Download,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  FileText,
  Wallet,
  DollarSign
} from 'lucide-react';

interface Transaction {
  id: string;
  bookingId: string;
  customerName: string;
  serviceName: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  type: 'payment' | 'refund';
  paymentMethod: string;
  date: string;
}

interface PaymentSummary {
  totalRevenue: number;
  pendingAmount: number;
  completedTransactions: number;
  refundedAmount: number;
}

const mockTransactions: Transaction[] = [
  {
    id: 'T001',
    bookingId: 'B001',
    customerName: 'أحمد محمد',
    serviceName: 'غرفة ديلوكس - فندق القصر الملكي',
    amount: 2250,
    status: 'completed',
    type: 'payment',
    paymentMethod: 'بطاقة ائتمان',
    date: '2024-03-20'
  },
  {
    id: 'T002',
    bookingId: 'B002',
    customerName: 'سارة علي',
    serviceName: 'جناح عائلي - فندق القصر الملكي',
    amount: 1800,
    status: 'pending',
    type: 'payment',
    paymentMethod: 'تحويل بنكي',
    date: '2024-03-19'
  },
  {
    id: 'T003',
    bookingId: 'B003',
    customerName: 'خالد عبدالله',
    serviceName: 'غرفة ديلوكس - فندق القصر الملكي',
    amount: 500,
    status: 'refunded',
    type: 'refund',
    paymentMethod: 'بطاقة ائتمان',
    date: '2024-03-18'
  }
];

const paymentSummary: PaymentSummary = {
  totalRevenue: 15240,
  pendingAmount: 3500,
  completedTransactions: 156,
  refundedAmount: 1200
};

const DashboardPayments = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'pending':
        return 'قيد المعالجة';
      case 'failed':
        return 'فشل';
      case 'refunded':
        return 'مسترجع';
      default:
        return status;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.bookingId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleExportReport = () => {
    // In a real application, this would generate and download a financial report
    console.log('Exporting financial report...');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">إدارة المدفوعات</h2>
          <Button
            onClick={handleExportReport}
            className="bg-primary text-white flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            تصدير التقرير
          </Button>
        </div>

        {/* Payment Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">إجمالي الإيرادات</h3>
            <p className="text-2xl font-bold">{paymentSummary.totalRevenue} ر.س</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Wallet className="h-6 w-6 text-yellow-600" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-yellow-600" />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">المبالغ المعلقة</h3>
            <p className="text-2xl font-bold">{paymentSummary.pendingAmount} ر.س</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <ArrowUpRight className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">المعاملات المكتملة</h3>
            <p className="text-2xl font-bold">{paymentSummary.completedTransactions}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-50 rounded-lg">
                <ArrowDownRight className="h-6 w-6 text-orange-600" />
              </div>
              <FileText className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">المبالغ المستردة</h3>
            <p className="text-2xl font-bold">{paymentSummary.refundedAmount} ر.س</p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="ابحث عن معاملة..."
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
                <option value="all">جميع الحالات</option>
                <option value="completed">مكتمل</option>
                <option value="pending">قيد المعالجة</option>
                <option value="failed">فشل</option>
                <option value="refunded">مسترجع</option>
              </select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                فلترة متقدمة
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-right border-b">
                  <th className="pb-3 font-medium">رقم المعاملة</th>
                  <th className="pb-3 font-medium">العميل</th>
                  <th className="pb-3 font-medium">الخدمة</th>
                  <th className="pb-3 font-medium">المبلغ</th>
                  <th className="pb-3 font-medium">طريقة الدفع</th>
                  <th className="pb-3 font-medium">التاريخ</th>
                  <th className="pb-3 font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-4">{transaction.id}</td>
                    <td className="py-4">{transaction.customerName}</td>
                    <td className="py-4">{transaction.serviceName}</td>
                    <td className="py-4">
                      <span className={transaction.type === 'refund' ? 'text-red-600' : 'text-green-600'}>
                        {transaction.type === 'refund' ? '-' : ''}{transaction.amount} ر.س
                      </span>
                    </td>
                    <td className="py-4">{transaction.paymentMethod}</td>
                    <td className="py-4">{transaction.date}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPayments;