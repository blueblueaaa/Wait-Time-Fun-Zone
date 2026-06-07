import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain, Turtle } from 'lucide-react';
import { fetchChunks, fetchGeneratedContent, saveGeneratedContent } from '@/services/knowledgeBase';
import { generateFullPersonalityTest, generateTurtleSoups } from '@/services/longcatApi';
import GenerationCard from './GenerationCard';

const ContentBuilder = ({ merchantId }) => {
  const [chunksCount, setChunksCount] = useState(0);
  const [generating, setGenerating] = useState({ personality: false, turtle: false });
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const chunks = await fetchChunks(merchantId);
      setChunksCount(chunks.length);
      const existing = await fetchGeneratedContent(merchantId);
      setContents(existing || []);
    };
    load();
  }, [merchantId]);

  const getContext = async () => {
    const chunks = await fetchChunks(merchantId);
    const fullText = chunks.map((c) => c.content).join('\n\n');
    return fullText.length > 4000 ? fullText.slice(0, 4000) + '...' : fullText;
  };

  const handleGenerate = async (type) => {
    const key = type === 'personality_test' ? 'personality' : 'turtle';
    setGenerating((prev) => ({ ...prev, [key]: true }));
    try {
      const context = await getContext();
      let result;
      if (type === 'personality_test') {
        result = await generateFullPersonalityTest(context || null);
      } else {
        result = await generateTurtleSoups(context || null);
      }
      await saveGeneratedContent(merchantId, type, result);
      const existing = await fetchGeneratedContent(merchantId);
      setContents(existing || []);
    } catch (err) {
      alert('生成失败：' + err.message);
    }
    setGenerating((prev) => ({ ...prev, [key]: false }));
  };

  const hasContent = (type) => contents.some((c) => c.content_type === type);

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between">
        <span className="text-sm text-blue-800">知识库文本块</span>
        <Badge variant="secondary">{chunksCount} 个片段</Badge>
      </div>

      <GenerationCard
        title="人格测试题目"
        icon={Brain}
        iconColor="text-purple-500"
        buttonClassName="bg-purple-600 hover:bg-purple-700"
        type="personality_test"
        description="基于知识库内容，生成5道人格测试题及10种人格结果"
        generating={generating.personality}
        hasContent={hasContent('personality_test')}
        onGenerate={handleGenerate}
        contentData={contents.find(c => c.content_type === 'personality_test')?.content_json}
      />

      <GenerationCard
        title="店铺海龟汤"
        icon={Turtle}
        iconColor="text-emerald-500"
        buttonClassName="bg-emerald-600 hover:bg-emerald-700"
        type="turtle_soup"
        description="基于知识库内容，生成10道简单易懂的海龟汤谜题"
        generating={generating.turtle}
        hasContent={hasContent('turtle_soup')}
        onGenerate={handleGenerate}
        contentData={contents.find(c => c.content_type === 'turtle_soup')?.content_json}
      />
    </div>
  );
};

export default ContentBuilder;
