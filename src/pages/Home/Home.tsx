import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import './Home.css';

const services = [
  {
    id: 'accommodation',
    title: 'تصفح الإقامة',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    link: '/accommodations'
  },
  {
    id: 'store',
    title: 'تصفح المتجر',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
    link: '/store'
  },
  {
    id: 'restaurants',
    title: 'تصفح المطاعم',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    link: '/restaurants'
  },
  {
    id: 'maintenance',
    title: 'تصفح أعمال صيانة',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    link: '/maintenance'
  },
  {
    id: 'travel',
    title: 'تصفح رحلات سفر',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    link: '/travel'
  },
  {
    id: 'delivery',
    title: 'تصفح توصيل طلبك',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80',
    link: '/delivery'
  },
  {
    id: 'investment',
    title: 'تصفح الإستثمار',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80',
    link: '/investment'
  }
];

const Home = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 rtl">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن خدمة..."
              className="w-full h-12 pl-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-lg">
              <Search className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">خدمات شائعة</span>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">كافة الخدمات الاحترافية لتطوير أعمالك</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link 
                key={service.id} 
                to={service.link}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 w-full text-center">
                    <h3 className="text-white text-lg font-semibold group-hover:scale-105 transition-transform duration-300">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;