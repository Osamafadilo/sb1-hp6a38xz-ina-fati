import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import {
  Bell,
  Calendar,
  Clock,
  Settings,
  Star,
  Building,
  Users,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'review' | 'system' | 'payment' | 'alert';
  status: 'unread' | 'read';
  date: string;
  time: string;
  action?: {
    type: 'link' | 'button';
    text: string;
    url?: string;
    handler?: () => void;
  };
}

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'حجز جديد',
    message: 'لديك حجز جديد من أحمد محمد للغرفة الديلوكس',
    type: 'booking',
    status: 'unread',
    date: '2024-03-20',
    time: '10:30',
    action: {
      type: 'link',
      text: 'عرض الحجز',
      url: '/dashboard/bookings'
    }
  },
  {
    id: 'n2',
    title: 'تقييم جديد',
    message: 'قام خالد عبدالله بتقييم إقامته في الجناح العائلي',
    type: 'review',
    status: 'unread',
    date: '2024-03-20',
    time: '09:15',
    action: {
      type: 'link',
      text: 'عرض التقييم',
      url: '/dashboard/reviews'
    }
  },
  {
    id: 'n3',
    title: 'تحديث النظام',
    message: 'تم تحديث النظام إلى الإصدار الجديد. اطلع على المميزات الجديدة',
    type: 'system',
    status: 'read',
    date: '2024-03-19',
    time: '14:20',
    action: {
      type: 'button',
      text: 'عرض التحديثات',
      handler: () => alert('عرض التحديثات الجديدة')
    }
  },
  {
    id: 'n4',
    title: 'دفعة جديدة',
    message: 'تم استلام دفعة جديدة بقيمة 750 ريال',
    type: 'payment',
    status: 'read',
    date: '2024-03-19',
    time: '11:45',
    action: {
      type: 'link',
      text: 'عرض التفاصيل',
      url: '/dashboard/payments'
    }
  },
  {
    id: 'n5',
    title: 'تنبيه أمان',
    message: 'تم تسجيل دخول جديد إلى حسابك من جهاز جديد',
    type: 'alert',
    status: 'unread',
    date: '2024-03-18',
    time: '16:30',
    action: {
      type: 'button',
      text: 'مراجعة الأمان',
      handler: () => alert('فتح إعدادات الأمان')
    }
  }
];

const DashboardNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    bookings: true,
    reviews: true,
    payments: true,
    system: true
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'review':
        return <Star className="h-5 w-5 text-yellow-600" />;
      case 'system':
        return <Settings className="h-5 w-5 text-purple-600" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-green-600" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, status: 'read' } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      status: 'read'
    })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleNotificationAction = (notification: Notification) => {
    if (notification.action) {
      if (notification.action.type === 'link' && notification.action.url) {
        navigate(notification.action.url);
      } else if (notification.action.type === 'button' && notification.action.handler) {
        notification.action.handler();
      }
    }
  };

  const handleSettingChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const openNotificationSettings = () => {
    navigate('/dashboard/settings', { state: { activeTab: 'notifications' } });
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">الإشعارات</h2>
            <p className="text-gray-500 mt-1">لديك {unreadCount} إشعارات غير مقروءة</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleMarkAllAsRead}
            >
              <CheckCircle className="h-4 w-4" />
              تحديد الكل كمقروء
            </Button>
            <Button
              className="bg-primary text-white flex items-center gap-2"
              onClick={openNotificationSettings}
            >
              <Settings className="h-4 w-4" />
              إعدادات الإشعارات
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Bell className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="ابحث في الإشعارات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="all">جميع الإشعارات</option>
                  <option value="booking">الحجوزات</option>
                  <option value="review">التقييمات</option>
                  <option value="payment">المدفوعات</option>
                  <option value="system">النظام</option>
                  <option value="alert">التنبيهات</option>
                </select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  فلترة متقدمة
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 ${
                    notification.status === 'unread' ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-white rounded-lg">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {notification.status === 'unread' && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                          <button
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 ml-1" />
                          {notification.time} - {notification.date}
                        </div>
                        <div className="flex items-center gap-2">
                          {notification.status === 'unread' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              تحديد كمقروء
                            </Button>
                          )}
                          {notification.action && (
                            <Button
                              className="bg-primary text-white"
                              size="sm"
                              onClick={() => handleNotificationAction(notification)}
                            >
                              {notification.action.text}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredNotifications.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  لا توجد إشعارات مطابقة للبحث
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-6">إعدادات الإشعارات</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">إشعارات الحجوزات</h4>
                <p className="text-sm text-gray-500">استلام إشعارات عند وجود حجوزات جديدة</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.bookings}
                  onChange={() => handleSettingChange('bookings')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">إشعارات التقييمات</h4>
                <p className="text-sm text-gray-500">استلام إشعارات عند وجود تقييمات جديدة</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.reviews}
                  onChange={() => handleSettingChange('reviews')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">إشعارات المدفوعات</h4>
                <p className="text-sm text-gray-500">استلام إشعارات عند وجود مدفوعات جديدة</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.payments}
                  onChange={() => handleSettingChange('payments')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">إشعارات النظام</h4>
                <p className="text-sm text-gray-500">استلام إشعارات حول تحديثات وصيانة النظام</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.system}
                  onChange={() => handleSettingChange('system')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardNotifications;