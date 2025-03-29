import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ar',
    lng: 'ar',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          servicePlatform: 'Service Platform',
          services: 'Services',
          about: 'About',
          contact: 'Contact',
          heroTitle: 'Find the Perfect Service',
          heroSubtitle: 'Connect with trusted service providers for all your needs',
          searchPlaceholder: 'Search for services...',
          ourServices: 'Our Services',
          serviceDescription: 'Find trusted providers and quality services',
          accommodation: 'Accommodation',
          transport: 'Transport',
          shopping: 'Shopping',
          maintenance: 'Maintenance',
          investment: 'Investment',
          quickLinks: 'Quick Links',
          allRightsReserved: 'All rights reserved.',
          exploreServices: 'Explore Services',
          signIn: 'Sign In',
          signUp: 'Sign Up',
          email: 'Email Address',
          password: 'Password',
          name: 'Full Name',
          needAccount: 'Need an account? Sign up',
          alreadyHaveAccount: 'Already have an account? Sign in',
          orders: 'Orders',
          viewAllOrders: 'View All Orders',
          currency: 'SAR',
          orderStatus: {
            pending: 'Pending',
            confirmed: 'Confirmed',
            cancelled: 'Cancelled',
            in_progress: 'In Progress',
            completed: 'Completed'
          }
        }
      },
      ar: {
        translation: {
          servicePlatform: 'منصة الخدمات',
          services: 'الخدمات',
          about: 'عن المنصة',
          contact: 'اتصل بنا',
          heroTitle: 'ابحث عن الخدمة المثالية',
          heroSubtitle: 'تواصل مع مزودي الخدمات الموثوقين لتلبية جميع احتياجاتك',
          searchPlaceholder: 'ابحث عن الخدمات...',
          ourServices: 'خدماتنا',
          serviceDescription: 'اعثر على مزودي خدمات موثوقين وخدمات عالية الجودة',
          accommodation: 'الإقامة',
          transport: 'النقل',
          shopping: 'التسوق',
          maintenance: 'الصيانة',
          investment: 'الاستثمار',
          quickLinks: 'روابط سريعة',
          allRightsReserved: 'جميع الحقوق محفوظة.',
          exploreServices: 'استكشف الخدمات',
          signIn: 'تسجيل الدخول',
          signUp: 'إنشاء حساب',
          email: 'البريد الإلكتروني',
          password: 'كلمة المرور',
          name: 'الاسم الكامل',
          needAccount: 'ليس لديك حساب؟ سجل الآن',
          alreadyHaveAccount: 'لديك حساب بالفعل؟ سجل دخولك',
          orders: 'الطلبات',
          viewAllOrders: 'عرض جميع الطلبات',
          currency: 'ريال',
          orderStatus: {
            pending: 'قيد الانتظار',
            confirmed: 'تم التأكيد',
            cancelled: 'ملغي',
            in_progress: 'قيد التنفيذ',
            completed: 'مكتمل'
          }
        }
      }
    }
  });

export default i18n;