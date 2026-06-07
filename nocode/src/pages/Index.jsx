import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWaitStatus } from '@/hooks/useWaitStatus';
import { useAIChat } from '@/hooks/useAIChat';
import WaitHeader from '@/components/WaitHeader';
import ModeSwitcher from '@/components/ModeSwitcher';
import ChatArea from '@/components/ChatArea';
import RecommendationArea from '@/components/RecommendationArea';
import CouponArea from '@/components/CouponArea';
import BottomNav from '@/components/BottomNav';

const Index = () => {
  const navigate = useNavigate();
  const merchantId = 1;
  const {
    storeName,
    currentNumber,
    elapsedTime,
    estimatedWaitTime,
    peopleAhead,
    loading,
  } = useWaitStatus();

  const [currentMode, setCurrentMode] = useState('menu');

  const {
    messages,
    loading: chatLoading,
    sendMessage,
    selectOption,
    quizStep,
    quizAnswers,
    turtleQuestionsLeft,
    turtleSolved,
    initChat,
    dimensionScores,
    testData,
  } = useAIChat(currentMode, merchantId);

  useEffect(() => {
    initChat();
  }, [currentMode, initChat]);

  const getPersonalityResult = () => {
    if (currentMode === 'personality' && quizStep === 5 && testData) {
      const lastResultMsg = messages.find(m => m.type === 'personality_result');
      if (lastResultMsg && lastResultMsg.result) {
        return lastResultMsg.result;
      }
    }
    return null;
  };

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  const handleBack = () => {
    navigate('/');
  };

  const personalityResult = getPersonalityResult();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 max-w-md mx-auto">
      <WaitHeader
        storeName={storeName}
        currentNumber={currentNumber}
        elapsedTime={elapsedTime}
        estimatedWaitTime={estimatedWaitTime}
        peopleAhead={peopleAhead}
        loading={loading}
        recommendedMode={currentMode}
      />

      <ModeSwitcher
        currentMode={currentMode}
        onModeChange={handleModeChange}
      />

      <ChatArea
        messages={messages}
        loading={chatLoading}
        onSendMessage={sendMessage}
        onSelectOption={selectOption}
        mode={currentMode}
        turtleQuestionsLeft={turtleQuestionsLeft}
        turtleSolved={turtleSolved}
        quizStep={quizStep}
        dimensionScores={dimensionScores}
      />

      <RecommendationArea
        mode={currentMode}
        personalityResult={personalityResult}
        dimensionScores={dimensionScores}
      />

      <CouponArea
        mode={currentMode}
        turtleSolved={turtleSolved}
        waitTime={elapsedTime}
        personalityResult={personalityResult}
      />

      <BottomNav onBack={handleBack} />
    </div>
  );
};

export default Index;
