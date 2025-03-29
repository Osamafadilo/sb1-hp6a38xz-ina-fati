import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Search, User, Globe } from 'lucide-react';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Menu className="h-8 w-8 text-indigo-600" />
              <span className="mx-2 font-bold text-xl text-gray-900">
                {t('servicePlatform')}
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/services" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                {t('services')}
              </Link>
              <Link to="/about" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                {t('about')}
              </Link>
              <Link to="/contact" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                {t('contact')}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-gray-100">
                <Globe className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              <Link to="/auth" className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-5 w-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;