import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Calendar } from "../../components/ui/calendar";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Car,
  Waves,
  Utensils,
  AirVent,
  Tv,
  Users,
  Calendar as CalendarIcon,
} from "lucide-react";

const AccommodationDetails = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!selectedDates[0] || !selectedDates[1]) {
      alert('الرجاء اختيار تواريخ الإقامة');
      return;
    }

    try {
      setLoading(true);
      await addItem({
        id: '1', // In a real app, this would be the actual accommodation ID
        type: 'accommodation',
        title: 'غرفة ديلوكس - فندق القصر الملكي',
        price: 750,
        quantity: 1,
        providerId: 'provider_1', // In a real app, this would be the actual provider ID
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        status: 'pending',
        paymentStatus: 'unpaid',
        details: {
          checkIn: selectedDates[0].toISOString().split('T')[0],
          checkOut: selectedDates[1].toISOString().split('T')[0],
          guests: guests,
          roomType: 'غرفة ديلوكس'
        }
      });
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('حدث خطأ أثناء إضافة الحجز للسلة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 rtl">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Image Gallery */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
                  alt="غرفة ديلوكس"
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                {[
                  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
                  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
                  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'
                ].map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`غرفة ديلوكس ${index + 1}`}
                    className="w-full h-[95px] object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Accommodation Details */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">غرفة ديلوكس - فندق القصر الملكي</h1>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 ml-1 text-gray-400" />
                  <span className="text-gray-600">الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="mr-2 text-gray-600">(128 تقييم)</span>
              </div>
            </div>

            <Tabs defaultValue="booking">
              <TabsList className="w-full">
                <TabsTrigger value="booking">الحجز</TabsTrigger>
                <TabsTrigger value="details">التفاصيل</TabsTrigger>
                <TabsTrigger value="amenities">المرافق</TabsTrigger>
              </TabsList>

              <TabsContent value="booking" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label>تواريخ الإقامة</Label>
                    <Calendar
                      mode="range"
                      selected={selectedDates}
                      onSelect={setSelectedDates as any}
                      className="rounded-md border mt-2"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="guests">عدد النزلاء</Label>
                      <div className="relative mt-2">
                        <Users className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="guests"
                          type="number"
                          min="1"
                          max="4"
                          value={guests}
                          onChange={(e) => setGuests(parseInt(e.target.value))}
                          className="pr-10"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span>سعر الليلة</span>
                        <span>750 ر.س</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>المجموع</span>
                        <span>750 ر.س</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleBooking}
                      className="w-full bg-primary text-white"
                      disabled={loading}
                    >
                      {loading ? 'جاري الإضافة...' : 'إضافة للسلة'}
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <p className="text-gray-600">
                  غرفة فاخرة مع إطلالة رائعة على المدينة، مجهزة بكافة وسائل الراحة العصرية. تتميز بتصميم أنيق ومساحة واسعة تناسب إقامة شخصين.
                </p>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Wifi, name: 'واي فاي مجاني' },
                    { icon: Coffee, name: 'مطبخ مجهز' },
                    { icon: Car, name: 'موقف سيارات' },
                    { icon: Waves, name: 'مسبح' },
                    { icon: Utensils, name: 'مطعم' },
                    { icon: AirVent, name: 'تكييف' },
                    { icon: Tv, name: 'تلفاز ذكي' },
                    { icon: Users, name: 'حتى 4 أشخاص' }
                  ].map((amenity, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <amenity.icon className="h-5 w-5 text-primary ml-2" />
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccommodationDetails;