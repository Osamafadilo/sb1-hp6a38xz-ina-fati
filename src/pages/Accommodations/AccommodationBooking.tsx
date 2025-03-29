import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, CreditCard, Users, Clock } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import './AccommodationBooking.css';

const AccommodationBooking = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Booking logic will be implemented later
    console.log('Booking submitted:', { id, checkIn, checkOut, guests });
  };

  return (
    <MainLayout>
      <div className="booking-page">
        <div className="booking-container">
          <h1 className="booking-title">تأكيد الحجز</h1>
          
          <form onSubmit={handleBooking} className="booking-form">
            <div className="form-group">
              <label htmlFor="check-in">تاريخ الوصول</label>
              <div className="input-wrapper">
                <Calendar className="input-icon" />
                <input
                  type="date"
                  id="check-in"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="check-out">تاريخ المغادرة</label>
              <div className="input-wrapper">
                <Calendar className="input-icon" />
                <input
                  type="date"
                  id="check-out"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="guests">عدد النزلاء</label>
              <div className="input-wrapper">
                <Users className="input-icon" />
                <input
                  type="number"
                  id="guests"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="booking-summary">
              <h2 className="summary-title">ملخص الحجز</h2>
              <div className="summary-details">
                <div className="summary-item">
                  <Clock className="summary-icon" />
                  <span>مدة الإقامة: 3 ليالي</span>
                </div>
                <div className="summary-item">
                  <Users className="summary-icon" />
                  <span>عدد النزلاء: {guests}</span>
                </div>
                <div className="summary-item">
                  <CreditCard className="summary-icon" />
                  <span>المبلغ الإجمالي: 1500 {t('currency')}</span>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-button">
              تأكيد الحجز
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccommodationBooking;