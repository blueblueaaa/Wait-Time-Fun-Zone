import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brain, Turtle, RefreshCw } from 'lucide-react';

const PreviewModal = ({ isOpen, onClose, type, content, onRegenerate }) => {
  if (!content) return null;
  const isPersonality = type === 'personality_test';
  const results = isPersonality ? (content.personality_results || []) : [];
  const questions = isPersonality ? (content.questions || []) : [];
  const soups = !isPersonality && Array.isArray(content) ? content : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg h-[85vh] p-0 flex flex-col">
        <DialogHeader className="px-4 py-3 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2 text-base">
            {isPersonality ? <Brain className="w-5 h-5 text-purple-500" /> : <Turtle className="w-5 h-5 text-emerald-500" />}
            {isPersonality ? '人格测试预览' : '海龟汤预览'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {isPersonality ? (
            <div className="space-y-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <h3 className="font-bold text-purple-800">{content.test_title || '人格测试'}</h3>
                <p className="text-sm text-purple-600">{content.test_subtitle}</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700">测试题目</h4>
                {questions.map((q, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">{idx + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {(q.options || []).map((opt) => (
                        <div key={opt.key} className="text-xs text-gray-600 bg-white px-2 py-1.5 rounded border">
                          <span className="font-bold mr-1">{opt.key}.</span>{opt.text}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {results.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-gray-700">人格结果</h4>
                  {results.slice(0, 5).map((r, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-100">
                      <div className="font-bold text-sm text-purple-800">{r.personality_name}</div>
                      <div className="text-xs text-gray-600 mt-1">{r.summary}</div>
                      <div className="text-xs text-gray-500 mt-1">推荐：{(r.recommended_combo || []).join('、')}</div>
                    </div>
                  ))}
                  {results.length > 5 && <div className="text-center text-xs text-gray-400">还有 {results.length - 5} 种人格...</div>}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-3 rounded-lg">
                <h3 className="font-bold text-emerald-800">海龟汤谜题列表</h3>
                <p className="text-sm text-emerald-600">共 {soups.length} 道谜题</p>
              </div>
              <div className="space-y-3">
                {soups.map((soup, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">第{idx + 1}题</span>
                      <span className="text-sm font-bold text-gray-800">{soup.title}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{soup.surface_story}</p>
                    <div className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block">答案：{soup.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t flex gap-2 shrink-0">
          <Button variant="outline" className="flex-1" onClick={onClose}>关闭</Button>
          <Button className="flex-1" onClick={() => { onRegenerate?.(); onClose(); }}>
            <RefreshCw className="w-4 h-4 mr-2" />重新生成
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
