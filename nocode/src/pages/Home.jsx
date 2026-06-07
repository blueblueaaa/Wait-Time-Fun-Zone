import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Store, Users, Clock, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 卡通风格背景图 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://nocode.meituan.com/photo/search?keyword=cartoon,restaurant,waiting,cute,illustration&width=1200&height=800")',
        }}
      />
      {/* 暖黄色遮罩，贴合美团黄主题 */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/80 via-yellow-400/60 to-orange-400/80" />

      {/* 内容区域 */}
      <div className="relative z-10 w-full max-w-sm px-6 py-12">
        {/* 顶部装饰图标 */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/40 shadow-lg">
            <Sparkles className="w-8 h-8 text-yellow-200" />
          </div>
        </div>

        {/* 标题 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-3 drop-shadow-lg tracking-tight">
            等位奇遇局
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/90 text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>让等待变得有趣</span>
          </div>
        </div>

        {/* 入口卡片 */}
        <div className="grid grid-cols-1 gap-4">
          <Link to="/merchant">
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-white/95 backdrop-blur-sm hover:bg-white hover:-translate-y-1">
              <CardContent className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Store className="w-7 h-7 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">商家后台</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    上传菜单、管理店铺、生成互动内容
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user">
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-white/95 backdrop-blur-sm hover:bg-white hover:-translate-y-1">
              <CardContent className="p-6 flex items-center gap-5">
                <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">用户端</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    等位互动、人格测试、海龟汤
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* 底部提示 */}
        <p className="text-center text-white/70 text-xs mt-8 font-medium">
          选择一个入口开始体验
        </p>
      </div>
    </div>
  );
};

export default Home;
