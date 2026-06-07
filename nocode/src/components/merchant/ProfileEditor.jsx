import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';
import { fetchMerchant, upsertMerchant } from '@/services/knowledgeBase';

const ProfileEditor = ({ merchantId, onIdChange, onSaved }) => {
  const [form, setForm] = useState({ name: '', description: '', brand_story: '', logo_url: '' });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchMerchant(merchantId);
      if (data) {
        setForm(data);
      } else {
        setForm({ name: '', description: '', brand_story: '', logo_url: '' });
      }
      setLoading(false);
    };
    load();
  }, [merchantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const result = await upsertMerchant({ id: merchantId, ...form });
    if (result && result.id !== merchantId) {
      onIdChange?.(result.id);
    }
    setSaving(false);
    onSaved?.();
  };

  if (loading) return <div className="p-8 text-center text-gray-500">加载中...</div>;

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div>
          <Label htmlFor="name">店铺名称</Label>
          <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="请输入店铺名称" />
        </div>
        <div>
          <Label htmlFor="description">店铺介绍</Label>
          <Textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="简述店铺特色、主打菜品等" rows={3} />
        </div>
        <div>
          <Label htmlFor="brand_story">品牌故事</Label>
          <Textarea id="brand_story" name="brand_story" value={form.brand_story} onChange={handleChange} placeholder="品牌创立故事、理念等" rows={3} />
        </div>
        <div>
          <Label htmlFor="logo_url">Logo 图片链接</Label>
          <Input id="logo_url" name="logo_url" value={form.logo_url} onChange={handleChange} placeholder="https://..." />
        </div>
        <Button onClick={handleSubmit} disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          保存信息
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileEditor;
