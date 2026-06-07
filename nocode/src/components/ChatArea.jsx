import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

const ChatArea = ({ 
  messages, 
  loading, 
  onSendMessage, 
  onSelectOption,
  mode,
  turtleQuestionsLeft,
  turtleSolved,
  quizStep,
  dimensionScores,
}) => {
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // 计算答题进度
  const getProgress = () => {
    if (mode !== 'personality') return 0;
    return ((quizStep + 1) / 5) * 100;
  };

  // 渲染消息内容
  const renderMessageContent = (msg) => {
    // 人格测试选项
    if (msg.type === 'quiz' && msg.question) {
      return (
        <div>
          <p className="whitespace-pre-line mb-3">{msg.content}</p>
          <div className="grid grid-cols-1 gap-2">
            {msg.question.options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => onSelectOption(opt.key)}
                className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors text-left"
              >
                <span className="font-bold text-purple-500 w-6">{opt.key}.</span>
                <span className="text-sm">{opt.text}</span>
              </button>
            ))}
          </div>
          {msg.totalSteps && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>答题进度</span>
                <span>{msg.step + 1} / {msg.totalSteps}</span>
              </div>
              <Progress value={((msg.step + 1) / msg.totalSteps) * 100} className="h-1.5" />
            </div>
          )}
        </div>
      );
    }

    // 人格测试结果（维度评分法）
    if (msg.type === 'personality_result') {
      const result = msg.result;
      const scores = msg.dimensionScores;
      return (
        <div>
          <p className="whitespace-pre-line mb-3">{msg.content}</p>
          {result && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl mt-3">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{result.personality_name}</div>
                <div className="text-sm opacity-90">{result.summary}</div>
              </div>
              {scores && (
                <div className="mt-3 pt-3 border-t border-white/20 text-xs">
                  <div className="grid grid-cols-5 gap-1 text-center">
                    <div>
                      <div className="font-bold">{scores.adventurous}</div>
                      <div className="opacity-70">尝鲜</div>
                    </div>
                    <div>
                      <div className="font-bold">{scores.intensity}</div>
                      <div className="opacity-70">浓烈</div>
                    </div>
                    <div>
                      <div className="font-bold">{scores.social}</div>
                      <div className="opacity-70">社交</div>
                    </div>
                    <div>
                      <div className="font-bold">{scores.value}</div>
                      <div className="opacity-70">性价比</div>
                    </div>
                    <div>
                      <div className="font-bold">{scores.comfort}</div>
                      <div className="opacity-70">治愈</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // 海龟汤答案
    if (msg.type === 'turtle_answer') {
      return (
        <div>
          <p className="whitespace-pre-line">{msg.content}</p>
        </div>
      );
    }

    // 普通文本
    return <p className="whitespace-pre-line">{msg.content}</p>;
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* 人格测试进度条 */}
      {mode === 'personality' && quizStep < 5 && (
        <div className="px-4 py-2 bg-purple-50 border-b border-purple-100">
          <div className="flex justify-between text-xs text-purple-600 mb-1">
            <span>人格测试进行中</span>
            <span>第 {quizStep + 1} / 5 题</span>
          </div>
          <Progress value={getProgress()} className="h-1.5 bg-purple-200" />
        </div>
      )}

      {/* 消息列表 */}
      <ScrollArea ref={scrollRef} className="flex-1 px-4 py-2">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[85%] p-3 rounded-2xl text-sm animate-in fade-in zoom-in duration-300
                  ${msg.role === 'user'
                    ? 'bg-red-500 text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                  }
                `}
              >
                {renderMessageContent(msg)}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* 海龟汤问题计数 */}
      {mode === 'turtle' && !turtleSolved && (
        <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
          <div className="flex items-center justify-between text-xs text-amber-700">
            <span>🐢 海龟汤模式</span>
            <span>剩余 {turtleQuestionsLeft} 次提问机会</span>
          </div>
        </div>
      )}

      {/* 输入框 */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={mode === 'turtle' ? '输入是/否问题...' : '输入消息...'}
            className="flex-1"
            disabled={mode === 'personality' && quizStep < 5 && !messages.some(m => m.type === 'personality_result')}
          />
          <Button 
            onClick={handleSend} 
            disabled={!inputValue.trim()}
            className="bg-red-500 hover:bg-red-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
