import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { storeData } from '@/data/mockData';

export const useWaitStatus = (merchantId = 1) => {
  const [waitStatus, setWaitStatus] = useState({
    storeName: '',
    currentNumber: '',
    elapsedTime: 0,
    estimatedWaitTime: 0,
    peopleAhead: 0,
    loading: true,
  });

  const [unlockedModes, setUnlockedModes] = useState({
    personality: false,
    turtle: false,
  });

  useEffect(() => {
    const fetchWaitStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      let merchantName = storeData.name;
      try {
        const { data } = await supabase.from('merchants').select('name').eq('id', merchantId).maybeSingle();
        if (data?.name) merchantName = data.name;
      } catch (e) {
        console.error('Failed to load merchant name:', e);
      }
      setWaitStatus({
        storeName: merchantName,
        currentNumber: storeData.currentNumber,
        elapsedTime: 0,
        estimatedWaitTime: storeData.waitTime || 15,
        peopleAhead: storeData.peopleAhead,
        loading: false,
      });
    };

    fetchWaitStatus();
    const interval = setInterval(() => {
      setWaitStatus(prev => ({
        ...prev,
        elapsedTime: prev.elapsedTime + 1,
        estimatedWaitTime: Math.max(0, prev.estimatedWaitTime - 1),
      }));
    }, 60000);
    return () => clearInterval(interval);
  }, [merchantId]);

  useEffect(() => {
    const { elapsedTime } = waitStatus;
    if (elapsedTime >= 5 && !unlockedModes.personality) {
      setUnlockedModes(prev => ({ ...prev, personality: true }));
    }
    if (elapsedTime >= 10 && !unlockedModes.turtle) {
      setUnlockedModes(prev => ({ ...prev, turtle: true }));
    }
  }, [waitStatus.elapsedTime, unlockedModes]);

  const getRecommendedMode = useCallback(() => {
    const { elapsedTime } = waitStatus;
    if (elapsedTime < 5) return 'menu';
    if (elapsedTime < 10) return 'personality';
    return 'turtle';
  }, [waitStatus.elapsedTime]);

  const getAvailableModes = useCallback(() => {
    const { elapsedTime } = waitStatus;
    const modes = ['menu', 'chat'];
    if (elapsedTime >= 5 || unlockedModes.personality) {
      modes.push('personality');
    }
    if (elapsedTime >= 10 || unlockedModes.turtle) {
      modes.push('turtle');
    }
    return modes;
  }, [waitStatus.elapsedTime, unlockedModes]);

  const markModeAsViewed = useCallback(() => {}, []);

  return {
    ...waitStatus,
    recommendedMode: getRecommendedMode(),
    availableModes: getAvailableModes(),
    unlockedModes,
    markModeAsViewed,
  };
};
