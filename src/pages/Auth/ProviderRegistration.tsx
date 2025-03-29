import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Building, Mail, Phone, MapPin, FileText, Upload, AlertCircle } from 'lucide-react';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../../context/AuthContext';

interface ServiceType {
  id: string;
  name: string;
  description: string;
}

const serviceTypes: ServiceType[] = [
  {
    id: 'accommodation',
    name: 'خدمات الإقامة',
    description: 'فنادق، شقق مفروشة، منتجعات'
  },
  {
    id: 'restaurant',
    name: 'خدمات المطاعم',
    description: 'مطاعم، مقاهي، خدمات الطعام'
  },
  {
    id: 'maintenance',
    name: 'خدمات الصيانة',
    description: 'صيانة منزلية، تصليحات، تركيبات'
  },
  {
    id: 'transport',
    name: 'خدمات النقل',
    description: 'نقل ركاب، نقل بضائع، تأجير سيارات'
  },
  {
    id: 'delivery',
    name: 'خدمات التوصيل',
    description: 'توصيل طلبات، خدمات لوجستية'
  }
];

const ProviderRegistration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    address: '',
    commercialRegister: '',
    taxNumber: '',
    selectedServices: [] as string[],
    documents: [] as File[],
    description: '',
    password: '', // Added password field
    confirmPassword: '' // Added confirm password field
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.businessName) {
        newErrors.businessName = 'اسم المنشأة مطلوب';
      }
      if (!formData.email) {
        newErrors.email = 'البريد الإلكتروني مطلوب';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'البريد الإلكتروني غير صالح';
      }
      if (!formData.password) {
        newErrors.password = 'كلمة المرور مطلوبة';
      } else if (formData.password.length < 6) {
        newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'كلمة المرور غير متطابقة';
      }
      if (!formData.phone) {
        newErrors.phone = 'رقم الهاتف مطلوب';
      }
      if (!formData.address) {
        newErrors.address = 'العنوان مطلوب';
      }
    }

    if (currentStep === 2) {
      if (!formData.commercialRegister) {
        newErrors.commercialRegister = 'رقم السجل التجاري مطلوب';
      }
      if (!formData.taxNumber) {
        newErrors.taxNumber = 'الرقم الضريبي مطلوب';
      }
      if (formData.selectedServices.length === 0) {
        newErrors.services = 'يجب اختيار خدمة واحدة على الأقل';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(step)) {
      try {
        // In a real application, you would send this data to your backend
        // For now, we'll simulate a successful registration
        const mockUser = {
          _id: 'provider_' + Date.now(),
          name: formData.businessName,
          email: formData.email,
          role: 'provider',
          token: 'mock_token_' + Date.now(),
          services: formData.selectedServices,
          isVerified: false, // Provider needs verification
          businessDetails: {
            commercialRegister: formData.commercialRegister,
            taxNumber: formData.taxNumber,
            address: formData.address,
            phone: formData.phone
          }
        };

        // Log in the user automatically after registration
        login(mockUser);
        
        // Navigate to success page
        navigate('/auth/provider/success');
      } catch (error) {
        console.error('Registration error:', error);
        setErrors({
          submit: 'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.'
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        documents: [...Array.from(e.target.files)]
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 rtl">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">تسجيل كمقدم خدمة</h1>
              <p className="text-gray-600 mt-2">أكمل المعلومات التالية لتسجيل منشأتك</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {i}
                    </div>
                    {i < 3 && (
                      <div className={`h-1 w-24 ${
                        step > i ? 'bg-primary' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-sm">المعلومات الأساسية</span>
                <span className="text-sm">معلومات المنشأة</span>
                <span className="text-sm">المستندات</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">اسم المنشأة</Label>
                    <div className="relative mt-1">
                      <Building className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="pr-10 text-right"
                        placeholder="اسم المنشأة التجاري"
                      />
                    </div>
                    {errors.businessName && (
                      <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pr-10 text-right"
                        placeholder="البريد الإلكتروني للمنشأة"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">كلمة المرور</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pr-10 text-right"
                        placeholder="كلمة المرور"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pr-10 text-right"
                        placeholder="تأكيد كلمة المرور"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pr-10 text-right"
                        placeholder="رقم هاتف المنشأة"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">العنوان</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="pr-10 text-right"
                        placeholder="عنوان المنشأة"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="commercialRegister">رقم السجل التجاري</Label>
                    <div className="relative mt-1">
                      <FileText className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="commercialRegister"
                        value={formData.commercialRegister}
                        onChange={(e) => setFormData({ ...formData, commercialRegister: e.target.value })}
                        className="pr-10 text-right"
                        placeholder="رقم السجل التجاري"
                      />
                    </div>
                    {errors.commercialRegister && (
                      <p className="text-red-500 text-sm mt-1">{errors.commercialRegister}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                    <div className="relative mt-1">
                      <FileText className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="taxNumber"
                        value={formData.taxNumber}
                        onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                        className="pr-10 text-right"
                        placeholder="الرقم الضريبي للمنشأة"
                      />
                    </div>
                    {errors.taxNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.taxNumber}</p>
                    )}
                  </div>

                  <div>
                    <Label>نوع الخدمات</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      {serviceTypes.map((service) => (
                        <div
                          key={service.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.selectedServices.includes(service.id)
                              ? 'border-primary bg-primary/5'
                              : 'hover:border-gray-300'
                          }`}
                          onClick={() => {
                            const services = formData.selectedServices.includes(service.id)
                              ? formData.selectedServices.filter(id => id !== service.id)
                              : [...formData.selectedServices, service.id];
                            setFormData({ ...formData, selectedServices: services });
                          }}
                        >
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{service.description}</p>
                        </div>
                      ))}
                    </div>
                    {errors.services && (
                      <p className="text-red-500 text-sm mt-1">{errors.services}</p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label>المستندات المطلوبة</Label>
                    <div className="mt-2 space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">
                            قم بإرفاق المستندات المطلوبة (السجل التجاري، شهادة الضريبة)
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF، JPG، PNG (الحد الأقصى: 10 ميجابايت)
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-4"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          اختر الملفات
                        </Button>
                      </div>

                      {formData.documents.length > 0 && (
                        <div className="space-y-2">
                          {formData.documents.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                            >
                              <span className="text-sm">{file.name}</span>
                              <button
                                type="button"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => {
                                  const newDocs = [...formData.documents];
                                  newDocs.splice(index, 1);
                                  setFormData({ ...formData, documents: newDocs });
                                }}
                              >
                                حذف
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">وصف المنشأة</Label>
                    <textarea
                      id="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                      placeholder="اكتب وصفاً مختصراً عن منشأتك وخدماتها"
                    />
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                      <div className="mr-3">
                        <p className="text-sm text-yellow-700">
                          سيتم مراجعة طلبك خلال 2-3 أيام عمل. سيتم إخطارك عبر البريد الإلكتروني بحالة طلبك.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                  >
                    السابق
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    className="bg-primary text-white mr-auto"
                    onClick={handleNext}
                  >
                    التالي
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-primary text-white mr-auto"
                  >
                    إرسال الطلب
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProviderRegistration;