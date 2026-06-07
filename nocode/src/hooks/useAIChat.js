import { useState, useCallback, useEffect } from 'react';
import {
  aiInitialMessages,
} from '@/data/mockData';
import {
  getOrCreatePersonalityTest,
  calculateDimensionScores,
  calculatePersonalityResult,
  getOrCreateTurtleSoup,
  getRandomTurtleSoup,
  judgeTurtleQuestion,
  generateChatResponse,
  generateMenuResponse,
} from '@/services/longcatApi';

export const useAIChat = (mode, merchantId = 1) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [turtleQuestionsLeft, setTurtleQuestionsLeft] = useState(6);
  const [turtleSolved, setTurtleSolved] = useState(false);
  const [turtleHistory, setTurtleHistory] = useState([]);
  const [testData, setTestData] = useState(null);
  const [dimensionScores, setDimensionScores] = useState({
    adventurous: 0,
    intensity: 0,
    social: 0,
    value: 0,
    comfort: 0,
  });
  const [turtleData, setTurtleData] = useState(null);

  // 加载人格测试数据
  useEffect(() => {
    if (mode === 'personality') {
      const loadTestData = async () => {
        try {
          const data = await getOrCreatePersonalityTest(merchantId);
          setTestData(data);
        } catch (error) {
          console.error('Failed to load test data:', error);
        }
      };
      loadTestData();
    }
  }, [mode, merchantId]);

  // 加载海龟汤数据
  useEffect(() => {
    if (mode === 'turtle') {
      const loadTurtleData = async () => {
        try {
          const data = await getOrCreateTurtleSoup(merchantId);
          setTurtleData(data);
        } catch (error) {
          console.error('Failed to load turtle data:', error);
        }
      };
      loadTurtleData();
    }
  }, [mode, merchantId]);

  // 初始化消息
  const initChat = useCallback(async () => {
    const initialMsg = aiInitialMessages[mode] || aiInitialMessages.chat;
    setMessages([
      {
        id: Date.now(),
        role: 'ai',
        content: initialMsg,
        type: 'text',
      },
    ]);
    setQuizStep(0);
    setQuizAnswers({});
    setCurrentQuestion(null);
    setTurtleQuestionsLeft(6);
    setTurtleSolved(false);
    setTurtleHistory([]);
    setDimensionScores({
      adventurous: 0,
      intensity: 0,
      social: 0,
      value: 0,
      comfort: 0,
    });

    // 人格测试模式下，显示第一题
    if (mode === 'personality') {
      setLoading(true);
      try {
        let data = testData;
        if (!data) {
          data = await getOrCreatePersonalityTest(merchantId);
          setTestData(data);
        }
        
        if (data && data.questions && data.questions.length > 0) {
          const firstQuestion = data.questions[0];
          setCurrentQuestion(firstQuestion);
          setMessages([
            {
              id: Date.now(),
              role: 'ai',
              content: `${data.test_title}\n${data.test_subtitle}\n预计用时：${data.estimated_time}\n\n第1题：${firstQuestion.question}`,
              type: 'quiz',
              question: firstQuestion,step: 0,
              totalSteps: 5,
            },
          ]);}
      } catch (error) {
        console.error('Failed to load question:', error);
      }
      setLoading(false);
    }

    // 海龟汤模式下，使用动态生成的谜题
    if (mode === 'turtle') {
      setLoading(true);
      try {
        let data = turtleData;
        if (!data) {
          data = await getOrCreateTurtleSoup(merchantId);
          setTurtleData(data);
        }
        
        if (data) {
          setMessages([
            {
              id: Date.now(),
              role: 'ai',
              content: `🐢 ${data.title}\n\n${data.surface_story}\n\n你可以问我最多6个是/否问题来猜出答案！\n\n输入"提示"可以获取提示，输入"放弃"可以查看答案。`,
              type: 'text',
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to load turtle soup:', error);
      }
      setLoading(false);
    }
  }, [mode, testData, turtleData, merchantId]);

  useEffect(() => {
    initChat();
  }, [mode, initChat]);

  // 发送消息
  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content,
      type: 'text',
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      let aiResponse;
      switch (mode) {
        case 'menu':
          aiResponse = await generateMenuResponse(content);
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            role: 'ai',
            content: aiResponse,
            type: 'text',
          }]);
          break;
        case 'personality':
          await handlePersonalityResponse(content);
          break;
        case 'turtle':
          // 如果已经猜对,且用户表达想再玩一次,则重置并加载新题
          if (turtleSolved &&/(再来|再玩|继续|下一题|新题|换一个|好|对|嗯|行|yes|y|玩|开始)/i.test(content.trim())) {
            setTurtleSolved(false);
            setTurtleQuestionsLeft(6);
            setTurtleHistory([]);
            
            try {
              const newSoup = await getRandomTurtleSoup();
              setTurtleData(newSoup);
              
              setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'ai',
                content: `🐢 新谜题来啦！\n\n${newSoup.title}\n\n${newSoup.surface_story}\n\n你可以问我最多6个是/否问题来猜出答案！\n\n输入"提示"可以获取提示，输入"放弃"可以查看答案。`,
                type: 'text',
              }]);
            } catch (err) {
              console.error('Failed to load new soup:', err);
              setMessages(prev => [...prev, {
                id: Date.now() + 1,
                role: 'ai',
                content: '新谜题加载失败，请稍后再试～',
                type: 'text',
              }]);
            }
          } else {
            aiResponse = await generateTurtleResponse(content);
            setMessages(prev => [...prev, {
              id: Date.now() + 1, 
              role: 'ai', 
              content: aiResponse.content,
              type: aiResponse.type,
              answer: aiResponse.answer,
              explanation: aiResponse.explanation,
            }]);
          }
          break;
        default:
          aiResponse = await generateChatResponse(content);
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            role: 'ai',
            content: aiResponse,
            type: 'text',
          }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: '抱歉，我遇到了一点问题，请稍后再试～',
        type: 'text',
      }]);
    }
    setLoading(false);
  }, [mode, quizStep, quizAnswers, currentQuestion, turtleQuestionsLeft, turtleSolved, turtleHistory, testData, turtleData, merchantId]);

  // 处理人格测试响应（维度评分法）
  const handlePersonalityResponse = async (userMsg) => {
    if (!testData || !testData.questions) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: '测试数据加载中，请稍候...',
        type: 'text',
      }]);
      return;
    }

    if (userMsg.startsWith('option:')) {
      const optionKey = userMsg.replace('option:', '');
      const newAnswers = { ...quizAnswers, [quizStep]: optionKey };
      setQuizAnswers(newAnswers);

      const currentScores = calculateDimensionScores(newAnswers, testData);
      setDimensionScores(currentScores);

      if (quizStep < 4) {
        const nextStep = quizStep + 1;
        setQuizStep(nextStep);
        const nextQuestion = testData.questions[nextStep];
        setCurrentQuestion(nextQuestion);
        
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'ai',
          content: `第${nextStep + 1}题：${nextQuestion.question}`,
          type: 'quiz',
          question: nextQuestion,
          step: nextStep,
          totalSteps: 5,
        }]);
      } else {
        const result = calculatePersonalityResult(newAnswers, testData);
        
        if (result) {
          const comboText = result.recommended_combo ? result.recommended_combo.join('、') : '';
          const dimensionText = `📊 你的维度分数：\n尝鲜度：${currentScores.adventurous} |浓烈度：${currentScores.intensity} | 社交度：${currentScores.social}\n性价比：${currentScores.value} | 治愈度：${currentScores.comfort}`;
          
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            role: 'ai',
            content: `${dimensionText}\n\n🎉 测试完成！\n\n你的美食人格是：${result.personality_name}\n${result.summary}\n\n${result.description}\n\n📋 适合点单风格：${result.ordering_style}\n\n🍽️ 推荐菜品：${comboText}\n💡 推荐理由：${result.recommendation_reason}\n\n🎁 ${result.coupon_hook}`,
            type: 'personality_result',
            result,dimensionScores: currentScores,
          }]);
        } else {
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            role: 'ai',
            content: '测试完成！根据你的选择，你是一位独特的美食家～可以查看下方的推荐菜品哦！',
            type: 'text',
          }]);
        }
      }
      return;
    }

    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      role: 'ai',
      content: '请点击上方选项继续测试吧～',
      type: 'text',
    }]);
  };

  // 海龟汤响应
  const generateTurtleResponse = async (userMsg) => {
    let currentTurtleData = turtleData;
    if (!currentTurtleData) {
      try {
        currentTurtleData = await getOrCreateTurtleSoup(merchantId);
        setTurtleData(currentTurtleData);
      } catch (error) {
        console.error('Failed to load turtle data:', error);
        return {
          content: '谜题加载中，请稍后再试～',
          type: 'text',
        };
      }
    }

    if (turtleSolved) {
      return {
        content: `你已经猜对啦！答案就是【${currentTurtleData.answer}】～还想再玩一次吗？`,
        type: 'text',
      };
    }

    try {
      const judgment = await judgeTurtleQuestion(userMsg, currentTurtleData, turtleHistory);
      
      if (judgment.includes('恭喜你，猜对了') || judgment.includes('猜对了')) {
        setTurtleSolved(true);
        return {
          content: judgment,
          type: 'turtle_answer',
          answer: currentTurtleData.answer,
          explanation: currentTurtleData.explanation,
        };
      }

      if (judgment.includes('答案是：') && (userMsg.includes('不玩了') || userMsg.includes('放弃') || userMsg.includes('公布'))) {
        setTurtleSolved(true);
        return {
          content: judgment,
          type: 'turtle_answer',
          answer: currentTurtleData.answer,
          explanation: currentTurtleData.explanation,
        };
      }

      if (!userMsg.includes('提示')) {
        setTurtleHistory(prev => [...prev, { question: userMsg, answer: judgment }]);
        setTurtleQuestionsLeft(prev => Math.max(0, prev - 1));
      }

      const remaining = turtleQuestionsLeft - (userMsg.includes('提示') ? 0 : 1);
      if (remaining <= 0 && !turtleSolved) {
        setTurtleSolved(true);
        return {
          content: `次数用完了！答案是：${currentTurtleData.answer}\n\n${currentTurtleData.explanation}`,
          type: 'turtle_answer',
          answer: currentTurtleData.answer,
          explanation: currentTurtleData.explanation,
        };
      }

      const suffix = remaining > 0 ? `\n\n（剩余${remaining}次提问机会）` : '';
      return {
        content: `${judgment}${suffix}`,
        type: 'text',
      };
    } catch (error) {
      console.error('Turtle response error:', error);
      return {
        content: '游戏出了点小问题，请稍后再试～',
        type: 'text',
      };
    }
  };

  const selectOption = useCallback((optionValue) => {
    sendMessage(`option:${optionValue}`);
  }, [sendMessage]);

  return {
    messages,
    loading,
    sendMessage,
    selectOption,
    quizStep,
    quizAnswers,
    turtleQuestionsLeft,
    turtleSolved,
    initChat,
    testData,
    dimensionScores,
    turtleData,
  };
};
