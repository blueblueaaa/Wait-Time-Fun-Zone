import React, { useEffect } from 'react';
import { X, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// 模式解锁配置
const unlockConfig = {
  personality: {
    title: '人格测试解锁啦！',
    subtitle: '等待已满5分钟',
    icon: '🎯',
    description: '做3道简单选择题，发现你的美食人格，获取专属推荐组合～',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    buttonText: '开始测试',
  },
  turtle: {
    title: '店铺海龟汤解锁啦！',
    subtitle: '等待已满10分钟',
    icon: '🐢',
    description: '通过提问猜出谜底，猜对即可赢取招牌菜奖励！',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    buttonText: '开始挑战',
  },
};

const ModeUnlockModal = ({ mode, isOpen, onClose, onConfirm }) => {
  if (!mode || !unlockConfig[mode]) return null;
  
  const config = unlockConfig[mode];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[320px] p-0 overflow-hidden border-0">
        {/* 顶部装饰 */}
        <div className={`${config.bgColor} px-6 py-8 text-center`}>
          <div className="text-5xl mb-3">{config.icon}</div>
          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 ${config.color} text-xs font-medium mb-2`}>
            <Sparkles className="w-3 h-3" />
            {config.subtitle}
          </div>
          <h3 className="text-lg font-bold text-gray-900">{config.title}</h3>
        </div>
        
        {/* 内容 */}
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            {config.description}
          </p>
          
          {mode === 'turtle' && (
            <div className="mt-4 p-3 bg-amber-50 rounded-lg flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-amber-700">猜对送招牌菜一份</span>
            </div>
          )}
        </div>
        
        {/* 按钮 */}
        <div className="px-6 pb-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            稍后再说
          </Button>
          <Button
            className={`flex-1 ${mode === 'personality' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white`}
            onClick={onConfirm}
          >
            {config.buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModeUnlockModal;
