import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-title">{t('servicePlatform')}</h3>
            <p className="footer-description">{t('serviceDescription')}</p>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">{t('quickLinks')}</h3>
            <ul className="footer-links">
              <li>
                <Link to="/services" className="footer-link">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">{t('contact')}</h3>
            <address className="footer-address">
              support@serviceplatform.com
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {t('servicePlatform')}. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;