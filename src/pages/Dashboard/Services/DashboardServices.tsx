import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Building,
  Store,
  Wrench,
  Truck,
  UtensilsCrossed,
  Briefcase,
  Package
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  status: 'active' | 'inactive';
  type: string;
}

const serviceTypes = [
  { id: 'accommodation', name: 'خدمات الإقامة', icon: Building },
  { id: 'maintenance', name: 'أعمال وصيانة', icon: Wrench },
  { id: 'store', name: 'متجر', icon: Store },
  { id: 'transport', name: 'نقل', icon: Truck },
  { id: 'restaurant', name: 'مطاعم', icon: UtensilsCrossed },
  { id: 'investment', name: 'استثمار', icon: Briefcase },
  { id: 'delivery', name: 'توصيل', icon: Package }
];

const mockServices: Service[] = [
  {
    id: '1',
    title: 'غرفة ديلوكس مع إطلالة على المدينة',
    description: 'غرفة فاخرة مع سرير كبير وإطلالة بانورامية على المدينة',
    price: 750,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    status: 'active',
    type: 'accommodation'
  },
  {
    id: '2',
    title: 'جناح عائلي فاخر',
    description: 'جناح واسع مناسب للعائلات مع غرفتين نوم وصالة',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    status: 'active',
    type: 'accommodation'
  }
];

const DashboardServices = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState('accommodation');
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  const handleAddService = () => {
    const service: Service = {
      id: Date.now().toString(),
      title: newService.title,
      description: newService.description,
      price: parseFloat(newService.price),
      image: newService.image,
      status: 'active',
      type: selectedServiceType
    };

    setServices([...services, service]);
    setShowAddModal(false);
    setNewService({ title: '', description: '', price: '', image: '' });
  };

  const handleDeleteService = async (id: string) => {
    const hasActiveBookings = true; // This would be checked from your backend

    if (hasActiveBookings) {
      if (confirm('هذه الخدمة لديها حجوزات نشطة. هل تريد إرسال طلب حذف للمراجعة؟')) {
        const deleteRequest = {
          serviceId: id,
          serviceName: services.find(s => s.id === id)?.title,
          changeType: 'delete',
          hasActiveBookings: true,
          requestDate: new Date().toISOString().split('T')[0],
          requestBy: user?.name || 'مستخدم'
        };
        
        console.log('Creating delete request:', deleteRequest);
        alert('تم إرسال طلب الحذف للمراجعة. سيتم إخطارك عند الموافقة عليه.');
      }
    } else {
      if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        setServices(services.filter(service => service.id !== id));
      }
    }
  };

  const handleEditService = (id: string) => {
    navigate(`/dashboard/services/edit/${id}`);
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    service.type === selectedServiceType
  );

  const currentServiceType = serviceTypes.find(type => type.id === selectedServiceType);
  const ServiceTypeIcon = currentServiceType?.icon || Building;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Service Type Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">اختر نوع الخدمة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceTypes.map((type) => {
              const TypeIcon = type.icon;
              const isSelected = selectedServiceType === type.id;
              
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedServiceType(type.id)}
                  className={`p-4 rounded-lg border transition-all ${
                    isSelected 
                      ? 'bg-primary/5 border-primary text-primary' 
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <TypeIcon className={`h-6 w-6 ${isSelected ? 'text-primary' : 'text-gray-500'}`} />
                    <span className="text-sm font-medium">{type.name}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">إدارة {currentServiceType?.name}</h2>
            <p className="text-gray-500 mt-1">قم بإدارة خدمات {currentServiceType?.name}</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            إضافة خدمة جديدة
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder={`ابحث في ${currentServiceType?.name}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    service.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {service.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{service.price} ر.س</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditService(service.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Service Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">إضافة خدمة جديدة</h3>
              <div className="space-y-4">
                <div>
                  <Label>عنوان الخدمة</Label>
                  <Input
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    placeholder="أدخل عنوان الخدمة"
                  />
                </div>
                <div>
                  <Label>الوصف</Label>
                  <textarea
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    placeholder="أدخل وصف الخدمة"
                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>السعر</Label>
                  <Input
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    placeholder="أدخل السعر"
                  />
                </div>
                <div>
                  <Label>رابط الصورة</Label>
                  <Input
                    value={newService.image}
                    onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                    placeholder="أدخل رابط الصورة"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                  >
                    إلغاء
                  </Button>
                  <Button
                    className="bg-primary text-white"
                    onClick={handleAddService}
                  >
                    إضافة الخدمة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardServices;