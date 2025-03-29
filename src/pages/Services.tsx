import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Home as HomeIcon, Truck, Store, Wrench, Building } from 'lucide-react';

const Services = () => {
  const { t } = useTranslation();

  const serviceCategories = [
    { icon: HomeIcon, name: t('accommodation'), description: 'Find comfortable accommodations for your needs', color: 'bg-blue-500' },
    { icon: Truck, name: t('transport'), description: 'Reliable transportation services', color: 'bg-green-500' },
    { icon: Store, name: t('shopping'), description: 'Connect with local and online stores', color: 'bg-purple-500' },
    { icon: Wrench, name: t('maintenance'), description: 'Professional maintenance services', color: 'bg-orange-500' },
    { icon: Building, name: t('investment'), description: 'Discover investment opportunities', color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('ourServices')}</h1>
          <div className="max-w-xl">
            <div className="relative flex items-center">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`h-2 ${category.color}`} />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <category.icon className="h-8 w-8 text-gray-900" />
                  <h3 className="text-xl font-semibold text-gray-900 ml-3">{category.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <button className="btn w-full justify-center">
                  {t('exploreServices')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;