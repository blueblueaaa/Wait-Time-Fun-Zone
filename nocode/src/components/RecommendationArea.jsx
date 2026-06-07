import React from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { menuData } from '@/data/mockData';

const RecommendationArea = ({ mode, personalityResult, dimensionScores }) => {
  // 根据模式获取推荐商品
  const getRecommendations = () => {
    switch (mode) {
      case 'menu':
        return menuData.signatures.slice(0, 4);
      case 'personality':
        if (personalityResult && personalityResult.recommended_combo) {
          // 根据人格结果的推荐组合生成推荐
          return personalityResult.recommended_combo.slice(0, 4).map((itemName, index) => ({
            id: 200 + index,
            name: itemName,
            price: '--',
            image: `https://nocode.meituan.com/photo/search?keyword=hotpot,${encodeURIComponent(itemName)}&width=200&height=200`,
            description: personalityResult.recommendation_reason?.substring(0, 20) || '',
            tag: personalityResult.personality_name?.substring(0, 4) || '推荐',
          }));
        }
        return [];
      case 'turtle':
        return menuData.signatures.slice(0, 2);
      case 'chat':
        return menuData.combos;
      default:
        return [];
    }
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) return null;

  return (
    <div className="px-4 py-3 bg-white border-t border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-gray-800">
            {mode === 'personality' && personalityResult ? '你的专属推荐' : '精选推荐'}
          </h3>
          {mode === 'personality' && personalityResult && (
            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">
              {personalityResult.personality_name}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500">向左滑动查看更多</span>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {recommendations.map((item) => (
          <Card key={item.id} className="flex-shrink-0 w-36 overflow-hidden border border-gray-200">
            <div className="relative h-24 bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.tag && (
                <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                  {item.tag}
                </span>
              )}
            </div>
            <CardContent className="p-2">
              <h4 className="text-sm font-medium text-gray-800 truncate">{item.name}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-red-500 font-bold text-sm">
                  {typeof item.price === 'number' ? `¥${item.price}` : item.price}
                </span>
                <Button size="icon" variant="ghost" className="w-6 h-6 text-red-500">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {item.description && (
                <p className="text-xs text-gray-500 mt-1 truncate">{item.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendationArea;
