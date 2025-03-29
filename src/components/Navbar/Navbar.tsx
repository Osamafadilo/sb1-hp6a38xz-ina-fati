import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Search, User, Globe, LogOut, Settings, ChevronDown } from 'lucide-react';
import CartHeader from '../CartHeader/CartHeader';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', newLang);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notifications`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        });

        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  const handleLogout = async () => {
    try {
      // Call backend logout endpoint to invalidate token
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      logout();
      navigate('/');
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Still perform local logout even if backend call fails
      logout();
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/" className="brand-link">
              <Menu className="brand-icon" />
              <span className="brand-text">
                {t('servicePlatform')}
              </span>
            </Link>
          </div>

          <div className="navbar-menu">
            <div className="navbar-links">
              <Link to="/services" className="nav-link">
                {t('services')}
              </Link>
              <Link to="/about" className="nav-link">
                {t('about')}
              </Link>
              <Link to="/contact" className="nav-link">
                {t('contact')}
              </Link>
            </div>

            <div className="navbar-actions">
              <button onClick={toggleLanguage} className="action-button">
                <Globe className="action-icon" />
              </button>
              <button className="action-button">
                <Search className="action-icon" />
              </button>
              <CartHeader />
              {user ? (
                <div className="relative">
                  <button 
                    className="action-button flex items-center gap-2"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        {user.role === 'provider' && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                            مقدم خدمة
                          </span>
                        )}
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          الملف الشخصي
                        </div>
                      </Link>
                      {user.role === 'provider' && (
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            لوحة التحكم
                          </div>
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-2">
                          <LogOut className="h-4 w-4" />
                          تسجيل الخروج
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/auth" className="action-button">
                  <User className="action-icon" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;