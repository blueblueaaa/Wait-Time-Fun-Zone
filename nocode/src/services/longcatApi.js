
import axios from 'axios';
import { supabase } from '@/integrations/supabase/client';

const API_KEY = 'ak_2H77Kw8oO9dL4h95Az4bH3q50lE0S';
const BASE_URL = 'https://api.longcat.chat/openai/v1';

// 模拟商家信息
const merchantInfo = {
  merchant_name: '巷口牛油火锅',
  restaurant_type: '火锅',
  average_price: '120元/人',
  brand_positioning: '服务至上的川味火锅品牌，以优质服务和新鲜食材著称',

  // 基础菜品信息
  signature_dishes: '番茄鸳鸯锅、牛油麻辣锅、三鲜锅、菌汤锅、手打虾滑、捞派毛肚、麻辣牛肉、捞派滑牛肉',
  popular_dishes: '肥牛、羊肉卷、鸭血、响铃卷、冰皮麻薯、捞派豆花、现炸酥肉、捞面',
  drinks_and_desserts: '冰粉、酸梅汤、豆浆、柠檬茶、奶茶、冰皮麻薯、红糖糍粑',
  food_style: '川味火锅，麻辣鲜香，同时有番茄、三鲜、菌汤等不辣选项',

  // 更细的菜品分类
  soup_bases: [
    '牛油麻辣锅',
    '番茄锅',
    '三鲜锅',
    '菌汤锅',
    '清油麻辣锅',
    '酸菜锅',
    '猪肚鸡锅',
    '椰子鸡锅',
    '冬阴功锅',
    '番茄鸳鸯锅',
    '四宫格锅底'
  ],

  meat_dishes: [
    '捞派毛肚',
    '捞派滑牛肉',
    '麻辣牛肉',
    '嫩牛肉',
    '澳洲肥牛',
    '雪花肥牛',
    '肥牛卷',
    '羔羊肉卷',
    '精品羊肉',
    '黑毛猪肉片',
    '午餐肉',
    '鸭血',
    '黄喉',
    '鸭肠',
    '脑花',
    '鹌鹑蛋',
    '香菜丸子',
    '现切牛肉'
  ],

  seafood_dishes: [
    '手打虾滑',
    '蟹柳',
    '巴沙鱼片',
    '鲜虾',
    '鱿鱼须',
    '鱼豆腐',
    '鱼籽福袋',
    '墨鱼丸',
    '蟹籽丸',
    '鲜贝柱'
  ],

  handmade_dishes: [
    '手打虾滑',
    '手工牛肉丸',
    '手工鱼丸',
    '手工面条',
    '功夫捞面',
    '现炸酥肉',
    '鲜切黄牛肉',
    '手工蛋饺'
  ],

  vegetable_dishes: [
    '娃娃菜',
    '生菜',
    '菠菜',
    '油麦菜',
    '茼蒿',
    '贡菜',
    '土豆片',
    '藕片',
    '冬瓜片',
    '白萝卜',
    '海带苗',
    '豆芽',
    '玉米段',
    '山药片',
    '莴笋片',
    '竹笋',
    '金针菇',
    '香菇',
    '平菇',
    '杏鲍菇',
    '菌菇拼盘'
  ],

  soy_products: [
    '响铃卷',
    '冻豆腐',
    '油豆皮',
    '腐竹',
    '千张',
    '豆泡',
    '捞派豆花',
    '豆腐皮',
    '鱼豆腐'
  ],

  staple_foods: [
    '功夫捞面',
    '手工面条',
    '米饭',
    '蛋炒饭',
    '红糖糍粑',
    '南瓜饼',
    '小酥肉',
    '炸馒头片'
  ],

  snacks: [
    '现炸酥肉',
    '红糖糍粑',
    '南瓜饼',
    '炸馒头片',
    '小酥肉',
    '椒盐小吃拼盘',
    '等位小零食',
    '水果拼盘'
  ],

  desserts: [
    '冰粉',
    '红糖冰粉',
    '椰奶冰粉',
    '冰皮麻薯',
    '红糖糍粑',
    '芒果布丁',
    '银耳羹',
    '水果拼盘'
  ],

  drinks: [
    '酸梅汤',
    '豆浆',
    '柠檬茶',
    '乌梅汁',
    '大麦茶',
    '可乐',
    '雪碧',
    '奶茶',
    '椰汁',
    '气泡水'
  ],

  sauces: [
    '蒜泥香油碟',
    '芝麻酱碟',
    '沙茶酱',
    '牛肉粒',
    '香菜',
    '葱花',
    '蒜泥',
    '小米辣',
    '蚝油',
    '花生碎',
    '海鲜酱',
    '辣椒油',
    '腐乳汁',
    '醋',
    '酱油'
  ],

  dish_features: {
    '番茄锅': '酸甜浓郁，适合不吃辣的顾客，也常被用来煮牛肉和虾滑',
    '牛油麻辣锅': '麻辣鲜香，香气明显，适合喜欢重口味的顾客',
    '手打虾滑': '口感弹嫩，可以做成小球下锅，适合做"看不见虾却吃到虾"的反转',
    '捞派毛肚': '讲究涮烫时间，常见说法是七上八下，适合设计时间类谜题',
    '功夫捞面': '有甩面表演，适合设计"还没吃面却被面吓了一跳"的轻松反转',
    '鸭血': '下锅后颜色和口感变化明显，适合做误会类谜题',
    '响铃卷': '吸汤能力强，放入锅里后口感变化明显，适合做"它变重了"的谜题',
    '冰粉': '清凉解辣，常在吃辣后被推荐，适合做"越辣越想点它"的反转',
    '酸梅汤': '酸甜解腻，常在等位或用餐时饮用，适合和等位体验结合',
    '现炸酥肉': '外酥里嫩，香味明显，适合做"没进店却先闻到招牌"的谜题'
  },

  recommended_combinations: [
    {
      name: '经典川味组合',
      dishes: ['牛油麻辣锅', '捞派毛肚', '麻辣牛肉', '鸭血', '响铃卷', '冰粉'],
      scene: '朋友聚餐、喜欢麻辣的顾客'
    },
    {
      name: '不辣友好组合',
      dishes: ['番茄锅', '三鲜锅', '手打虾滑', '澳洲肥牛', '娃娃菜', '冰皮麻薯'],
      scene: '家庭聚餐、情侣约会、不太能吃辣的顾客'
    },
    {
      name: '表演互动组合',
      dishes: ['功夫捞面', '手打虾滑', '现炸酥肉', '酸梅汤'],
      scene: '等位互动、带孩子用餐、第一次来店的顾客'
    },
    {
      name: '解辣甜品组合',
      dishes: ['牛油麻辣锅', '麻辣牛肉', '冰粉', '酸梅汤', '红糖糍粑'],
      scene: '爱吃辣但需要解辣的顾客'
    }
  ],

  // 原有商家与活动信息
  target_customers: '年轻人、家庭聚餐、朋友聚会',
  dining_scenes: '朋友聚餐、家庭聚会、约会、商务宴请',
  available_coupon: '等位专享满200减30券、新客8.8折券',
  special_requirements: '无',

  ingredients: '新鲜虾仁、优质毛肚、澳洲肥牛、手工面条、豆皮、贡菜、黑毛猪肉片',
  selling_points: '24小时营业、免费美甲、甩面表演、生日惊喜服务、等位赠小吃、互动小游戏',
  environment_features: '现代简约装修、包间可选、等位区有零食饮料、可视厨房',
  service_features: '热情周到、生日歌、变脸表演、儿童游乐区、茶水自助',
  brand_story: '1994年创立于四川简阳，以极致服务闻名',
  promotion: '大学生优惠、生日当月礼遇、会员积分'
};

const longcatApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// 缓存版本号 - 更新此版本可使旧缓存失效
const CACHE_VERSION = '2.0';

// 发送聊天请求
export const sendChatCompletion = async (messages, options = {}) => {
  try {
    const response = await longcatApi.post('/chat/completions', {
      model: 'LongCat-2.0-Preview',
      messages,
      max_tokens: options.maxTokens || 4000,
      temperature: options.temperature || 0.7,
      ...options,
    });
    return response.data;
  } catch (error) {
    console.error('LongCat API Error:', error);
    throw error;
  }
};

// 将默认商家信息格式化为文本块，用于Prompt注入
const formatMerchantInfo = (info) => {
  return `商家名称：${info.merchant_name}
餐厅类型：${info.restaurant_type}
人均价格：${info.average_price}
商家定位：${info.brand_positioning}
招牌菜：${info.signature_dishes}
热门菜品：${info.popular_dishes}
饮品/甜品：${info.drinks_and_desserts}
菜品风格：${info.food_style}
锅底类型：${info.soup_bases.join('、')}
荤菜：${info.meat_dishes.join('、')}
海鲜：${info.seafood_dishes.join('、')}
手工菜：${info.handmade_dishes.join('、')}
素菜：${info.vegetable_dishes.join('、')}
豆制品：${info.soy_products.join('、')}
主食：${info.staple_foods.join('、')}
小吃：${info.snacks.join('、')}
甜品：${info.desserts.join('、')}
饮品：${info.drinks.join('、')}
调料：${info.sauces.join('、')}
菜品特色：${JSON.stringify(info.dish_features)}
推荐组合：${JSON.stringify(info.recommended_combinations)}
适合人群：${info.target_customers}
用餐场景：${info.dining_scenes}
可用优惠：${info.available_coupon}
特殊限制：${info.special_requirements}`;
};

// 生成单道海龟汤（支持商家文档上下文注入）
const generateSingleTurtleSoup = async (index, merchantContext = null) => {
  const infoBlock = merchantContext || formatMerchantInfo(merchantInfo);

  const systemPrompt = `你是一个"到店排队互动游戏策划师"，擅长根据餐饮商家的信息，创作简单有趣的海龟汤谜题。

【核心要求】
题目必须简单易懂，基于店铺或菜品的某个具体特色/特点，让用户通过3-8个是/否问题就能猜出答案。

【商家信息】
${infoBlock}

【生成原则】
1. **简单直接**：围绕一个具体物品、服务或菜品特点，不要复杂的故事线或多重反转
2. **单一场景**：题面描述一个具体场景或状态，不是连续剧式的发展
3. **贴近日常**：基于顾客真实会遇到的体验，不需要专业知识或复杂推理
4. **突出特色**：谜底必须是该店铺的特色服务、招牌菜品或独特体验
5. **轻松有趣**：氛围轻松，可以带一点小幽默或温馨感，绝不恐怖或负面

【题目类型参考】
- 服务类：热毛巾、美甲、甩面表演、等位零食、生日服务
- 菜品特点类：虾滑的Q弹、毛肚的七上八下、番茄锅的酸甜、冰粉的解辣
- 环境体验类：等位区的娱乐、儿童区、自助调料台
- 品牌特色类：24小时营业、极致服务、表演互动

【难度控制】
- 简单：3-5个问题可猜出（如"热毛巾"）
- 中等：5-8个问题可猜出（如"甩面表演的技巧"）
- 避免：需要复杂推理、多重线索、隐晦暗示的题目

【输出格式】
请严格按照以下 JSON 格式输出：

{
  "title": "谜题标题（10字以内）",
  "surface_story": "题面描述，控制在40字以内，用简单直白的语言描述一个场景或物品特点",
  "answer": "简短答案（如：热毛巾、甩面表演、手打虾滑）",
  "explanation": "一句话解释为什么是这个答案，点明店铺特色",
  "related_store_elements": ["关联的店铺特色"],
  "difficulty": "简单/中等",
  "key_facts": [
    "关键事实1",
    "关键事实2",
    "关键事实3"
  ],
  "winning_conditions": ["猜中核心答案即可"],
  "hint_level_1": "轻微提示，指向答案类别",
  "hint_level_2": "明显提示，接近答案"
}

【示例参考】
- 题面："我有温度但不会烫嘴，进店时服务员递给我，用餐中还会更换。我是什么？" → 答案：热毛巾
- 题面："我不是厨师，却能在空中飞舞；我不是杂技演员，却能让顾客鼓掌。我是谁？" → 答案：甩面师傅
- 题面："我本是海中游侠，现在变成小球；我被摔打成泥，却更加Q弹。我是什么？" → 答案：手打虾滑

这是第 ${index + 1} 道题，请确保与其他题目角度不同。`;

  try {
    const response = await sendChatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `请生成第 ${index + 1} 道简单有趣的海龟汤谜题，围绕店铺或菜品的某个具体特色。` },
    ], { maxTokens: 1500 });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);
      return parsedData;
    }
    throw new Error('Invalid JSON response');
  } catch (error) {
    console.error(`Failed to generate turtle soup ${index + 1}:`, error);
    return getDefaultTurtleSoup(index);
  }
};

// 批量生成10道海龟汤谜题
export const generateTurtleSoups = async (merchantContext = null) => {
  try {
    const infoBlock = merchantContext || formatMerchantInfo(merchantInfo);

    const systemPrompt = `你是"到店排队互动游戏策划师"，擅长根据餐饮商家的信息，创作简单有趣的海龟汤谜题。

【核心要求】
题目必须简单易懂，基于店铺或菜品的某个具体特色/特点，让用户通过3-8个是/否问题就能猜出答案。

【商家信息】
${infoBlock}

【生成原则】
1. **简单直接**：围绕一个具体物品、服务或菜品特点，不要复杂的故事线或多重反转
2. **单一场景**：题面描述一个具体场景或状态，不是连续剧式的发展
3. **贴近日常**：基于顾客真实会遇到的体验，不需要专业知识或复杂推理
4. **突出特色**：谜底必须是该店铺的特色服务、招牌菜品或独特体验
5. **轻松有趣**：氛围轻松，可以带一点小幽默或温馨感，绝不恐怖或负面

【题目类型参考】
- 服务类：热毛巾、美甲、甩面表演、等位零食、生日服务
- 菜品特点类：虾滑的Q弹、毛肚的七上八下、番茄锅的酸甜、冰粉的解辣
- 环境体验类：等位区的娱乐、儿童区、自助调料台
- 品牌特色类：24小时营业、极致服务、表演互动

【难度控制】
- 简单：3-5个问题可猜出（如"热毛巾"）
- 中等：5-8个问题可猜出（如"甩面表演的技巧"）
- 避免：需要复杂推理、多重线索、隐晦暗示的题目

【输出格式】
请严格按照以下 JSON 格式输出：

{
  "title": "谜题标题（10字以内）",
  "surface_story": "题面描述，控制在40字以内，用简单直白的语言描述一个场景或物品特点",
  "answer": "简短答案（如：热毛巾、甩面表演、手打虾滑）",
  "explanation": "一句话解释为什么是这个答案，点明店铺特色",
  "related_store_elements": ["关联的店铺特色"],
  "difficulty": "简单/中等",
  "key_facts": [
    "关键事实1",
    "关键事实2",
    "关键事实3"
  ],
  "winning_conditions": ["猜中核心答案即可"],
  "hint_level_1": "轻微提示，指向答案类别",
  "hint_level_2": "明显提示，接近答案"
}

【示例参考】
- 题面："我有温度但不会烫嘴，进店时服务员递给我，用餐中还会更换。我是什么？" → 答案：热毛巾
- 题面："我不是厨师，却能在空中飞舞；我不是杂技演员，却能让顾客鼓掌。我是谁？" → 答案：甩面师傅
- 题面："我本是海中游侠，现在变成小球；我被摔打成泥，却更加Q弹。我是什么？" → 答案：手打虾滑

请基于以上商家信息，生成10道完全不同、分别覆盖10个不同类别的海龟汤谜题。`;

    const response = await sendChatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: '请基于以上商家信息，生成10道完全不同、分别覆盖10个不同类别的海龟汤谜题。' },
    ], { maxTokens: 5000, temperature: 0.8 });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    let soups = [];
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (Array.isArray(parsed)) {
        soups = parsed.filter(s => s && typeof s === 'object');
      }
    }

    if (soups.length === 0) {
      throw new Error('Invalid JSON array response');
    }

    // 去重：若AI返回的答案有重复，用默认不重复的谜题补齐
    const seenAnswers = new Set();
    const uniqueSoups = [];
    for (const s of soups) {
      if (s.answer && !seenAnswers.has(s.answer)) {
        seenAnswers.add(s.answer);
        uniqueSoups.push(s);
      }
    }
    const defaultSoupsList = Array.from({ length: 10 }, (_, i) => getDefaultTurtleSoup(i));
    for (const ds of defaultSoupsList) {
      if (uniqueSoups.length >= 10) break;
      if (!seenAnswers.has(ds.answer)) {
        seenAnswers.add(ds.answer);
        uniqueSoups.push(ds);
      }
    }
    soups = uniqueSoups.slice(0, 10);

    const cacheData = {
      soups,
      generatedAt: Date.now(),
      version: CACHE_VERSION,
    };
    localStorage.setItem('turtleSoupsCache', JSON.stringify(cacheData));
    return soups;
  } catch (error) {
    console.error('Failed to generate turtle soups:', error);
    const defaultSoups = Array.from({ length: 10 }, (_, i) => getDefaultTurtleSoup(i));
    const cacheData = {
      soups: defaultSoups,
      generatedAt: Date.now(),
      version: CACHE_VERSION,
    };
    localStorage.setItem('turtleSoupsCache', JSON.stringify(cacheData));
    return defaultSoups;
  }
};

// 从缓存中获取或生成海龟汤题库
export const getOrCreateTurtleSoups = async () => {
  const cached = localStorage.getItem('turtleSoupsCache');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      // 检查缓存是否有效（7天内且版本一致）
      const isValid = parsed.generatedAt && 
        (Date.now() - parsed.generatedAt) < 7 * 24 * 60 * 60 * 1000 &&
        parsed.version === '2.0';
      if (isValid && parsed.soups && parsed.soups.length === 10) {
        return parsed.soups;
      }
    } catch (e) {
      localStorage.removeItem('turtleSoupsCache');
    }
  }
  return generateTurtleSoups();
};

// 随机获取一道海龟汤
export const getRandomTurtleSoup = async () => {
  const soups = await getOrCreateTurtleSoups();
  const randomIndex = Math.floor(Math.random() * soups.length);
  return soups[randomIndex];
};

// 兼容性：保留原有的单道获取接口
export const getOrCreateTurtleSoup = async (merchantId = null) => {
  if (merchantId) {
    try {
      const { data } = await supabase
        .from('generated_content')
        .select('content_json')
        .eq('merchant_id', merchantId)
        .eq('content_type', 'turtle_soup')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data?.content_json) {
        const soups = data.content_json;
        if (Array.isArray(soups) && soups.length > 0) {
          const randomIndex = Math.floor(Math.random() * soups.length);
          return soups[randomIndex];
        }
      }
    } catch (e) {
      console.error('Failed to load turtle from DB:', e);
    }
  }

  const cached = localStorage.getItem('turtleSoupsCache');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      const isValid = parsed.generatedAt &&
        (Date.now() - parsed.generatedAt) < 7 * 24 * 60 * 60 * 1000 &&
        parsed.version === '2.0';
      if (isValid && parsed.soups && parsed.soups.length === 10) {
        const randomIndex = Math.floor(Math.random() * parsed.soups.length);
        return parsed.soups[randomIndex];
      }
    } catch (e) {
      localStorage.removeItem('turtleSoupsCache');
    }
  }
  const soups = await generateTurtleSoups();
  const randomIndex = Math.floor(Math.random() * soups.length);
  return soups[randomIndex];
};

// 生成海龟汤谜题（兼容旧接口）
export const generateTurtleSoup = async () => {
  return generateSingleTurtleSoup(0);
};

// 默认海龟汤数据（简化版）- 更符合要求的示例
const getDefaultTurtleSoup = (index = 0) => {
  const defaults = [
    {
      title: "温暖的服务",
      surface_story: "我有温度但不会烫嘴，进店时递给我，用餐中还会更换。我是什么？",
      answer: "热毛巾",
      explanation: "海底捞的热毛巾服务是品牌标志，从进店到用餐全程提供贴心服务。",
      related_store_elements: ["热毛巾服务", "贴心服务"],
      difficulty: "简单",
      key_facts: ["不是食物", "有温度", "进店时提供", "用餐中会更换"],
      winning_conditions: ["猜到热毛巾"],
      hint_level_1: "用来擦手的",
      hint_level_2: "总是温温的"
    },
    {
      title: "空中飞舞",
      surface_story: "我在空中飞舞却不会落地，我不是杂技演员，却能让顾客鼓掌。我是什么？",
      answer: "甩面表演",
      explanation: "甩面表演是海底捞的特色，师傅现场展示拉面技艺，既好看又好吃。",
      related_store_elements: ["甩面表演", "现场制作"],
      difficulty: "简单",
      key_facts: ["是一种表演", "使用面条", "在空中挥舞", "现场制作"],
      winning_conditions: ["猜到甩面或面条表演"],
      hint_level_1: "这是一种食物的制作过程",
      hint_level_2: "最后会变成你的主食"
    },
    {
      title: "等位惊喜",
      surface_story: "你在排队等位，没点单却吃到东西；这些东西免费，却让你心情变好。是什么？",
      answer: "等位小食",
      explanation: "海底捞等位时提供免费小食和饮料，让等待时光不那么无聊。",
      related_store_elements: ["等位服务", "免费小食"],
      difficulty: "简单",
      key_facts: ["等位时提供", "免费", "不是正餐", "解馋小食"],
      winning_conditions: ["猜到等位零食或小食"],
      hint_level_1: "在等位区能吃到",
      hint_level_2: "有妙脆角、锅巴、柠檬水这些"
    },
    {
      title: "虾的变身",
      surface_story: "我本是海中游侠，现在变成小球；我被摔打成泥，却更加Q弹。我是什么？",
      answer: "手打虾滑",
      explanation: "手打虾滑是招牌菜，新鲜虾仁手工捶打制成，口感Q弹。",
      related_store_elements: ["手打虾滑", "招牌菜"],
      difficulty: "简单",
      key_facts: ["原料是虾", "手工捶打", "圆球状", "口感Q弹"],
      winning_conditions: ["猜到虾滑"],
      hint_level_1: "这是一道海鲜类招牌菜",
      hint_level_2: "需要用手反复摔打制作"
    },
    {
      title: "七上八下",
      surface_story: "我在沸水中跳舞，时间要刚刚好；多一秒太老，少一秒太生。我是什么？",
      answer: "捞派毛肚",
      explanation: "毛肚讲究'七上八下'涮烫约15秒，时间刚好才脆嫩爽口。",
      related_store_elements: ["捞派毛肚", "七上八下"],
      difficulty: "中等",
      key_facts: ["是毛肚", "涮烫时间短", "讲究技巧", "口感脆嫩"],
      winning_conditions: ["猜到毛肚"],
      hint_level_1: "这是一道荤菜",
      hint_level_2: "涮的时候要快速提起放下"
    },
    {
      title: "红色诱惑",
      surface_story: "我不是水果却有鲜艳红色，我不加色素颜色却天然，我酸甜开胃。我是什么？",
      answer: "番茄汤底",
      explanation: "番茄锅底选用新鲜番茄熬制，自然鲜红，酸甜适口。",
      related_store_elements: ["番茄锅底", "招牌锅底"],
      difficulty: "简单",
      key_facts: ["是汤底", "红色", "番茄制作", "酸甜口味"],
      winning_conditions: ["猜到番茄锅或番茄汤底"],
      hint_level_1: "这是一种锅底",
      hint_level_2: "用红色蔬菜熬制的"
    },
    {
      title: "生日惊喜",
      surface_story: "今天生日没告诉任何人，却收到意外祝福；一群人围着我唱歌，还有免费礼物。发生了什么？",
      answer: "生日服务",
      explanation: "海底捞生日服务贴心周到，服务员会为顾客庆祝、送长寿面。",
      related_store_elements: ["生日服务", "贴心关怀"],
      difficulty: "简单",
      key_facts: ["生日庆祝", "唱歌", "免费礼物", "服务员组织"],
      winning_conditions: ["猜到生日服务或庆祝"],
      hint_level_1: "这是为特殊日子准备的",
      hint_level_2: "服务员会为你唱生日歌"
    },
    {
      title: "指尖美容",
      surface_story: "来这儿为了吃饭，却顺便做了美容；没预约却享受了服务，手指变漂亮。是什么？",
      answer: "免费美甲",
      explanation: "等位期间提供免费美甲服务，让等待时间更有价值。",
      related_store_elements: ["免费美甲", "等位福利"],
      difficulty: "中等",
      key_facts: ["等位时提供", "免费", "美甲服务", "手部护理"],
      winning_conditions: ["猜到美甲"],
      hint_level_1: "这是等位时的免费服务",
      hint_level_2: "跟你的手指有关"
    },
    {
      title: "冰火两重天",
      surface_story: "一边是滚烫火锅，一边是冰凉甜蜜；吃完辣的更需要我，让你瞬间清凉。我是什么？",
      answer: "红糖冰粉",
      explanation: "红糖冰粉是经典甜品，麻辣火锅后来一碗，解辣又甜蜜。",
      related_store_elements: ["红糖冰粉", "解辣甜品"],
      difficulty: "简单",
      key_facts: ["是甜品", "冰凉", "解辣", "餐后食用"],
      winning_conditions: ["猜到冰粉"],
      hint_level_1: "这是火锅后的甜点",
      hint_level_2: "透明冰凉，加了红糖水"
    },
    {
      title: "变脸大师",
      surface_story: "我在店里穿梭，脸却不停变换；我不是顾客，却吸引所有人目光。我是谁？",
      answer: "变脸表演演员",
      explanation: "川剧变脸表演是特色娱乐，演员在餐厅穿梭表演，增添文化氛围。",
      related_store_elements: ["变脸表演", "川剧文化"],
      difficulty: "中等",
      key_facts: ["是表演", "快速换脸", "川剧艺术", "餐厅娱乐"],
      winning_conditions: ["猜到变脸表演"],
      hint_level_1: "这是一种中国传统表演",
      hint_level_2: "表演者会快速改变脸部模样"
    }
  ];
  
  return defaults[index % defaults.length];
};

// 海龟汤：判断用户输入
export const judgeTurtleQuestion = async (userMessage, turtleData, history) => {
  if (!turtleData) {
    turtleData = getDefaultTurtleSoup(0);
  }

  const conversationHistory = history.map(h => `用户：${h.question}\n主持人：${h.answer}`).join('\n');

  const systemPrompt = `你是一个"海龟汤游戏主持人"，正在和顾客玩一个餐厅等位互动谜题。

你必须严格依据以下谜题资料进行回答，不能临时修改汤底，不能新增关键事实。

【题面】
${turtleData.surface_story}

【完整汤底答案，仅供你内部判断，不要直接透露】
${turtleData.answer}

【详细解析，仅供你内部判断】
${turtleData.explanation}

【关键事实】
${turtleData.key_facts?.join('\n') || '暂无'}

【猜中条件】
${turtleData.winning_conditions?.join('\n') || '猜到答案'}

【提示】
一级提示：${turtleData.hint_level_1 || '想想进店时的服务'}
二级提示：${turtleData.hint_level_2 || '用来擦手的东西'}
三级提示：${turtleData.hint_level_3 || '查看答案'}

【历史对话】
${conversationHistory}

【用户当前输入】
${userMessage}

【你的任务】
你需要判断用户当前输入属于以下哪一种：

1. 用户在提问事实判断  
   - 如果问题与汤底事实一致，回答："是。"
   - 如果问题与汤底事实相反，回答："否。"
   - 如果问题和汤底核心关系不大，回答："不重要。"
   - 如果汤底信息不足以判断，回答："无法判断。"

2. 用户在尝试还原汤底  
   - 如果用户已经说中了主要逻辑，即使表述不完全一致，也要判定为猜中。
   - 猜中后，输出：
     "恭喜你，猜对了！答案是：${turtleData.answer}"
   - 然后补充一句轻松的店铺相关收尾，例如：
     "看来你已经提前解锁这家店的隐藏玩法了。"

3. 用户要求提示  
   - 根据用户当前进度给出一个合适提示。
   - 不要直接透露答案。
   - 按照一级、二级、三级提示逐步给。

4. 用户要求直接公布答案  
   - 如果用户明确说"不玩了""公布答案""告诉我汤底"，可以公布答案。
   - 输出：
     "答案是：${turtleData.answer}"
   - 如果用户只是试探性地问"是不是你知道答案"，不要公布。

5. 用户闲聊、无关输入、攻击性输入  
   - 简短拉回游戏。
   - 例如："这个和汤底关系不大，可以继续问我一个是/否问题。"

【重要规则】
1. 除非用户猜中或主动放弃，否则绝不能直接透露完整汤底。
2. 回答要短，优先使用"是 / 否 / 不重要 / 无法判断"。
3. 不要解释太多，避免泄露答案。
4. 不要编造汤底之外的新事实。
5. 用户的问题如果是复合问题，例如"他是不是没进店但已经吃了东西？"：
   - 如果整体大致正确，可以回答"是。"
   - 如果一半正确一半错误，回答："部分是，但不完全准确。"
6. 用户如果猜到了核心逻辑，但细节略有偏差，也可以判定猜中。
7. 判断是否猜中时，以"是否还原主要因果关系"为准，而不是逐字匹配。
8. 如果用户的问题不是是/否问题，也要尽量判断其意图。
9. 不要输出你的推理过程。
10. 输出必须自然、简短、适合餐厅等位互动场景。

【输出格式】
直接输出给用户看的回复，不要输出分析过程。`;

  try {
    const response = await sendChatCompletion([
      { role: 'system', content: systemPrompt },
    ], { maxTokens: 500, temperature: 0.3 });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Turtle soup judgment error:', error);
    // 使用简单的关键词匹配作为 fallback
    return simpleTurtleJudgment(userMessage, turtleData);
  }
};

// 简单关键词判断（fallback）
const simpleTurtleJudgment = (userMessage, turtleData) => {
  const lowerMsg = userMessage.toLowerCase();
  const answer = turtleData.answer.toLowerCase();
  
  // 检查是否猜中
  if (lowerMsg.includes(answer) || 
      (answer.includes('毛巾') && lowerMsg.includes('毛巾')) ||
      (answer.includes('热毛巾') && lowerMsg.includes('热') && lowerMsg.includes('毛巾'))) {
    return `恭喜你，猜对了！答案是：${turtleData.answer}。看来你已经提前解锁这家店的隐藏玩法了！`;
  }

  // 检查是否要求提示
  if (lowerMsg.includes('提示') || lowerMsg.includes('hint') || lowerMsg.includes(' clue')) {
    return `💡 ${turtleData.hint_level_1 || '想想进店时服务员给你的第一件东西'}`;
  }

  // 检查是否要求公布答案
  if (lowerMsg.includes('不玩了') || lowerMsg.includes('公布答案') || lowerMsg.includes('告诉我') || lowerMsg.includes('放弃')) {
    return `答案是：${turtleData.answer}。${turtleData.explanation}`;
  }

  // 简单关键词匹配
  const yesKeywords = ['是', '对', '正确', 'yes', 'right'];
  const noKeywords = ['否', '不对', '错', '错误', 'no', 'wrong'];
  
  // 检查是否包含食物相关词
  const foodKeywords = ['吃', '食物', '菜', '肉', '火锅', '菜', '食材'];
  const serviceKeywords = ['服务', '温度', '热', '温', '服务员'];
  const itemKeywords = ['毛巾', '纸巾', '擦', '手', '脸', '嘴'];

  let isFood = foodKeywords.some(k => lowerMsg.includes(k));
  let isService = serviceKeywords.some(k => lowerMsg.includes(k));
  let isItem = itemKeywords.some(k => lowerMsg.includes(k));

  if (isFood && !isService && !isItem) {
    return '【否】（和吃无关哦）';
  } else if (isService || isItem) {
    return '【是】（方向对了！）';
  }

  return '【无法判断】（换个角度问问看？）';
};

// 生成完整的美食人格测试（维度评分法）
export const generateFullPersonalityTest = async (merchantContext = null) => {
  const infoBlock = merchantContext || formatMerchantInfo(merchantInfo);

  const systemPrompt = `你是"等位奇遇局"的 AI 到店等待互动助手，擅长根据商家信息生成趣味美食人格测试。

我会提供一个商家的信息，你需要生成一套 5 题 4 选项的美食人格测试。

重要要求：
这不是简单的"每个选项对应一个人格"的测试。
你需要让用户通过 5 道题的选择，综合形成一个美食人格。

请使用"维度评分法"设计测试。

一、测试维度

每个选项需要对以下 5 个维度进行评分：

1. adventurous：尝鲜程度
   - 分数越高，代表越愿意尝试新品、特色菜、隐藏吃法。

2. intensity：口味浓烈程度
   - 分数越高，代表越喜欢重口、香辣、浓郁、刺激的味道。

3. social：社交分享程度
   - 分数越高，代表越喜欢多人分享、热闹聚餐、适合拍照或一起吃的菜。

4. value：性价比敏感度
   - 分数越高，代表越重视套餐、分量、优惠、划算感。

5. comfort：治愈放松程度
   - 分数越高，代表越倾向温暖、舒服、熟悉、轻松、不踩雷的选择。

二、题目要求

1. 生成 5 道题。
2. 每道题 4 个选项。
3. 题目需要适合用户排队等位时完成。
4. 问题要轻松、有趣、有画面感，不要像传统调查问卷。
5. 每个选项都必须包含 scores 字段。
6. scores 中必须包含 adventurous、intensity、social、value、comfort 五个维度。
7. 每个维度分数为 0、1、2、3。
8. 每个选项的总分建议控制在 4 到 7 分之间，避免所有选项差异过小。
9. 选项文案要结合商家类型、菜品风格和用餐场景。

三、人格结果要求

请生成 10 个美食人格结果。

每个人格结果不是由单个选项决定，而是由用户 5 道题累计后的维度分数组合决定。

每个人格结果需要包含：

1. personality_id
2. personality_name
3. summary
4. dimension_pattern
5. match_rule
6. description
7. ordering_style
8. recommended_combo
9. recommendation_reason
10. coupon_hook

四、人格匹配规则

请为 10 个人格分别设计 match_rule。

match_rule 需要基于 5 个维度的高低组合判断。

维度高低定义：
- high：总分 >= 10
- medium：总分 6 到 9
- low：总分 <= 5

示例：
{
  "personality_name": "热辣冒险家",
  "dimension_pattern": {
    "adventurous": "high",
    "intensity": "high",
    "social": "any",
    "value": "any",
    "comfort": "low_or_medium"
  },
  "match_rule": "当 adventurous >= 10 且 intensity >= 10 时，优先匹配该人格"
}

五、推荐菜品规则

1. 推荐菜品必须优先使用商家提供的招牌菜、热门菜、甜品饮品。
2. 每个人格推荐 2 到 4 个菜品。
3. 推荐组合要符合人格特点。
4. 不要虚构过多菜单中没有的菜品。
5. 如果商家菜品信息不足，可以基于餐厅类型合理补充，但要保持克制。

六、输出格式

请只输出 JSON，不要输出解释文字。

JSON 格式如下：

{
  "test_title": "测试标题",
  "test_subtitle": "测试副标题",
  "estimated_time": "预计完成时间",
  "dimensions": {
    "adventurous": "尝鲜程度",
    "intensity": "口味浓烈程度",
    "social": "社交分享程度",
    "value": "性价比敏感度",
    "comfort": "治愈放松程度"
  },
  "questions": [
    {
      "id": 1,
      "question": "问题文案",
      "options": [
        {
          "key": "A",
          "text": "选项文案",
          "scores": {
            "adventurous": 0,
            "intensity": 0,
            "social": 0,
            "value": 0,
            "comfort": 0
          }
        }
      ]
    }
  ],
  "personality_results": [
    {
      "personality_id": "P01",
      "personality_name": "人格名称",
      "summary": "一句话总结",
      "dimension_pattern": {
        "adventurous": "high / medium / low / any",
        "intensity": "high / medium / low / any",
        "social": "high / medium / low / any",
        "value": "high / medium / low / any",
        "comfort": "high / medium / low / any"
      },
      "match_rule": "具体匹配规则",
      "description": "人格描述",
      "ordering_style": "适合点单风格",
      "recommended_combo": [
        "菜品1",
        "菜品2",
        "菜品3"
      ],
      "recommendation_reason": "推荐理由",
      "coupon_hook": "轻量优惠转化话术"
    }
  ],
  "scoring_rule": {
    "step_1": "用户每选择一个选项，就把该选项 scores 加入总分。",
    "step_2": "完成 5 题后，得到 adventurous、intensity、social、value、comfort 五个维度总分。",
    "step_3": "根据 personality_results 中的 match_rule 匹配最符合的人格。",
    "step_4": "如果多个结果同时匹配，优先选择命中 high 维度最多的人格。",
    "step_5": "如果仍然并列，优先选择与第 5 题选项分数特征最接近的人格，因为第 5 题代表用户当前食欲。"
  }
}`;

  const userPrompt = `以下是商家信息：

${infoBlock}

请根据以上商家信息生成完整的美食人格测试JSON。`;

  try {
    const response = await sendChatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ], { maxTokens: 4000 });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);
      const cacheData = {
        data: parsedData,
        generatedAt: Date.now(),
        version: '2.0',
      };
      localStorage.setItem('personalityTestCache', JSON.stringify(cacheData));
      return parsedData;
    }
    throw new Error('Invalid JSON response');
  } catch (error) {
    console.error('Failed to generate personality test:', error);
    return getDefaultPersonalityTest();
  }
};

// 从缓存获取或生成测试 - 优化缓存机制
export const getOrCreatePersonalityTest = async (merchantId = null) => {
  if (merchantId) {
    try {
      const { data } = await supabase
        .from('generated_content')
        .select('content_json')
        .eq('merchant_id', merchantId)
        .eq('content_type', 'personality_test')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data?.content_json) {
        return data.content_json;
      }
    } catch (e) {
      console.error('Failed to load personality test from DB:', e);
    }
  }

  const cached = localStorage.getItem('personalityTestCache');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      // 检查缓存是否有效（7天内且版本一致）
      const isValid = parsed.generatedAt && 
        (Date.now() - parsed.generatedAt) < 7 * 24 * 60 * 60 * 1000 &&
        parsed.version === '2.0';
      if (isValid && parsed.data) {
        return parsed.data;
      }
    } catch (e) {
      localStorage.removeItem('personalityTestCache');
    }
  }
  return generateFullPersonalityTest();
};

// 计算维度分数
export const calculateDimensionScores = (answers, testData) => {
  if (!testData || !answers || Object.keys(answers).length === 0) {
    return {
      adventurous: 0,
      intensity: 0,
      social: 0,
      value: 0,
      comfort: 0,
    };
  }

  const scores = {
    adventurous: 0,
    intensity: 0,
    social: 0,
    value: 0,
    comfort: 0,
  };

  const questions = testData.questions;

  Object.entries(answers).forEach(([questionIndex, selectedKey]) => {
    const question = questions[parseInt(questionIndex)];
    if (question) {
      const option = question.options.find(opt => opt.key === selectedKey);
      if (option && option.scores) {
        scores.adventurous += option.scores.adventurous || 0;
        scores.intensity += option.scores.intensity || 0;
        scores.social += option.scores.social || 0;
        scores.value += option.scores.value || 0;
        scores.comfort += option.scores.comfort || 0;
      }
    }
  });

  return scores;
};

// 判断维度高低
const getDimensionLevel = (score) => {
  if (score >= 10) return 'high';
  if (score >= 6) return 'medium';
  return 'low';
};

// 检查维度是否匹配 - 修复版，支持更多pattern
const isDimensionMatch = (userLevel, pattern) => {
  if (pattern === 'any') return true;
  if (pattern === 'high') return userLevel === 'high';
  if (pattern === 'medium') return userLevel === 'medium';
  if (pattern === 'low') return userLevel === 'low';
  if (pattern === 'high_or_medium') return userLevel === 'high' || userLevel === 'medium';
  if (pattern === 'medium_or_low' || pattern === 'low_or_medium') return userLevel === 'medium' || userLevel === 'low';
  if (pattern === 'high_or_low') return userLevel === 'high' || userLevel === 'low';
  if (pattern === 'medium_or_high') return userLevel === 'medium' || userLevel === 'high';
  return false;
};

// 计算人格匹配分数（用于排序）
const calculateMatchScore = (dimensionLevels, pattern) => {
  let score = 0;
  const dimensions = ['adventurous', 'intensity', 'social', 'value', 'comfort'];
  
  for (const dim of dimensions) {
    const userLevel = dimensionLevels[dim];
    const patternValue = pattern[dim] || 'any';
    
    if (patternValue === 'any') {
      score += 1; // any 匹配给基础分
    } else if (userLevel === patternValue) {
      score += 3; // 完全匹配给高分
    } else if (
      (patternValue === 'high_or_medium' && (userLevel === 'high' || userLevel === 'medium')) ||
      (patternValue === 'medium_or_low' && (userLevel === 'medium' || userLevel === 'low')) ||
      (patternValue === 'low_or_medium' && (userLevel === 'low' || userLevel === 'medium')) ||
      (patternValue === 'high_or_low' && (userLevel === 'high' || userLevel === 'low'))
    ) {
      score += 2; // 部分匹配给中分
    }
  }
  
  return score;
};

// 计算人格结果（维度评分法）- 修复版
export const calculatePersonalityResult = (answers, testData) => {
  if (!testData || !answers || Object.keys(answers).length < 5) {
    return null;
  }

  // 计算维度分数
  const dimensionScores = calculateDimensionScores(answers, testData);
  
  // 获取各维度等级
  const dimensionLevels = {
    adventurous: getDimensionLevel(dimensionScores.adventurous),
    intensity: getDimensionLevel(dimensionScores.intensity),
    social: getDimensionLevel(dimensionScores.social),
    value: getDimensionLevel(dimensionScores.value),
    comfort: getDimensionLevel(dimensionScores.comfort),
  };

  console.log('维度分数:', dimensionScores);
  console.log('维度等级:', dimensionLevels);

  // 计算每个人格的匹配分数
  const scoredResults = testData.personality_results.map(result => {
    const pattern = result.dimension_pattern;
    let isMatch = true;
    let highCount = 0;
    let matchedDimensions = 0;

    // 检查各维度是否匹配
    for (const [dim, userLevel] of Object.entries(dimensionLevels)) {
      const patternValue = pattern[dim] || 'any';
      if (!isDimensionMatch(userLevel, patternValue)) {
        isMatch = false;
        break;
      }
      if (userLevel === 'high') {
        highCount++;
      }
      matchedDimensions++;
    }

    const matchScore = calculateMatchScore(dimensionLevels, pattern);

    return { 
      ...result, 
      isMatch, 
      highCount, 
      matchedDimensions,
      matchScore
    };
  });

  // 过滤出匹配的结果
  const matchedResults = scoredResults.filter(r => r.isMatch);

  console.log('匹配结果:', matchedResults);

  // 如果有匹配的结果，按匹配分数和high维度数排序
  if (matchedResults.length > 0) {
    matchedResults.sort((a, b) => {
      // 首先按匹配分数排序
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }
      // 然后按high维度数排序
      if (b.highCount !== a.highCount) {
        return b.highCount - a.highCount;
      }
      return 0;
    });
    
    // 如果最高分相同，比较与第5题选项分数特征的接近程度
    const topScore = matchedResults[0].matchScore;
    const topResults = matchedResults.filter(r => r.matchScore === topScore && r.highCount === matchedResults[0].highCount);
    
    if (topResults.length > 1) {
      // 获取第5题的选项分数
      const lastQuestion = testData.questions[4];
      if (lastQuestion && answers[4]) {
        const lastOption = lastQuestion.options.find(opt => opt.key === answers[4]);
        if (lastOption && lastOption.scores) {
          const lastScores = lastOption.scores;
          
          // 计算每个结果与第5题分数特征的匹配度
          let bestMatch = topResults[0];
          let bestAffinity = -1;
          
          for (const result of topResults) {
            const pattern = result.dimension_pattern;
            let affinity = 0;
            
            // 统计维度匹配程度
            for (const dim of ['adventurous', 'intensity', 'social', 'value', 'comfort']) {
              const score = lastScores[dim];
              const patternValue = pattern[dim];
              
              if (patternValue === 'any') {
                affinity += 1;
              } else if (score >= 2 && (patternValue === 'high' || patternValue === 'high_or_medium')) {
                affinity += 2;
              } else if (score <= 1 && (patternValue === 'low' || patternValue === 'low_or_medium' || patternValue === 'medium_or_low')) {
                affinity += 2;
              } else if (score === 1 && patternValue === 'medium') {
                affinity += 1;
              }
            }
            
            if (affinity > bestAffinity) {
              bestAffinity = affinity;
              bestMatch = result;
            }
          }
          
          console.log('最终匹配:', bestMatch.personality_name);
          return bestMatch;
        }
      }
      
      return topResults[0];
    }
    
    return matchedResults[0];
  }

  // 如果没有匹配的结果，选择匹配度最高的（不完全匹配但最接近的）
  scoredResults.sort((a, b) => b.matchScore - a.matchScore);
  console.log('无完全匹配，选择最接近的:', scoredResults[0].personality_name);
  return scoredResults[0];
};

// 默认测试数据（维度评分法）- 优化匹配规则
const getDefaultPersonalityTest = () => ({
  test_title: "海底捞美食人格测试",
  test_subtitle: "5道题，解锁你的火锅人格密码",
  estimated_time: "2分钟",
  dimensions: {
    adventurous: "尝鲜程度",
    intensity: "口味浓烈程度",
    social: "社交分享程度",
    value: "性价比敏感度",
    comfort: "治愈放松程度"
  },
  questions: [
    {
      id: 1,
      question: "走进海底捞，你最先注意到什么？",
      options: [
        {
          key: "A",
          text: "🆕 菜单上的'新品上市'标签",
          scores: { adventurous: 3, intensity: 1, social: 0, value: 0, comfort: 1 }
        },
        {
          key: "B",
          text: "🌶️ 空气中飘散的麻辣香气",
          scores: { adventurous: 1, intensity: 3, social: 1, value: 0, comfort: 0 }
        },
        {
          key: "C",
          text: "👨‍👩‍👧‍👦 热闹的就餐氛围和等位的人群",
          scores: { adventurous: 0, intensity: 0, social: 3, value: 1, comfort: 1 }
        },
        {
          key: "D",
          text: "💰 墙上的套餐优惠海报",
          scores: { adventurous: 0, intensity: 0, social: 1, value: 3, comfort: 1 }
        }
      ]
    },
    {
      id: 2,
      question: "选锅底的时候，你会？",
      options: [
        {
          key: "A",
          text: "🔥 直接上最辣的牛油锅，挑战极限",
          scores: { adventurous: 2, intensity: 3, social: 0, value: 0, comfort: 0 }
        },
        {
          key: "B",
          text: "🍅 经典番茄锅，稳妥不踩雷",
          scores: { adventurous: 0, intensity: 0, social: 0, value: 0, comfort: 3 }
        },
        {
          key: "C",
          text: "🎨 四宫格，清水+番茄+麻辣+菌汤，各来一格",
          scores: { adventurous: 2, intensity: 1, social: 2, value: 2, comfort: 1 }
        },
        {
          key: "D",
          text: "📱 先拍照发朋友圈问问大家推荐什么",
          scores: { adventurous: 1, intensity: 0, social: 3, value: 0, comfort: 1 }
        }
      ]
    },
    {
      id: 3,
      question: "看到'隐藏吃法'的推荐，你会？",
      options: [
        {
          key: "A",
          text: "🤩 立刻想尝试！DIY虾滑响铃卷听起来很酷",
          scores: { adventurous: 3, intensity: 1, social: 1, value: 1, comfort: 0 }
        },
        {
          key: "B",
          text: "🤔 有点意思，但怕翻车，还是算了",
          scores: { adventurous: 1, intensity: 0, social: 0, value: 0, comfort: 2 }
        },
        {
          key: "C",
          text: "📸 试试，主要是为了拍照好看",
          scores: { adventurous: 2, intensity: 0, social: 3, value: 0, comfort: 0 }
        },
        {
          key: "D",
          text: "🙅‍♂️ 不折腾，按菜单点最省事",
          scores: { adventurous: 0, intensity: 0, social: 0, value: 2, comfort: 2 }
        }
      ]
    },
    {
      id: 4,
      question: "点菜时，你更在意什么？",
      options: [
        {
          key: "A",
          text: "🥩 肉类的品质和种类要多",
          scores: { adventurous: 1, intensity: 2, social: 1, value: 0, comfort: 1 }
        },
        {
          key: "B",
          text: "💵 套餐优惠和半份菜的选择",
          scores: { adventurous: 0, intensity: 0, social: 0, value: 3, comfort: 1 }
        },
        {
          key: "C",
          text: "🍰 甜品和饮料不能少，火锅配冰粉是绝配",
          scores: { adventurous: 0, intensity: 1, social: 2, value: 0, comfort: 2 }
        },
        {
          key: "D",
          text: "⭐ 招牌必点，跟着推荐走准没错",
          scores: { adventurous: 0, intensity: 1, social: 1, value: 1, comfort: 3 }
        }
      ]
    },
    {
      id: 5,
      question: "如果现在只能再点一道菜，你会选？",
      options: [
        {
          key: "A",
          text: "🦐 没吃过的海鲜新品，尝鲜",
          scores: { adventurous: 3, intensity: 0, social: 0, value: 0, comfort: 0 }
        },
        {
          key: "B",
          text: "🥘 大份肥牛卷，吃到爽",
          scores: { adventurous: 0, intensity: 1, social: 0, value: 2, comfort: 2 }
        },
        {
          key: "C",
          text: "🍨 冰皮麻薯，甜蜜收尾",
          scores: { adventurous: 0, intensity: 0, social: 2, value: 0, comfort: 3 }
        },
        {
          key: "D",
          text: "🥗 蔬菜拼盘，解腻又健康",
          scores: { adventurous: 0, intensity: 0, social: 2, value: 2, comfort: 1 }
        }
      ]
    }
  ],
  personality_results: [
    {
      personality_id: "P01",
      personality_name: "热辣冒险家",
      summary: "敢想敢试，无辣不欢的火锅探险家",
      dimension_pattern: {
        adventurous: "high",
        intensity: "high",
        social: "any",
        value: "any",
        comfort: "low_or_medium"
      },
      match_rule: "adventurous >= 10 且 intensity >= 10",
      description: "你是火锅界的探险家，永远对新品保持好奇，对辣味有着执着的追求。你享受挑战味蕾的刺激感，也愿意为了尝试独特吃法而折腾。",
      ordering_style: "新品必点，辣度拉满，勇于尝试隐藏吃法",
      recommended_combo: ["牛油麻辣锅", "手打虾滑", "新品限定菜", "DIY响铃卷"],
      recommendation_reason: "满足你的冒险精神和嗜辣本性，每一口都是新体验",
      coupon_hook: "新品体验券已备好，冒险家专属福利！"
    },
    {
      personality_id: "P02",
      personality_name: "经典守护者",
      summary: "稳扎稳打，经典搭配的安全感选手",
      dimension_pattern: {
        adventurous: "low",
        intensity: "any",
        social: "any",
        value: "any",
        comfort: "high"
      },
      match_rule: "adventurous <= 5 且 comfort >= 10",
      description: "你懂得什么是真正的好味道，经典之所以经典，是因为经得起考验。你不喜欢冒险，稳妥的点单让你吃得安心又满足。",
      ordering_style: "招牌必点，稳中求胜，拒绝踩雷",
      recommended_combo: ["番茄鸳鸯锅", "手打虾滑", "捞派毛肚", "红糖冰粉"],
      recommendation_reason: "经典搭配，百吃不厌，让你吃得安心",
      coupon_hook: "经典套餐优惠，让你吃得更划算！"
    },
    {
      personality_id: "P03",
      personality_name: "社交气氛组",
      summary: "聚餐核心，热闹氛围的制造者",
      dimension_pattern: {
        adventurous: "any",
        intensity: "any",
        social: "high",
        value: "any",
        comfort: "any"
      },
      match_rule: "social >= 10",
      description: "对你来说，火锅不只是吃饭，更是和朋友们在一起的快乐时光。你喜欢热闹的氛围，享受分享美食的乐趣。",
      ordering_style: "多人分享，菜品丰富，颜值在线",
      recommended_combo: ["四宫格锅底", "大份荤素拼盘", "冰皮麻薯", "酸梅汤"],
      recommendation_reason: "适合多人分享，让聚餐更有氛围",
      coupon_hook: "多人聚餐券，人多更热闹更划算！"
    },
    {
      personality_id: "P04",
      personality_name: "薅羊毛专家",
      summary: "精打细算，性价比至上的聪明食客",
      dimension_pattern: {
        adventurous: "any",
        intensity: "any",
        social: "any",
        value: "high",
        comfort: "any"
      },
      match_rule: "value >= 10",
      description: "你会精打细算，但绝不亏待自己。你懂得用最优的价格吃到最满足，套餐和优惠是你点餐时的第一选择。",
      ordering_style: "套餐优先，优惠必领，半份更灵活",
      recommended_combo: ["2人精选套餐", "半份肥牛", "半份虾滑", "自助小料"],
      recommendation_reason: "性价比超高，花最少的钱吃最满足",
      coupon_hook: "专属优惠已解锁，省钱小能手快来领！"
    },
    {
      personality_id: "P05",
      personality_name: "独食治愈师",
      summary: "一个人也要好好吃饭的治愈系",
      dimension_pattern: {
        adventurous: "any",
        intensity: "any",
        social: "low",
        value: "any",
        comfort: "high"
      },
      match_rule: "social <= 5 且 comfort >= 10",
      description: "一个人也要好好吃饭，美食是你犒赏自己的最好方式。你享受独处的时光，用美食治愈自己。",
      ordering_style: "单人小锅，精致分量，温暖治愈",
      recommended_combo: ["单人套餐", "番茄锅", "捞面", "豆浆"],
      recommendation_reason: "一个人也能吃得很满足，独享这份温暖",
      coupon_hook: "单人专享券，独享美味不孤单！"
    },
    {
      personality_id: "P06",
      personality_name: "麻辣战士",
      summary: "无辣不欢，味蕾的极限挑战者",
      dimension_pattern: {
        adventurous: "any",
        intensity: "high",
        social: "any",
        value: "any",
        comfort: "any"
      },
      match_rule: "intensity >= 10",
      description: "无辣不欢是你的信条，只有足够的刺激才能点燃你的味蕾。你追求的是那种酣畅淋漓的辣感。",
      ordering_style: "重辣重麻，火力全开，蘸料要特辣",
      recommended_combo: ["牛油麻辣锅", "麻辣牛肉", "鸭血", "脑花", "特辣蘸料"],
      recommendation_reason: "辣得过瘾，麻得痛快，这才是火锅的灵魂",
      coupon_hook: "辣味挑战券，勇者专属优惠！"
    },
    {
      personality_id: "P07",
      personality_name: "生活美学师",
      summary: "颜值即正义，仪式感满满的精致派",
      dimension_pattern: {
        adventurous: "medium_or_high",
        intensity: "medium",
        social: "high",
        value: "any",
        comfort: "medium_or_high"
      },
      match_rule: "social >= 8 且 adventurous >= 6 且 comfort >= 6",
      description: "用餐对你来说是一种仪式，颜值与美味缺一不可。你追求精致的摆盘和美好的用餐体验。",
      ordering_style: "精致摆盘，颜值优先，适合拍照",
      recommended_combo: ["番茄鸳鸯锅", "精品肥牛", "手工虾滑", "冰皮麻薯"],
      recommendation_reason: "颜值与美味并存，让用餐成为享受",
      coupon_hook: "精致套餐券，给生活加点仪式感！"
    },
    {
      personality_id: "P08",
      personality_name: "全能平衡者",
      summary: "面面俱到，什么都要一点的均衡派",
      dimension_pattern: {
        adventurous: "medium",
        intensity: "medium",
        social: "medium",
        value: "medium",
        comfort: "medium"
      },
      match_rule: "所有维度都在 6-9 分之间",
      description: "你不喜欢走极端，什么都要尝试一点。你追求平衡的味觉体验，既能尝鲜也能稳妥，既能热闹也能安静。",
      ordering_style: "荤素搭配，浓淡相宜，样样都要",
      recommended_combo: ["鸳鸯锅", "肥牛", "蔬菜拼盘", "响铃卷", "冰粉"],
      recommendation_reason: "经典平衡搭配，老少皆宜",
      coupon_hook: "全能套餐券，满足你的所有需求！"
    },
    {
      personality_id: "P09",
      personality_name: "甜食控",
      summary: "甜蜜至上，火锅也要甜收尾",
      dimension_pattern: {
        adventurous: "any",
        intensity: "low",
        social: "medium_or_high",
        value: "any",
        comfort: "high"
      },
      match_rule: "intensity <= 5 且 comfort >= 8 且 social >= 6",
      description: "对你来说，没有甜品的火锅是不完整的。甜蜜是你的快乐源泉，你更倾向于温和的口味。",
      ordering_style: "甜品必点，饮料不能少，清淡为主",
      recommended_combo: ["番茄锅", "冰皮麻薯", "红糖冰粉", "酸梅汤"],
      recommendation_reason: "甜蜜收尾，让整顿饭完美收官",
      coupon_hook: "甜品免费券，甜到你心里！"
    },
    {
      personality_id: "P10",
      personality_name: "大胃王",
      summary: "大口吃肉，吃到扶墙出的满足派",
      dimension_pattern: {
        adventurous: "low",
        intensity: "medium_or_high",
        social: "medium",
        value: "high",
        comfort: "medium"
      },
      match_rule: "value >= 8 且 intensity >= 6 且 adventurous <= 5",
      description: "大口吃肉是你的人生信条，只有吃到扶墙出才算完整。你追求分量足、吃得爽的满足感。",
      ordering_style: "肉菜为主，分量要足，吃饱吃好",
      recommended_combo: ["大份肥牛", "羊肉卷", "午餐肉", "主食拼盘"],
      recommendation_reason: "肉食盛宴，让你吃到满足",
      coupon_hook: "肉食套餐券，大胃王专属福利！"
    }
  ],
  scoring_rule: {
    step_1: "用户每选择一个选项，就把该选项 scores 加入总分。",
    step_2: "完成 5 题后，得到 adventurous、intensity、social、value、comfort 五个维度总分。",
    step_3: "根据 personality_results 中的 match_rule 匹配最符合的人格。",
    step_4: "如果多个结果同时匹配，优先选择命中 high 维度最多的人格。",
    step_5: "如果仍然并列，优先选择与第 5 题选项分数特征最接近的人格，因为第 5 题代表用户当前食欲。"
  }
});

// 自由聊天（保持原有逻辑）
export const generateChatResponse = async (message, context) => {
  const systemPrompt = `你是海底捞等位小助手，正在陪伴顾客度过等待时间。请友好、幽默地回应顾客。

店铺信息：
- 店名：海底捞火锅（中关村店）
- 招牌菜：番茄鸳鸯锅、手打虾滑、捞派毛肚、冰皮麻薯
- 特色：服务周到、食材新鲜、等位期间有小食和饮料

顾客消息：${message}

${context ? `上下文：${context}` : ''}

请自然、友好地回复，可以适当推荐菜品或安慰等待的焦虑。`;

  const response = await sendChatCompletion([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: message },
  ]);

  return response.choices[0].message.content;
};

// 菜单模式响应
export const generateMenuResponse = async (userMsg) => {
  const systemPrompt = `你是海底捞等位小助手，正在帮顾客了解菜单。请友好地介绍菜品。

店铺招牌菜：
- 番茄鸳鸯锅：酸甜开胃，老少皆宜
- 手打虾滑：新鲜虾仁手工制作，Q弹爽滑
- 捞派毛肚：七上八下，脆嫩爽口
- 冰皮麻薯：夏日限定，清凉解暑

顾客问题：${userMsg}

请自然、友好地回复，推荐合适的菜品。`;

  const response = await sendChatCompletion([
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userMsg },
  ]);

  return response.choices[0].message.content;
};

export default {
  sendChatCompletion,
  generateFullPersonalityTest,
  getOrCreatePersonalityTest,
  calculateDimensionScores,
  calculatePersonalityResult,
  generateTurtleSoups,
  getOrCreateTurtleSoups,
  getRandomTurtleSoup,
  getOrCreateTurtleSoup,
  generateTurtleSoup,
  judgeTurtleQuestion,
  generateChatResponse,
  generateMenuResponse,
};

