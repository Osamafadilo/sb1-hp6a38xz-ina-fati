import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Search, Filter, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  provider: {
    id: string;
    name: string;
  };
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'سماعات بلوتوث لاسلكية',
    description: 'سماعات عالية الجودة مع عزل للضوضاء',
    price: 299,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    rating: 4.5,
    category: 'إلكترونيات',
    provider: {
      id: 'p1',
      name: 'متجر التقنية'
    }
  },
  {
    id: '2',
    title: 'حقيبة ظهر عصرية',
    description: 'حقيبة ظهر مريحة ومقاومة للماء',
    price: 199,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    rating: 4.2,
    category: 'أزياء',
    provider: {
      id: 'p2',
      name: 'متجر الأزياء'
    }
  },
  {
    id: '3',
    title: 'ساعة ذكية',
    description: 'ساعة ذكية متعددة الوظائف',
    price: 499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    rating: 4.7,
    category: 'إلكترونيات',
    provider: {
      id: 'p1',
      name: 'متجر التقنية'
    }
  }
];

const categories = [
  'الكل',
  'إلكترونيات',
  'أزياء',
  'منزل وحديقة',
  'رياضة',
  'كتب',
  'مستلزمات أطفال'
];

const Store = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [loading, setLoading] = useState(false);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = async (product: Product) => {
    try {
      setLoading(true);
      await addItem({
        id: product.id,
        type: 'store',
        title: product.title,
        price: product.price,
        quantity: 1,
        providerId: product.provider.id,
        image: product.image,
        status: 'pending',
        paymentStatus: 'unpaid',
        details: {}
      });
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 rtl">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              فلترة متقدمة
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className={selectedCategory === category ? 'bg-primary text-white' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">{product.price} ر.س</span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-primary text-white"
                    disabled={loading}
                  >
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    إضافة للسلة
                  </Button>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  {product.provider.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد منتجات مطابقة للبحث</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Store;