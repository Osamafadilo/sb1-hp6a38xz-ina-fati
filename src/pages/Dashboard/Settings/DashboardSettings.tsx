import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import {
  User,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Building,
  Mail,
  Phone,
  Globe,
  Clock,
  CheckCircle,
  Store,
  Wrench,
  Truck,
  UtensilsCrossed,
  Briefcase,
  Package
} from 'lucide-react';

const DashboardSettings = () => {
  const location = useLocation();
  const initialTab = location.state?.activeTab || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [userData, setUserData] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    address: 'الرياض، المملكة العربية السعودية',
    activeServices: [
      'accommodation',
      'maintenance', 
      'store',
      'transport',
      'restaurant',
      'investment',
      'delivery'
    ],
    pendingServices: []
  });

  const [notificationSettings, setNotificationSettings] = useState({
    bookings: true,
    reviews: true,
    payments: true,
    system: true,
    marketing: false,
    email: true,
    push: true,
    sms: false
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const services = [
    { id: 'accommodation', name: 'خدمات الإقامة', icon: Building },
    { id: 'maintenance', name: 'أعمال وصيانة', icon: Wrench },
    { id: 'store', name: 'متجر', icon: Store },
    { id: 'transport', name: 'نقل', icon: Truck },
    { id: 'restaurant', name: 'مطاعم', icon: UtensilsCrossed },
    { id: 'investment', name: 'استثمار', icon: Briefcase },
    { id: 'delivery', name: 'توصيل', icon: Package }
  ];

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', userData);
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Security settings updated:', securityForm);
  };

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const isServiceActive = (serviceId: string) => {
    return userData.activeServices.includes(serviceId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">الإعدادات</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full border-b">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                الملف الشخصي
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                الأمان
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                الإشعارات
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                الخدمات
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile" className="p-6">
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <Label>الاسم</Label>
                  <div className="relative mt-1">
                    <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>البريد الإلكتروني</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>رقم الهاتف</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>العنوان</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="bg-primary text-white">
                  حفظ التغييرات
                </Button>
              </form>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="p-6">
              <form onSubmit={handleSecuritySubmit} className="space-y-6">
                <div>
                  <Label>كلمة المرور الحالية</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      value={securityForm.currentPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>كلمة المرور الجديدة</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      value={securityForm.newPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>تأكيد كلمة المرور</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      value={securityForm.confirmPassword}
                      onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                      className="pr-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="bg-primary text-white">
                  تحديث كلمة المرور
                </Button>
              </form>
            </TabsContent>

            {/* Notification Settings */}
            <TabsContent value="notifications" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">إعدادات الإشعارات</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">إشعارات البريد الإلكتروني</h4>
                        <p className="text-sm text-gray-500">استلام الإشعارات عبر البريد الإلكتروني</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings.email}
                          onChange={() => handleNotificationToggle('email')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">إشعارات الموقع</h4>
                        <p className="text-sm text-gray-500">استلام إشعارات داخل الموقع</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings.push}
                          onChange={() => handleNotificationToggle('push')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

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
                          onChange={() => handleNotificationToggle('bookings')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Services Settings */}
            <TabsContent value="services" className="p-6">
              <div className="space-y-6">
                <h3 className="font-semibold mb-4">الخدمات المفعلة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => {
                    const ServiceIcon = service.icon;
                    const active = isServiceActive(service.id);
                    
                    return (
                      <div
                        key={service.id}
                        className={`p-4 rounded-lg border ${
                          active ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <ServiceIcon className={`h-6 w-6 ${active ? 'text-green-600' : 'text-gray-400'}`} />
                            <div>
                              <h4 className="font-medium">{service.name}</h4>
                              <p className="text-sm text-gray-500">
                                {active ? 'مفعلة' : 'غير مفعلة'}
                              </p>
                            </div>
                          </div>
                          {active && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;