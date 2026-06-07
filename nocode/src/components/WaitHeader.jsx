import React from 'react';
import { Clock, Users, Hourglass } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const WaitHeader = ({ storeName, currentNumber, elapsedTime, estimatedWaitTime, peopleAhead, loading, recommendedMode }) => {
  if (loading) {
    return (
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <Skeleton className="h-5 w-32 bg-gray-200 mb-2" />
        <Skeleton className="h-8 w-24 bg-gray-200 mb-2" />
        <div className="flex gap-4 mt-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-4 w-20 bg-gray-200" />
        </div>
      </div>
    );
  }

  const getModeLabel = () => {
    switch (recommendedMode) {
      case 'menu': return '菜单速看';
      case 'personality': return '人格测试已解锁';
      case 'turtle': return '海龟汤已解锁';
      case 'chat': return '自由聊天';
      default: return '';
    }
  };

  const getModeColor = () => {
    switch (recommendedMode) {
      case 'menu': return 'text-blue-500 bg-blue-50';
      case 'personality': return 'text-purple-500 bg-purple-50';
      case 'turtle': return 'text-emerald-500 bg-emerald-50';
      case 'chat': return 'text-orange-500 bg-orange-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  // 格式化已等待时间
  const formatElapsedTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes}分钟`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}小时${mins}分` : `${hours}小时`;
  };

  // 计算预计剩余等待时间
  const getRemainingTime = () => {
    const remaining = Math.max(0, estimatedWaitTime - elapsedTime);
    if (remaining < 60) {
      return `${remaining}分钟`;
    }
    const hours = Math.floor(remaining / 60);
    const mins = remaining % 60;
    return mins > 0 ? `${hours}小时${mins}分` : `${hours}小时`;
  };

  return (
    <div className="bg-white px-4 py-3 border-b border-gray-100">
      {/* 店铺名称 */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-base font-semibold text-gray-900">{storeName}</h1>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getModeColor()}`}>
          {getModeLabel()}
        </span>
      </div>
      
      {/* 排队号码 */}
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-red-50 text-red-500 px-3 py-1.5 rounded-lg">
          <span className="text-xs text-red-400 mr-1">当前号码</span>
          <span className="text-xl font-bold">{currentNumber}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>前面{peopleAhead}桌</span>
        </div>
      </div>
      
      {/* 等待时间信息 */}
      <div className="space-y-2">
        {/* 已等待时间 */}
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>已等待 <span className="font-semibold text-gray-900">{formatElapsedTime(elapsedTime)}</span></span>
          {elapsedTime >= 10 && (
            <span className="text-xs text-orange-500 ml-auto">解锁全部互动</span>
          )}
        </div>
        
        {/* 预计等待时间 */}
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
          <Hourglass className="w-4 h-4 text-blue-400" />
          <span>预计还需 <span className="font-semibold text-blue-600">{getRemainingTime()}</span></span>
          <span className="text-xs text-gray-400 ml-auto">总计约{estimatedWaitTime}分钟</span>
        </div>
      </div>
    </div>
  );
};

export default WaitHeader;
