
// 模拟店铺数据
export const storeData = {
  name: "巷口牛油火锅",
  logo: "https://nocode.meituan.com/photo/search?keyword=hotpot,logo&width=100&height=100",
  currentNumber: "A023",
  waitTime: 8, // 分钟
  peopleAhead: 12,
};

// 菜单数据
export const menuData = {
  signatures: [
    {
      id: 1,
      name: "番茄鸳鸯锅",
      price: 89,
      image: "https://nocode.meituan.com/photo/search?keyword=hotpot,soup&width=200&height=200",
      tag: "招牌",
      description: "经典番茄汤底，酸甜开胃",
    },
    {
      id: 2,
      name: "手打虾滑",
      price: 58,
      image: "https://nocode.meituan.com/photo/search?keyword=shrimp,paste&width=200&height=200",
      tag: "必点",
      description: "新鲜虾仁手工制作，Q弹爽滑",
    },
    {
      id: 3,
      name: "捞派毛肚",
      price: 68,
      image: "https://nocode.meituan.com/photo/search?keyword=tripe,hotpot&width=200&height=200",
      tag: "招牌",
      description: "七上八下，脆嫩爽口",
    },
    {
      id: 4,
      name: "冰皮麻薯",
      price: 22,
      image: "https://nocode.meituan.com/photo/search?keyword=mochi,dessert&width=200&height=200",
      tag: "新品",
      description: "夏日限定，清凉解暑",
    },
  ],
  combos: [
    {
      id: 101,
      name: "2人精选套餐",
      price: 238,
      originalPrice: 298,
      image: "https://nocode.meituan.com/photo/search?keyword=hotpot,set&width=200&height=200",
      items: ["鸳鸯锅", "虾滑", "肥牛", "蔬菜拼盘", "面条"],
    },
    {
      id: 102,
      name: "4人欢聚套餐",
      price: 428,
      originalPrice: 528,
      image: "https://nocode.meituan.com/photo/search?keyword=hotpot,feast&width=200&height=200",
      items: ["鸳鸯锅", "虾滑", "毛肚", "肥牛", "羊肉", "蔬菜拼盘", "主食拼盘"],
    },
  ],
};

// 人格测试题目
export const personalityQuiz = [
  {
    id: 1,
    question: "今天想吃重口还是清淡？",
    options: [
      { value: "spicy", label: "🔥 重口味，无辣不欢", icon: "🌶️" },
      { value: "mild", label: "🍃 清淡点，养生为主", icon: "🥗" },
    ],
  },
  {
    id: 2,
    question: "几个人一起吃饭？",
    options: [
      { value: "solo", label: "👤 一个人独享", icon: "🧘" },
      { value: "couple", label: "👥 两人约会", icon: "💕" },
      { value: "group", label: "👨‍👩‍👧‍👦 多人聚餐", icon: "🎉" },
    ],
  },
  {
    id: 3,
    question: "更看重什么？",
    options: [
      { value: "value", label: "💰 性价比", icon: "💵" },
      { value: "taste", label: "😋 口味", icon: "👨‍🍳" },
      { value: "photo", label: "📸 颜值", icon: "✨" },
      { value: "full", label: "🍚 吃饱", icon: "🥘" },
    ],
  },
];

// 人格测试结果
export const personalityResults = {
  "spicy-group-value": {
    title: "火辣社交达人",
    description: "你喜欢热闹，追求性价比，重口味是你的最爱",
    combo: "4人欢聚套餐 + 麻辣牛肉 + 鸭血",
    reason: "多人聚餐选大锅，麻辣过瘾，性价比超高",
  },
  "mild-couple-taste": {
    title: "番茄安全感玩家",
    description: "你偏好不太辣，适合约会，希望点单稳妥不踩雷",
    combo: "番茄鸳鸯锅 + 手打虾滑 + 响铃卷 + 冰汤圆",
    reason: "经典搭配，口味温和，约会首选",
  },
  "spicy-solo-full": {
    title: "独食辣勇者",
    description: "一个人也要吃爽，辣得过瘾，吃得满足",
    combo: "清油锅 + 毛肚 + 肥牛 + 宽粉",
    reason: "单人小锅，辣得过瘾，分量大满足",
  },
  default: {
    title: "美食探索家",
    description: "你对美食保持开放态度，喜欢尝试不同口味",
    combo: "鸳鸯锅 + 招牌拼盘 + 时令蔬菜",
    reason: "经典搭配，老少皆宜",
  },
};

// 海龟汤谜题
export const turtleSoupData = {
  riddle: "我不是一道菜，却是很多人第一次进店最先记住的东西；我不需要点单，却总是在你最需要的时候出现；我有温度，但不会烫嘴。我是什么？",
  answer: "热毛巾",
  explanation: "海底捞的热毛巾服务是品牌标志之一，从进店擦手到用餐中的热毛巾更换，这个细节服务让顾客印象深刻，体现了'服务至上'的品牌理念。",
  relatedProducts: [
    { id: 3, name: "捞派毛肚", price: 68 },
    { id: 5, name: "捞面", price: 18 },
  ],
};

// 优惠券数据
export const couponData = [
  {
    id: 1,
    name: "等位专享券",
    discount: "满200减30",
    validDays: 7,
    condition: "等待超过10分钟",
    icon: "🎁",
  },
  {
    id: 2,
    name: "人格测试专属券",
    discount: "8.8折",
    validDays: 14,
    condition: "完成人格测试",
    icon: "🎯",
  },
  {
    id: 3,
    name: "海龟汤挑战券",
    discount: "送招牌菜",
    validDays: 7,
    condition: "猜对海龟汤答案",
    icon: "🐢",
  },
];

// 互动模式配置
export const interactionModes = [
  {
    id: "menu",
    name: "菜单速看",
    icon: "📖",
    description: "3分钟了解招牌必点",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
    maxWaitTime: 5,
  },
  {
    id: "personality",
    name: "人格测试",
    icon: "🎯",
    description: "测测你的美食人格",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600",
    maxWaitTime: 5,
  },
  {
    id: "turtle",
    name: "店铺海龟汤",
    icon: "🐢",
    description: "猜谜赢招牌菜",
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-600",
    minWaitTime: 5,
    maxWaitTime: 10,
  },
  {
    id: "chat",
    name: "自由聊天",
    icon: "💬",
    description: "想问什么问什么",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-600",
    minWaitTime: 30,
  },
];

// AI初始消息
export const aiInitialMessages = {
  menu: "你好！我是你的等位小助手🤖 等待期间让我来帮你快速了解本店招牌吧！\n\n我们店的【番茄鸳鸯锅】是招牌，【手打虾滑】是必点，还有夏日限定的【冰皮麻薯】也很受欢迎～\n\n你有什么特别想吃的吗？或者让我给你推荐？",
  personality: "来做一个小测试吧！3个问题帮你找到最适合你的美食组合～",
  turtle: "来玩个有趣的猜谜游戏吧！🐢\n\n谜面：\n\"我不是一道菜，却是很多人第一次进店最先记住的东西；我不需要点单，却总是在你最需要的时候出现；我有温度，但不会烫嘴。\"\n\n你可以问我6个问题（我只能回答是/否/部分是/无关），然后猜出答案！",
  chat: "等待时间有点长呢，我来陪你聊聊天吧！😊\n\n关于菜单、店铺特色、或者单纯想吐槽等待时间，都可以跟我说～",
};

