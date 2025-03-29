import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building,
  CalendarCheck,
  CreditCard,
  Star,
  Settings,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Home,
  Users,
  Bell,
  BarChart,
  Store,
  Wrench,
  Truck,
  UtensilsCrossed,
  Briefcase,
  Package
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'accommodation':
        return Building;
      case 'store':
        return Store;
      case 'maintenance':
        return Wrench;
      case 'transport':
        return Truck;
      case 'restaurant':
        return UtensilsCrossed;
      case 'investment':
        return Briefcase;
      case 'delivery':
        return Package;
      default:
        return Building;
    }
  };

  const sidebarItems = [
    {
      title: 'لوحة التحكم',
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: '/dashboard'
    },
    {
      title: 'إدارة الخدمات',
      icon: user?.activeServices?.[0] ? getServiceIcon(user.activeServices[0])({ className: "h-5 w-5" }) : <Building className="h-5 w-5" />,
      path: '/dashboard/services'
    },
    {
      title: 'إدارة الحجوزات',
      icon: <CalendarCheck className="h-5 w-5" />,
      path: '/dashboard/bookings'
    },
    {
      title: 'المدفوعات',
      icon: <CreditCard className="h-5 w-5" />,
      path: '/dashboard/payments'
    },
    {
      title: 'التقييمات',
      icon: <Star className="h-5 w-5" />,
      path: '/dashboard/reviews'
    },
    {
      title: 'العملاء',
      icon: <Users className="h-5 w-5" />,
      path: '/dashboard/customers'
    },
    {
      title: 'التقارير',
      icon: <BarChart className="h-5 w-5" />,
      path: '/dashboard/reports'
    },
    {
      title: 'الإشعارات',
      icon: <Bell className="h-5 w-5" />,
      path: '/dashboard/notifications'
    },
    {
      title: 'الإعدادات',
      icon: <Settings className="h-5 w-5" />,
      path: '/dashboard/settings'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 rtl">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {!isSidebarCollapsed && (
              <h1 className="text-xl font-bold text-primary">لوحة التحكم</h1>
            )}
            <button 
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              {isSidebarCollapsed ? (
                <ChevronLeft className="h-6 w-6" />
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </button>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {!isSidebarCollapsed && <span className="mr-3">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 right-0 left-0 p-4 border-t">
          <button
            onClick={handleHomeClick}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg w-full mb-2"
          >
            <Home className="h-5 w-5" />
            {!isSidebarCollapsed && <span className="mr-3">الرئيسية</span>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full"
          >
            <LogOut className="h-5 w-5" />
            {!isSidebarCollapsed && <span className="mr-3">تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'mr-20' : 'mr-64'
        }`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="text-right">
                <h2 className="text-lg font-semibold text-gray-900">
                  {sidebarItems.find(item => item.path === location.pathname)?.title || 'لوحة التحكم'}
                </h2>
                <p className="text-sm text-gray-500">
                  مرحباً، {user?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/dashboard/notifications" className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-6 w-6" />
              </Link>
              <Link to="/dashboard/settings" className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;