import React from 'react';
import { Home, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BottomNav = ({ onBack }) => {
  return (
    <div className="px-4 py-3 bg-white border-t border-gray-200 flex items-center justify-between">
      <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600">
        <Home className="w-4 h-4 mr-1" />
        首页
      </Button>
      
      <div className="flex gap-2">
        <Button variant="outline" size="icon" className="w-9 h-9 rounded-full">
          <Heart className="w-4 h-4 text-gray-600" />
        </Button>
        <Button variant="outline" size="icon" className="w-9 h-9 rounded-full">
          <Share2 className="w-4 h-4 text-gray-600" />
        </Button>
      </div>
    </div>
  );
};

export default BottomNav;
