import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const steps = ['正在解析知识库...', '正在构思题目...', '正在调用AI生成...'];

const LoadingOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center z-10"
    >
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1.5, repeat: Infinity },
        }}
      >
        <Sparkles className="w-10 h-10 text-purple-500" />
      </motion.div>
      <p className="mt-4 text-sm font-medium text-gray-700">正在调用AI生成中</p>
      <div className="mt-3 space-y-1.5">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            className="text-xs text-gray-500 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {step}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
