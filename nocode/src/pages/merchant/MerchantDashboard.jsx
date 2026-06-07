import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import ProfileEditor from '@/components/merchant/ProfileEditor';
import DocumentUploader from '@/components/merchant/DocumentUploader';
import ContentBuilder from '@/components/merchant/ContentBuilder';

const MerchantDashboard = () => {
  const [merchantId, setMerchantId] = useState(() => {
    const saved = localStorage.getItem('merchant_id');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const handleIdChange = (id) => {
    setMerchantId(id);
    localStorage.setItem('merchant_id', String(id));
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-2xl mx-auto">
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3">
        <Link to="/" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">商家管理中心</h1>
          <p className="text-sm text-gray-500">管理店铺信息、上传文档、生成互动内容</p>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">店铺信息</TabsTrigger>
            <TabsTrigger value="documents">文档管理</TabsTrigger>
            <TabsTrigger value="content">内容生成</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <ProfileEditor merchantId={merchantId} onIdChange={handleIdChange} onSaved={triggerRefresh} />
          </TabsContent>

          <TabsContent value="documents" className="mt-4">
            <DocumentUploader merchantId={merchantId} key={`doc-${refreshKey}`} />
          </TabsContent>

          <TabsContent value="content" className="mt-4">
            <ContentBuilder merchantId={merchantId} key={`content-${refreshKey}`} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MerchantDashboard;
