import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/tabs';
import {
  Search,
  Star,
  MessageCircle,
  TrendingUp,
  Filter,
  ChevronDown,
  ThumbsUp,
  Flag,
  BarChart
} from 'lucide-react';

interface Review {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  response?: string;
  date: string;
  status: 'published' | 'pending' | 'reported';
  helpful: number;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  responseRate: number;
}

const mockReviews: Review[] = [
  {
    id: 'R001',
    serviceId: '1',
    serviceName: 'فندق القصر الملكي - غرفة ديلوكس',
    customerName: 'أحمد محمد',
    customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    rating: 5,
    comment: 'تجربة رائعة! الغرفة نظيفة ومريحة والخدمة ممتازة. سأعود بالتأكيد مرة أخرى.',
    date: '2024-03-20',
    status: 'published',
    helpful: 12
  },
  {
    id: 'R002',
    serviceId: '1',
    serviceName: 'فندق القصر الملكي - جناح عائلي',
    customerName: 'سارة علي',
    customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
    rating: 4,
    comment: 'الإقامة كانت جيدة بشكل عام. الموقع ممتاز والغرفة واسعة. فقط الإفطار كان متوسط.',
    response: 'شكراً لتقييمك سارة! نقدر ملاحظاتك حول الإفطار وسنعمل على تحسينه.',
    date: '2024-03-19',
    status: 'published',
    helpful: 8
  },
  {
    id: 'R003',
    serviceId: '2',
    serviceName: 'فندق القصر الملكي - غرفة ديلوكس',
    customerName: 'خالد عبدالله',
    customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid',
    rating: 3,
    comment: 'الغرفة أصغر مما توقعت. الخدمة جيدة لكن السعر مرتفع مقارنة بالخدمات المقدمة.',
    date: '2024-03-18',
    status: 'pending',
    helpful: 5
  }
];

const reviewStats: ReviewStats = {
  averageRating: 4.2,
  totalReviews: 156,
  ratingDistribution: {
    5: 80,
    4: 45,
    3: 20,
    2: 8,
    1: 3
  },
  responseRate: 85
};

const DashboardReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [replyText, setReplyText] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReplySubmit = (reviewId: string) => {
    if (replyText.trim()) {
      setReviews(reviews.map(review =>
        review.id === reviewId
          ? { ...review, response: replyText }
          : review
      ));
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleStatusChange = (reviewId: string, newStatus: 'published' | 'pending' | 'reported') => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, status: newStatus }
        : review
    ));
  };

  const handleHelpfulClick = (reviewId: string) => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = selectedRating === 'all' || review.rating === selectedRating;
    const matchesStatus = selectedStatus === 'all' || review.status === selectedStatus;
    
    return matchesSearch && matchesRating && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">إدارة التقييمات</h2>
        </div>

        {/* Reviews Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600 fill-yellow-400" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">متوسط التقييم</h3>
            <p className="text-2xl font-bold">{reviewStats.averageRating}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-green-600">+12.5%</span>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">إجمالي التقييمات</h3>
            <p className="text-2xl font-bold">{reviewStats.totalReviews}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <ThumbsUp className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600">+8.3%</span>
            </div>
            <h3 className="text-sm text-gray-600 mb-1">نسبة الردود</h3>
            <p className="text-2xl font-bold">{reviewStats.responseRate}%</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <BarChart className="h-6 w-6 text-purple-600" />
              </div>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
            <h3 className="text-sm text-gray-600 mb-1">توزيع التقييمات</h3>
            <div className="space-y-2 mt-2">
              {Object.entries(reviewStats.ratingDistribution).reverse().map(([rating, count]) => (
                <div key={rating} className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm">{rating}</span>
                  </div>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{
                        width: `${(count / reviewStats.totalReviews) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="ابحث في التقييمات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="all">جميع التقييمات</option>
                <option value="5">5 نجوم</option>
                <option value="4">4 نجوم</option>
                <option value="3">3 نجوم</option>
                <option value="2">2 نجوم</option>
                <option value="1">1 نجمة</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="all">جميع الحالات</option>
                <option value="published">منشور</option>
                <option value="pending">قيد المراجعة</option>
                <option value="reported">تم الإبلاغ</option>
              </select>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                فلترة متقدمة
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.customerAvatar}
                      alt={review.customerName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{review.customerName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      review.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : review.status === 'reported'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.status === 'published'
                        ? 'منشور'
                        : review.status === 'reported'
                        ? 'تم الإبلاغ'
                        : 'قيد المراجعة'}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleStatusChange(review.id, 'reported')}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{review.comment}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleHelpfulClick(review.id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>مفيد ({review.helpful})</span>
                    </button>
                    <button
                      onClick={() => setReplyingTo(review.id)}
                      className="text-sm text-primary hover:text-primary/90"
                    >
                      رد
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">{review.serviceName}</span>
                </div>

                {review.response && (
                  <div className="mt-4 pr-8 border-r-2 border-gray-200">
                    <p className="text-sm text-gray-600">{review.response}</p>
                    <span className="text-xs text-gray-500 mt-1 block">رد الإدارة</span>
                  </div>
                )}

                {replyingTo === review.id && (
                  <div className="mt-4 space-y-2">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="اكتب ردك هنا..."
                      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setReplyText('');
                          setReplyingTo(null);
                        }}
                      >
                        إلغاء
                      </Button>
                      <Button
                        className="bg-primary text-white"
                        onClick={() => handleReplySubmit(review.id)}
                      >
                        إرسال الرد
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardReviews;