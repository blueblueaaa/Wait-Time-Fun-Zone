import React, { useState } from 'react';
import { Gift, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { couponData } from '@/data/mockData';

const CouponArea = ({ mode, turtleSolved, waitTime, personalityResult }) => {
  const [claimedCoupons, setClaimedCoupons] = useState([]);
  const [claimingId, setClaimingId] = useState(null);

  // 获取可用的优惠券
  const getAvailableCoupons = () => {
    const coupons = [];
    
    // 等位券（等待超过10分钟）
    if (waitTime >= 10) {
      coupons.push(couponData[0]);
    }
    
    // 人格测试券（必须完成测试才能获得）
    if (mode === 'personality' && personalityResult) {
      coupons.push(couponData[1]);
    }
    
    // 海龟汤券（猜对答案）
    if (mode === 'turtle' && turtleSolved) {
      coupons.push(couponData[2]);
    }
    
    return coupons;
  };

  const handleClaim = async (couponId) => {
    setClaimingId(couponId);
    // 模拟领取请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    setClaimedCoupons(prev => [...prev, couponId]);
    setClaimingId(null);
  };

  const coupons = getAvailableCoupons();

  if (coupons.length === 0) return null;

  return (
    <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-100">
      <div className="flex items-center gap-2 mb-3">
        <Gift className="w-5 h-5 text-amber-600" />
        <h3 className="text-sm font-bold text-amber-800">可领取优惠券</h3>
      </div>
      
      <div className="space-y-2">
        {coupons.map((coupon) => {
          const isClaimed = claimedCoupons.includes(coupon.id);
          
          return (
            <div
              key={coupon.id}
              className={`
                flex items-center justify-between p-3 rounded-xl border transition-all
                ${isClaimed 
                  ? 'bg-gray-100 border-gray-200' 
                  : 'bg-white border-amber-200 shadow-sm'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl">
                  {coupon.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">{coupon.name}</h4>
                  <p className="text-xs text-red-500 font-medium">{coupon.discount}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>有效期{coupon.validDays}天</span>
                  </div>
                </div>
              </div>
              
              <Button
                size="sm"
                onClick={() => handleClaim(coupon.id)}
                disabled={isClaimed || claimingId === coupon.id}
                className={`
                  ${isClaimed 
                    ? 'bg-gray-300 hover:bg-gray-300' 
                    : 'bg-amber-500 hover:bg-amber-600'
                  }
                `}
              >
                {claimingId === coupon.id ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isClaimed ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    已领
                  </>
                ) : (
                  '领取'
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CouponArea;
