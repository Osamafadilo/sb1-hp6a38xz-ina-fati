import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Separator } from '../../../components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import {
  Image as ImageIcon,
  Plus,
  X,
  Bed,
  Users,
  Wifi,
  Coffee,
  Car,
  Waves,
  Utensils,
  AirVent,
  Tv,
} from 'lucide-react';

interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  description: string;
  amenities: string[];
}

interface Amenity {
  name: string;
  icon: JSX.Element;
}

const amenities: Amenity[] = [
  { name: 'واي فاي مجاني', icon: <Wifi className="h-5 w-5" /> },
  { name: 'إفطار مجاني', icon: <Coffee className="h-5 w-5" /> },
  { name: 'موقف سيارات', icon: <Car className="h-5 w-5" /> },
  { name: 'مسبح', icon: <Waves className="h-5 w-5" /> },
  { name: 'مطعم', icon: <Utensils className="h-5 w-5" /> },
  { name: 'تكييف', icon: <AirVent className="h-5 w-5" /> },
  { name: 'تلفزيون', icon: <Tv className="h-5 w-5" /> },
];

const EditService = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [service, setService] = useState({
    title: 'فندق القصر الملكي',
    description: 'فندق فاخر مع إطلالات رائعة وخدمات متميزة، يوفر تجربة إقامة لا تُنسى مع مسبح خارجي وسبا.',
    location: 'الرياض، المملكة العربية السعودية',
    price: 750,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
    ],
    selectedAmenities: ['واي فاي مجاني', 'إفطار مجاني', 'مسبح'],
    rooms: [
      {
        id: '1',
        name: 'غرفة ديلوكس',
        price: 750,
        capacity: 2,
        description: 'غرفة فاخرة مع سرير كبير وإطلالة على المدينة',
        amenities: ['واي فاي مجاني', 'تلفزيون', 'ميني بار']
      }
    ] as Room[],
    status: 'active' as 'active' | 'inactive'
  });

  const [newImage, setNewImage] = useState('');
  const [newRoom, setNewRoom] = useState({
    name: '',
    price: '',
    capacity: '',
    description: '',
    amenities: [] as string[]
  });

  const handleImageAdd = () => {
    if (newImage && service.images.length < 8) {
      setService({
        ...service,
        images: [...service.images, newImage]
      });
      setNewImage('');
    }
  };

  const handleImageRemove = (index: number) => {
    setService({
      ...service,
      images: service.images.filter((_, i) => i !== index)
    });
  };

  const handleRoomAdd = () => {
    if (newRoom.name && newRoom.price && newRoom.capacity) {
      setService({
        ...service,
        rooms: [...service.rooms, {
          id: Date.now().toString(),
          name: newRoom.name,
          price: parseFloat(newRoom.price),
          capacity: parseInt(newRoom.capacity),
          description: newRoom.description,
          amenities: newRoom.amenities
        }]
      });
      setNewRoom({
        name: '',
        price: '',
        capacity: '',
        description: '',
        amenities: []
      });
    }
  };

  const handleRoomRemove = (id: string) => {
    setService({
      ...service,
      rooms: service.rooms.filter(room => room.id !== id)
    });
  };

  const handleSave = async () => {
    // Check if service has active bookings
    const hasActiveBookings = true; // This would be checked from your backend

    if (hasActiveBookings) {
      // Create a change request instead of direct update
      const changeRequest = {
        serviceId: service.id,
        serviceName: service.title,
        changeType: 'edit',
        changes: [
          {
            field: 'عنوان الخدمة',
            oldValue: 'فندق القصر الملكي',
            newValue: service.title
          },
          {
            field: 'السعر',
            oldValue: '750',
            newValue: service.price.toString()
          }
          // Add other changed fields
        ],
        hasActiveBookings: true,
        requestDate: new Date().toISOString().split('T')[0],
        requestBy: 'اسم المستخدم'
      };

      // Send change request to backend
      console.log('Creating change request:', changeRequest);
      
      // Show confirmation to user
      alert('تم إرسال طلب التغيير للمراجعة. سيتم إخطارك عند الموافقة عليه.');
    } else {
      // If no active bookings, apply changes directly
      console.log('Saving service:', service);
    }

    navigate('/dashboard/services');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">تعديل الخدمة</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard/services')}
            >
              إلغاء
            </Button>
            <Button
              className="bg-primary text-white"
              onClick={handleSave}
            >
              حفظ التغييرات
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full border-b">
              <TabsTrigger value="details">التفاصيل الأساسية</TabsTrigger>
              <TabsTrigger value="images">الصور</TabsTrigger>
              <TabsTrigger value="rooms">الغرف</TabsTrigger>
              <TabsTrigger value="amenities">المرافق</TabsTrigger>
            </TabsList>

            {/* Basic Details Tab */}
            <TabsContent value="details" className="p-6">
              <div className="space-y-4">
                <div>
                  <Label>عنوان الخدمة</Label>
                  <Input
                    value={service.title}
                    onChange={(e) => setService({ ...service, title: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>الوصف</Label>
                  <textarea
                    value={service.description}
                    onChange={(e) => setService({ ...service, description: e.target.value })}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                </div>

                <div>
                  <Label>الموقع</Label>
                  <Input
                    value={service.location}
                    onChange={(e) => setService({ ...service, location: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>السعر الأساسي</Label>
                  <Input
                    type="number"
                    value={service.price}
                    onChange={(e) => setService({ ...service, price: parseFloat(e.target.value) })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>الحالة</Label>
                  <select
                    value={service.status}
                    onChange={(e) => setService({ ...service, status: e.target.value as 'active' | 'inactive' })}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2"
                  >
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                  </select>
                </div>
              </div>
            </TabsContent>

            {/* Images Tab */}
            <TabsContent value="images" className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {service.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`صورة ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-2 left-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="أدخل رابط الصورة"
                  />
                  <Button
                    onClick={handleImageAdd}
                    className="bg-primary text-white"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Rooms Tab */}
            <TabsContent value="rooms" className="p-6">
              <div className="space-y-6">
                {service.rooms.map((room) => (
                  <div key={room.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{room.name}</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Users className="h-4 w-4 ml-1" />
                          <span>يتسع لـ {room.capacity} أشخاص</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRoomRemove(room.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-3">{room.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-lg font-bold text-primary">
                      {room.price} ر.س <span className="text-sm font-normal">/ ليلة</span>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold">إضافة غرفة جديدة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>اسم الغرفة</Label>
                      <Input
                        value={newRoom.name}
                        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                        placeholder="مثال: غرفة ديلوكس"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>السعر لليلة</Label>
                      <Input
                        type="number"
                        value={newRoom.price}
                        onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                        placeholder="أدخل السعر"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>السعة</Label>
                      <Input
                        type="number"
                        value={newRoom.capacity}
                        onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                        placeholder="عدد الأشخاص"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>الوصف</Label>
                      <Input
                        value={newRoom.description}
                        onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                        placeholder="وصف مختصر للغرفة"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>المرافق</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {amenities.map((amenity) => (
                        <button
                          key={amenity.name}
                          onClick={() => {
                            const isSelected = newRoom.amenities.includes(amenity.name);
                            setNewRoom({
                              ...newRoom,
                              amenities: isSelected
                                ? newRoom.amenities.filter(a => a !== amenity.name)
                                : [...newRoom.amenities, amenity.name]
                            });
                          }}
                          className={`flex items-center px-3 py-1 rounded-full border ${
                            newRoom.amenities.includes(amenity.name)
                              ? 'bg-primary text-white border-primary'
                              : 'border-gray-300 hover:border-primary'
                          }`}
                        >
                          <span className="ml-2">{amenity.icon}</span>
                          {amenity.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={handleRoomAdd}
                    className="bg-primary text-white"
                  >
                    إضافة الغرفة
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Amenities Tab */}
            <TabsContent value="amenities" className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity) => (
                  <button
                    key={amenity.name}
                    onClick={() => {
                      const isSelected = service.selectedAmenities.includes(amenity.name);
                      setService({
                        ...service,
                        selectedAmenities: isSelected
                          ? service.selectedAmenities.filter(a => a !== amenity.name)
                          : [...service.selectedAmenities, amenity.name]
                      });
                    }}
                    className={`flex items-center p-4 rounded-lg border ${
                      service.selectedAmenities.includes(amenity.name)
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <span className="ml-3">{amenity.icon}</span>
                    {amenity.name}
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditService;