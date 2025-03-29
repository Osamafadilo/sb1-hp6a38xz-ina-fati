import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, MapPin, Calendar, Users, Filter, Star } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Slider } from "../../components/ui/slider";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import AccommodationCard from "../../components/AccommodationCard/AccommodationCard";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const mockAccommodations = [
  {
    id: "1",
    title: "فندق القصر الملكي",
    price: 750,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    location: "الرياض، المملكة العربية السعودية",
    description:
      "فندق فاخر مع إطلالات رائعة وخدمات متميزة، يوفر تجربة إقامة لا تُنسى مع مسبح خارجي وسبا.",
  },
  {
    id: "2",
    title: "منتجع الواحة",
    price: 550,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    location: "جدة، المملكة العربية السعودية",
    description:
      "منتجع ساحلي هادئ مع شاطئ خاص وأنشطة مائية متنوعة، مثالي للعائلات والأزواج.",
  },
  {
    id: "3",
    title: "فندق النخيل",
    price: 450,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    location: "الدمام، المملكة العربية السعودية",
    description:
      "فندق عصري في قلب المدينة، قريب من المراكز التجارية والمعالم السياحية.",
  },
  {
    id: "4",
    title: "شاليهات الصفا",
    price: 850,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    location: "أبها، المملكة العربية السعودية",
    description:
      "شاليهات فاخرة محاطة بالطبيعة الخلابة، توفر خصوصية تامة وإطلالات جبلية رائعة.",
  },
  {
    id: "5",
    title: "فندق الأفق",
    price: 600,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
    location: "المدينة المنورة، المملكة العربية السعودية",
    description:
      "فندق راقي يوفر إطلالات على المسجد النبوي، مع خدمات متميزة وموقع استراتيجي.",
  },
  {
    id: "6",
    title: "منتجع الشاطئ الذهبي",
    price: 950,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    location: "ينبع، المملكة العربية السعودية",
    description:
      "منتجع ساحلي فاخر مع فيلات خاصة ومسابح، يوفر تجربة إقامة استثنائية على شاطئ البحر الأحمر.",
  },
];

const AccommodationList = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter accommodations based on search term and price range
  const filteredAccommodations = mockAccommodations.filter(
    (accommodation) =>
      (accommodation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        accommodation.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      accommodation.price >= priceRange[0] &&
      accommodation.price <= priceRange[1]
  );

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4 rtl">
        <h1 className="text-3xl font-bold mb-6 text-right">الإقامات المتاحة</h1>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="ابحث عن فندق، منتجع، شاليه..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-9 w-full text-right"
              />
            </div>

            <div className="flex-1 relative">
              <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="الموقع"
                className="pr-9 w-full text-right"
              />
            </div>

            <div className="flex-1 relative">
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="تاريخ الوصول - تاريخ المغادرة"
                className="pr-9 w-full text-right"
              />
            </div>

            <div className="flex-1 relative">
              <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="عدد الضيوف"
                className="pr-9 w-full text-right"
              />
            </div>

            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              فلترة
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3 text-right">نطاق السعر</h3>
                  <div className="px-3">
                    <Slider
                      defaultValue={[0, 1000]}
                      max={2000}
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[1]} ر.س</span>
                      <span>{priceRange[0]} ر.س</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 text-right">المرافق</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-end space-x-2 space-x-reverse">
                      <Label htmlFor="wifi" className="text-right">
                        واي فاي مجاني
                      </Label>
                      <Checkbox id="wifi" />
                    </div>
                    <div className="flex items-center justify-end space-x-2 space-x-reverse">
                      <Label htmlFor="pool" className="text-right">
                        مسبح
                      </Label>
                      <Checkbox id="pool" />
                    </div>
                    <div className="flex items-center justify-end space-x-2 space-x-reverse">
                      <Label htmlFor="parking" className="text-right">
                        موقف سيارات
                      </Label>
                      <Checkbox id="parking" />
                    </div>
                    <div className="flex items-center justify-end space-x-2 space-x-reverse">
                      <Label htmlFor="breakfast" className="text-right">
                        إفطار مجاني
                      </Label>
                      <Checkbox id="breakfast" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 text-right">التقييم</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-end space-x-2 space-x-reverse">
                      <Label htmlFor="rating5" className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                      </Label>
                      <Checkbox id="rating5" />
                    </div>
                    <div className="flex items-center justify-end space-x-2 space-x-reverse">
                      <Label htmlFor="rating4" className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                        <Star className="h-4 w-4 text-gray-300" />
                      </Label>
                      <Checkbox id="rating4" />
                    </div>
                    <div className="flex items-center justify-end space-x-2 space-x-reverse">
                      <Label htmlFor="rating3" className="flex items-center">
                        {[...Array(3)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-yellow-400"
                          />
                        ))}
                        {[...Array(2)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-gray-300" />
                        ))}
                      </Label>
                      <Checkbox id="rating3" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  تطبيق الفلتر
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Accommodation List */}
        <div className="space-y-6">
          {filteredAccommodations.map((accommodation) => (
            <AccommodationCard
              key={accommodation.id}
              id={accommodation.id}
              title={accommodation.title}
              price={accommodation.price}
              rating={accommodation.rating}
              image={accommodation.image}
              location={accommodation.location}
              description={accommodation.description}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="mx-1">
            السابق
          </Button>
          <Button variant="outline" className="mx-1 bg-primary text-white">
            1
          </Button>
          <Button variant="outline" className="mx-1">
            2
          </Button>
          <Button variant="outline" className="mx-1">
            3
          </Button>
          <Button variant="outline" className="mx-1">
            التالي
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccommodationList;