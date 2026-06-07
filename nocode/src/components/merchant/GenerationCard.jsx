import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Eye, RefreshCw } from 'lucide-react';
import LoadingOverlay from './LoadingOverlay';
import PreviewModal from './PreviewModal';

const GenerationCard = ({
  title,
  icon: Icon,
  iconColor,
  buttonClassName,
  type,
  description,
  generating,
  hasContent,
  onGenerate,
  contentData,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <Card className="relative overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{title}</h3>
                {hasContent && (
                  <Badge variant="secondary" className="mt-1">
                    <Check className="w-3 h-3 mr-1" />
                    已生成
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>

          <div className="flex gap-2">
            {!hasContent ? (
              <Button
                onClick={() => onGenerate(type)}
                disabled={generating}
                className={`flex-1 ${buttonClassName}`}
              >
                {generating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    开始生成
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setPreviewOpen(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  预览
                </Button>
                <Button
                  onClick={() => onGenerate(type)}
                  disabled={generating}
                  className={`flex-1 ${buttonClassName}`}
                >
                  {generating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      重新生成
                    </>
                  )}
                </Button>
              </>
            )}
          </div>

          {generating && <LoadingOverlay />}
        </CardContent>
      </Card>

      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        type={type}
        content={contentData}
        onRegenerate={() => onGenerate(type)}
      />
    </>
  );
};

export default GenerationCard;
