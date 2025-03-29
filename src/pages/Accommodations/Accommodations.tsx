import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Filter } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import AccommodationCard from '../../components/AccommodationCard/AccommodationCard';
import './Accommodations.css';

interface Accommodation {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
  location: string;
  description: string;
}

const Accommodations = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [accommodations] = useState<Accommodation[]>([
    {
      id: '1',
      title: 'فندق النخيل الفاخر',
      price: 500,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
      location: 'الرياض، حي النخيل',
      description: 'فندق فاخر يقع في قلب مدينة الرياض، يوفر إطلالات رائعة وخدمات متميزة مع مرافق عصرية وموقع استراتيجي.'
    },
    {
      id: '2',
      title: 'شقة مفروشة الصفوة',
      price: 300,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80',
      location: 'جدة، حي الصفا',
      description: 'شقة مفروشة حديثة في موقع مميز، تتميز بالتصميم العصري والإطلالة الرائعة على البحر مع جميع وسائل الراحة.'
    },
  ]);

  return (
    <MainLayout>
      <div className="accommodations-page">
        <div className="search-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder={t('searchAccommodations')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="location-button">
              <MapPin className="location-icon" />
              {t('nearbyLocations')}
            </button>
            <button className="filter-button">
              <Filter className="filter-icon" />
              {t('filters')}
            </button>
          </div>
        </div>

        <div className="accommodations-list">
          {accommodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              {...accommodation}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Accommodations;