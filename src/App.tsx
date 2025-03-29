import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Store from './pages/Store/Store';
import Auth from './pages/Auth/Auth';
import ProviderRegistration from './pages/Auth/ProviderRegistration';
import ProviderSuccess from './pages/Auth/ProviderSuccess';
import AccommodationDetails from './pages/Accommodations/AccommodationDetails';
import AccommodationBooking from './pages/Accommodations/AccommodationBooking';
import AccommodationList from './pages/Accommodations/AccommodationList';
import BookingConfirmation from './pages/Accommodations/BookingConfirmation';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import CheckoutSuccess from './pages/Checkout/CheckoutSuccess';
import DashboardHome from './pages/Dashboard/DashboardHome';
import DashboardServices from './pages/Dashboard/Services/DashboardServices';
import DashboardBookings from './pages/Dashboard/Bookings/DashboardBookings';
import DashboardPayments from './pages/Dashboard/Payments/DashboardPayments';
import DashboardReviews from './pages/Dashboard/Reviews/DashboardReviews';
import DashboardCustomers from './pages/Dashboard/Customers/DashboardCustomers';
import DashboardReports from './pages/Dashboard/Reports/DashboardReports';
import DashboardNotifications from './pages/Dashboard/Notifications/DashboardNotifications';
import DashboardSettings from './pages/Dashboard/Settings/DashboardSettings';
import EditService from './pages/Dashboard/Services/EditService';
import ServiceChanges from './pages/Dashboard/Services/ServiceChanges';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/store" element={<Store />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/provider/register" element={<ProviderRegistration />} />
            <Route path="/auth/provider/success" element={<ProviderSuccess />} />
            <Route path="/accommodations" element={<AccommodationList />} />
            <Route path="/accommodation/:id" element={<AccommodationDetails />} />
            <Route path="/accommodation/:id/booking" element={<AccommodationBooking />} />
            <Route path="/booking-confirmation/:accommodationId/:roomId" element={<BookingConfirmation />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute roles={['provider', 'admin']}>
                  <DashboardHome />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/services" 
              element={
                <PrivateRoute roles={['provider', 'admin']}>
                  <DashboardServices />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/bookings" 
              element={
                <PrivateRoute roles={['provider', 'admin']}>
                  <DashboardBookings />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/payments" 
              element={
                <PrivateRoute roles={['provider', 'admin']}>
                  <DashboardPayments />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/reviews" 
              element={
                <PrivateRoute roles={['provider', 'admin']}>
                  <DashboardReviews />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/customers" 
              element={
                <PrivateRoute roles={['provider', 'admin']}>
                  <DashboardCustomers />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/reports" 
              element={
                <PrivateRoute roles={['provider', 'admin']}>
                  <DashboardReports />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/notifications" 
              element={
                <PrivateRoute roles={['provider', 'admin']}>
                  <DashboardNotifications />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/settings" 
              element={
                <PrivateRoute roles={['provider', 'admin']}>
                  <DashboardSettings />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/services/edit/:id" 
              element={
                <PrivateRoute roles={['provider', 'admin']}>
                  <EditService />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/services/changes" 
              element={
                <PrivateRoute roles={['admin']}>
                  <ServiceChanges />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;