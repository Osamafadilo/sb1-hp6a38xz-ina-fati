import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { User, Mail, Lock, Bell, Shield, CreditCard } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Profile update logic will be implemented later
    console.log('Profile update:', { name, email });
  };

  const tabs = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'payment', label: 'طرق الدفع', icon: CreditCard },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 rtl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">إعدادات الحساب</h1>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="h-5 w-5 ml-2" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'profile' && (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <Label htmlFor="name">الاسم</Label>
                    <div className="relative mt-1">
                      <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pr-10 text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pr-10 text-right"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="bg-primary text-white w-full">
                    حفظ التغييرات
                  </Button>
                </form>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">تغيير كلمة المرور</h3>
                    <form className="space-y-4">
                      <div>
                        <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="current-password"
                            type="password"
                            className="pr-10 text-right"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="new-password"
                            type="password"
                            className="pr-10 text-right"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                          <Input
                            id="confirm-password"
                            type="password"
                            className="pr-10 text-right"
                          />
                        </div>
                      </div>

                      <Button type="submit" className="bg-primary text-white w-full">
                        تحديث كلمة المرور
                      </Button>
                    </form>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium mb-4">إعدادات الإشعارات</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>إشعارات البريد الإلكتروني</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>إشعارات الموقع</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>تحديثات الخدمات</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium mb-4">طرق الدفع</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="h-6 w-6 text-gray-400 ml-3" />
                          <div>
                            <p className="font-medium">**** **** **** 4242</p>
                            <p className="text-sm text-gray-500">تنتهي في 12/24</p>
                          </div>
                        </div>
                        <button className="text-sm text-red-600 hover:text-red-700">
                          حذف
                        </button>
                      </div>
                    </div>

                    <Button className="w-full">
                      إضافة طريقة دفع جديدة
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;