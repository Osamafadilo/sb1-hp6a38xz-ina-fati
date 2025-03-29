import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { useAuth } from '../../context/AuthContext';
import config from '../../config';
import './Auth.css';

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password || (!isLogin && !name)) {
      setError('جميع الحقول مطلوبة');
      return false;
    }
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return false;
    }
    if (!email.includes('@')) {
      setError('البريد الإلكتروني غير صالح');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // In development mode, use mock authentication
      if (config.features.enableMockAuth) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock successful authentication
        const mockUser = {
          _id: 'dev_user_123',
          name: name || 'مطور تجريبي',
          email,
          role: userType,
          token: 'mock_token_123'
        };

        login(mockUser);
        navigate('/');
        return;
      }

      // Production authentication code
      const endpoint = isLogin ? '/api/users/login' : '/api/users';
      const response = await fetch(`${config.apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: userType
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'حدث خطأ في عملية التسجيل');
      }

      const data = await response.json();
      login(data);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="auth-container">
        <div className="auth-header">
          <h2 className="auth-title">
            {isLogin ? t('signIn') : t('signUp')}
          </h2>
        </div>

        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                {error}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      {t('name')}
                    </label>
                    <div className="input-wrapper">
                      <div className="input-icon">
                        <User className="icon" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                        placeholder="الاسم الكامل"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="userType" className="form-label">
                      نوع الحساب
                    </label>
                    <div className="input-wrapper">
                      <select
                        id="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="form-input"
                        disabled={loading}
                      >
                        <option value="user">مستخدم</option>
                        <option value="provider">مقدم خدمة</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  {t('email')}
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <Mail className="icon" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="البريد الإلكتروني"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  {t('password')}
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <Lock className="icon" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="كلمة المرور"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'جاري التحميل...' : (isLogin ? t('signIn') : t('signUp'))}
                </button>
              </div>
            </form>

            <div className="auth-switch">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="switch-button"
                disabled={loading}
              >
                {isLogin ? t('needAccount') : t('alreadyHaveAccount')}
              </button>
            </div>

            {/* Provider Registration Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">هل تريد تسجيل منشأتك كمقدم خدمة؟</p>
              <Link
                to="/auth/provider/register"
                className="text-primary hover:text-primary/90 font-medium block mt-2"
              >
                سجل كمقدم خدمة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;