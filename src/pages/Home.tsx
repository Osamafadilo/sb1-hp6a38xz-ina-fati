import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Home as HomeIcon, Truck, Store, Wrench, Building } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();

  const services = [
    { icon: HomeIcon, name: t('accommodation'), color: 'bg-blue-500' },
    { icon: Truck, name: t('transport'), color: 'bg-green-500' },
    { icon: Store, name: t('shopping'), color: 'bg-purple-500' },
    { icon: Wrench, name: t('maintenance'), color: 'bg-orange-500' },
    { icon: Building, name: t('investment'), color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[500px]" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('heroTitle')}
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            {t('heroSubtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-xl">
            <div className="mt-1 relative flex items-center">
              <input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 pl-4 sm:text-sm border-gray-300 rounded-lg h-12"
                placeholder={t('searchPlaceholder')}
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="inline-flex items-center border border-transparent rounded-md px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('ourServices')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`absolute inset-0 ${service.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              <div className="p-6">
                <service.icon className="h-8 w-8 text-gray-900 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{t('serviceDescription')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;