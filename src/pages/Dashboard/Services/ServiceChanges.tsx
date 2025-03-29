import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import { Button } from '../../../components/ui/button';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ServiceChange {
  id: string;
  serviceId: string;
  serviceName: string;
  changeType: 'edit' | 'delete' | 'add';
  status: 'pending' | 'approved' | 'rejected';
  changes: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  hasActiveBookings: boolean;
  requestDate: string;
  requestBy: string;
}

const mockChanges: ServiceChange[] = [
  {
    id: '1',
    serviceId: '123',
    serviceName: 'فندق القصر الملكي',
    changeType: 'edit',
    status: 'pending',
    changes: [
      {
        field: 'السعر',
        oldValue: '750',
        newValue: '850'
      },
      {
        field: 'الوصف',
        oldValue: 'غرفة فاخرة...',
        newValue: 'غرفة فاخرة مع إطلالة...'
      }
    ],
    hasActiveBookings: true,
    requestDate: '2024-03-20',
    requestBy: 'أحمد محمد'
  },
  {
    id: '2',
    serviceId: '124',
    serviceName: 'شقة مفروشة الصفوة',
    changeType: 'delete',
    status: 'pending',
    changes: [],
    hasActiveBookings: false,
    requestDate: '2024-03-19',
    requestBy: 'خالد عبدالله'
  }
];

const ServiceChanges = () => {
  const [changes, setChanges] = useState<ServiceChange[]>(mockChanges);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeTypeText = (type: string) => {
    switch (type) {
      case 'edit':
        return 'تعديل';
      case 'delete':
        return 'حذف';
      case 'add':
        return 'إضافة';
      default:
        return '';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">طلبات تغيير الخدمات</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            {changes.map((change) => (
              <div key={change.id} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{change.serviceName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(change.status)}`}>
                        {change.status === 'pending' ? 'قيد المراجعة' : change.status === 'approved' ? 'تمت الموافقة' : 'مرفوض'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getChangeTypeText(change.changeType)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 ml-1" />
                    {change.requestDate}
                  </div>
                </div>

                {change.hasActiveBookings && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      <div className="mr-3">
                        <p className="text-sm text-yellow-700">
                          يوجد حجوزات نشطة لهذه الخدمة. التغييرات تتطلب موافقة الإدارة.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {change.changeType === 'edit' && (
                  <div className="space-y-3 mb-4">
                    {change.changes.map((changeDetail, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                        <div className="font-medium">{changeDetail.field}</div>
                        <div className="text-red-500 line-through">{changeDetail.oldValue}</div>
                        <div className="text-green-600">{changeDetail.newValue}</div>
                      </div>
                    ))}
                  </div>
                )}

                {change.changeType === 'delete' && (
                  <p className="text-sm text-gray-600 mb-4">
                    طلب حذف الخدمة بالكامل من المنصة.
                  </p>
                )}

                <div className="flex justify-end gap-2">
                  {change.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setChanges(changes.map(c => 
                            c.id === change.id ? { ...c, status: 'rejected' } : c
                          ));
                        }}
                      >
                        <XCircle className="h-4 w-4 ml-2" />
                        رفض
                      </Button>
                      <Button
                        className="bg-primary text-white"
                        onClick={() => {
                          setChanges(changes.map(c => 
                            c.id === change.id ? { ...c, status: 'approved' } : c
                          ));
                        }}
                      >
                        <CheckCircle className="h-4 w-4 ml-2" />
                        موافقة
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServiceChanges;