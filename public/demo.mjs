/* 离线演示引擎：无 DeepSeek 密钥时（公网演示 / 本地未配置）提供预置语料体验。
   所有返回形状与 /api/* 一致；数据为演示 fixtures，界面会明确标注"演示模式"。 */

const SCENARIOS = [
  { keys: ['感冒', '生病', '不舒服', '发烧', '咳嗽', 'sick', 'cold', 'fever'], zh: '我好像感冒了，有点发烧。', en: "I think I've caught a cold. I have a slight fever.", yue: '我好似感冒咗，有啲發燒。', jyutping: 'ngo5 hou2 ci5 gam2 mou6 zo2, jau5 di1 faat3 siu1.', replyEn: "Oh no, sorry to hear that. Get some rest and drink plenty of warm water!", replyYue: '哎呀，保重呀！多啲休息，飲多啲暖水啦。', vocabEn: [{ term: 'catch a cold', zh: '感冒' }, { term: 'fever', zh: '发烧' }], vocabYue: [{ term: '感冒咗', jyutping: 'gam2 mou6 zo2', zh: '感冒了' }, { term: '發燒', jyutping: 'faat3 siu1', zh: '发烧' }] },
  { keys: ['天气', '冷', '降温', '下雨', 'weather', 'cold', 'rain'], zh: '今天天气变冷了，还下了点雨。', en: "It's getting colder today, and it even rained a little.", yue: '今日天氣凍咗，仲落咗啲雨。', jyutping: 'gam1 jat6 tin1 hei3 dung3 zo2, zung6 lok6 zo2 di1 jyu5.', replyEn: "Sounds chilly! Dress in layers and take an umbrella just in case.", replyYue: '聽落好凍呀！著多件衫，帶定把傘啦。', vocabEn: [{ term: 'in layers', zh: '分层穿衣' }, { term: 'just in case', zh: '以防万一' }], vocabYue: [{ term: '凍咗', jyutping: 'dung3 zo2', zh: '变冷了' }, { term: '帶定', jyutping: 'daai3 ding6', zh: '预先带上' }] },
  { keys: ['咖啡', 'coffee', 'latte'], zh: '我想喝一杯热咖啡。', en: "I'd like a cup of hot coffee.", yue: '我想飲杯熱咖啡。', jyutping: 'ngo5 soeng2 jam2 bui1 jit6 gaa3 fe1.', replyEn: "Good choice! A hot coffee on a cold day is the best.", replyYue: '好選擇呀！凍天飲杯熱咖啡最正。', vocabEn: [{ term: "I'd like", zh: '我想要' }], vocabYue: [{ term: '熱咖啡', jyutping: 'jit6 gaa3 fe1', zh: '热咖啡' }] },
  { keys: ['上班', '返工', '工作', '加班', 'work', 'office'], zh: '今天上班好累，我想早点休息。', en: "Work was exhausting today. I want to rest early.", yue: '今日返工好攰，我想早啲唞下。', jyutping: 'gam1 jat6 faan1 gung1 hou2 gui6, ngo5 soeng2 zou2 di1 tau2 haa5.', replyEn: "You've worked hard. Take it easy tonight!", replyYue: '辛苦晒！今晚早啲唞啦。', vocabEn: [{ term: 'exhausting', zh: '令人疲惫的' }, { term: 'take it easy', zh: '放轻松' }], vocabYue: [{ term: '返工', jyutping: 'faan1 gung1', zh: '上班' }, { term: '攰', jyutping: 'gui6', zh: '累' }, { term: '唞', jyutping: 'tau2', zh: '休息' }] },
  { keys: ['电影', 'movie', 'film', '剧'], zh: '我昨晚看了一部很好看的电影。', en: 'I watched a really good movie last night.', yue: '我尋晚睇咗套好好睇嘅電影。', jyutping: 'ngo5 cam4 maan5 tai2 zo2 tou3 hou2 hou2 tai2 ge3 din6 jing2.', replyEn: "Nice! What was it about? I'd love a recommendation.", replyYue: '正呀！講乜㗎？推薦畀我啦。', vocabEn: [{ term: 'recommendation', zh: '推荐' }], vocabYue: [{ term: '尋晚', jyutping: 'cam4 maan5', zh: '昨晚' }, { term: '睇', jyutping: 'tai2', zh: '看' }] },
  { keys: ['饿', '吃饭', ' dinner', 'lunch', 'hungry', 'eat', '美食'], zh: '我有点饿了，我们去吃点东西吧。', en: "I'm a little hungry. Let's go get something to eat.", yue: '我有啲肚餓，我哋去食啲嘢啦。', jyutping: 'ngo5 jau5 di1 tou5 ngo6, ngo5 dei6 heoi3 sik6 di1 je5 laa1.', replyEn: "Same here! How about some noodles?", replyYue: '我都係呀！食麵好唔好？', vocabEn: [{ term: "let's", zh: '我们…吧' }, { term: 'how about', zh: '…怎么样' }], vocabYue: [{ term: '肚餓', jyutping: 'tou5 ngo6', zh: '饿' }, { term: '食啲嘢', jyutping: 'sik6 di1 je5', zh: '吃点东西' }] },
  { keys: ['考试', '学习', '复习', '英语', 'study', 'exam', 'test'], zh: '我最近在准备英语考试，有点紧张。', en: "I'm preparing for an English exam lately, and I'm a bit nervous.", yue: '我最近準備緊英語考試，有啲緊張。', jyutping: 'ngo5 zeoi3 gan6 zeon2 bei6 gan2 jing1 jyu5 haau2 si3, jau5 di1 gan2 zoeng1.', replyEn: "You've got this! Practising a little every day really helps.", replyYue: '你得㗎！每日練少少好有用。', vocabEn: [{ term: "you've got this", zh: '你可以的' }, { term: 'nervous', zh: '紧张' }], vocabYue: [{ term: '緊張', jyutping: 'gan2 zoeng1', zh: '紧张' }, { term: '你得㗎', jyutping: 'nei5 dak1 gaa3', zh: '你可以的' }] },
  { keys: ['跑步', '运动', '健身', 'run', 'gym', 'exercise'], zh: '我每天早上跑步半小时。', en: 'I go for a half-hour run every morning.', yue: '我每朝早跑步半個鐘。', jyutping: 'ngo5 mui5 ziu1 zou2 paau2 bou6 bun3 go3 zung1.', replyEn: "That's a great habit! Morning runs really wake you up.", replyYue: '好習慣呀！朝早跑步真係醒神。', vocabEn: [{ term: 'go for a run', zh: '去跑步' }, { term: 'habit', zh: '习惯' }], vocabYue: [{ term: '朝早', jyutping: 'ziu1 zou2', zh: '早上' }, { term: '醒神', jyutping: 'sing2 san4', zh: '提神' }] },
  { keys: ['熬夜', '睡觉', '失眠', 'sleep', 'insomnia'], zh: '我昨晚熬夜了，今天很困。', en: 'I stayed up late last night, so I feel sleepy today.', yue: '我尋晚捱夜咗，今日好眼瞓。', jyutping: 'ngo5 cam4 maan5 ngaai4 je6 zo2, gam1 jat6 hou2 ngaan5 fan3.', replyEn: "Try to catch up on sleep tonight. Your body will thank you!", replyYue: '今晚早啲瞓啦，身體會多謝你㗎。', vocabEn: [{ term: 'stay up late', zh: '熬夜' }, { term: 'catch up on', zh: '补上' }], vocabYue: [{ term: '捱夜', jyutping: 'ngaai4 je6', zh: '熬夜' }, { term: '眼瞓', jyutping: 'ngaan5 fan3', zh: '困' }] },
  { keys: ['旅行', '旅游', '出去玩', 'travel', 'trip'], zh: '我下个月想去旅行。', en: "I'm thinking of taking a trip next month.", yue: '我下個月想去旅行。', jyutping: 'ngo5 haa6 go3 jyut6 soeng2 heoi3 leoi5 hang4.', replyEn: "Exciting! Any destination in mind?", replyYue: '好興奮呀！諗好去邊未？', vocabEn: [{ term: 'take a trip', zh: '去旅行' }, { term: 'destination', zh: '目的地' }], vocabYue: [{ term: '去邊', jyutping: 'heoi3 bin1', zh: '去哪' }] },
  { keys: ['开心', '好消息', '高兴', 'happy', 'good news'], zh: '今天有个好消息，我特别开心。', en: 'I got some good news today. I am so happy!', yue: '今日有個好消息，我特別開心。', jyutping: 'gam1 jat6 jau5 go3 hou2 siu1 sik1, ngo5 dak6 bit6 hoi1 sam1.', replyEn: "That's wonderful! Tell me all about it.", replyYue: '太好啦！講畀我聽啦。', vocabEn: [{ term: 'wonderful', zh: '极好的' }], vocabYue: [{ term: '好消息', jyutping: 'hou2 siu1 sik1', zh: '好消息' }] },
  { keys: ['朋友', '见面', '聚', 'friend', 'meet'], zh: '周末我想约朋友见面。', en: 'I want to meet up with friends this weekend.', yue: '週末我想約朋友見面。', jyutping: 'zau1 mut6 ngo5 soeng2 joek3 pang4 jau5 gin3 min6.', replyEn: "Sounds fun! Are you doing anything special together?", replyYue: '聽落好玩呀！一齊做啲乜特別嘢？', vocabEn: [{ term: 'meet up', zh: '见面聚聚' }], vocabYue: [{ term: '約', jyutping: 'joek3', zh: '约' }, { term: '週末', jyutping: 'zau1 mut6', zh: '周末' }] },
];

export const DEMO_EXAMPLES = [
  { label: '感冒了', text: '我好像感冒了，有点发烧。', lang: 'en' },
  { label: '上班累(粤)', text: '今日返工好攰，我想早啲唞下。', lang: 'yue' },
  { label: '想喝咖啡', text: '我想喝一杯热咖啡。', lang: 'en' },
  { label: '昨晚看电影', text: '我昨晚看了一部很好看的电影。', lang: 'en' },
  { label: '准备考试', text: '我最近在准备英语考试，有点紧张。', lang: 'en' },
  { label: '蹩脚英语', text: 'I very like drink hot coffee.', lang: 'en' },
  { label: '普通话→粤语', text: '我今天上班很累，想早点休息。', lang: 'yue' },
];

const hasCJK = t => /[㐀-鿿]/.test(t);

/* 演示模式的习惯判定：离线规则，仅供体验 */
function enPattern(text) {
  const t = String(text).toLowerCase();
  if (/\bvery (like|good|happy|tired|cold)\b|\bi very\b|\bopen (the|my) (light|computer|tv|air)\b|\balthough\b.*\bbut\b/.test(t)) return { pattern: 'literal', patternWhy: '逐字直译：英语不说 very like，换 really like 或 love。' };
  if (/\bhow to say\b|\bwhat mean\b|\bi am agree\b|\bmore better\b|\byesterday i go\b/.test(t)) return { pattern: 'order', patternWhy: '语序句式：疑问与过去式按英语习惯重组。' };
  return { pattern: 'none', patternWhy: '' };
}
function yuePattern(text) {
  const t = String(text);
  if (/[a-zA-Z]/.test(t)) return { pattern: 'latin', patternWhy: '字母代字：d/ge/la 还原成 啲/嘅/喇。' };
  if (/[的了是很吗]/.test(t) && !/[嘅咗係唔]/.test(t)) return { pattern: 'mandarin', patternWhy: '普通话句式：换成 嘅/咗/係 与粤语语序。' };
  if (/[嘅咗係]/.test(t) && !/[啦咯喎㗎]/.test(t)) return { pattern: 'particle', patternWhy: '语气词：补 啦/喎/ 更像口语。' };
  return { pattern: 'none', patternWhy: '' };
}

function match(text) {
  const t = String(text || '').toLowerCase();
  return SCENARIOS.find(s => s.keys.some(k => t.includes(k.toLowerCase()))) || null;
}

/* 离线粗译：最长词匹配，仅供演示体验 */
const ZH_EN = [
  ['我', 'I '], ['今天', 'today '], ['明天', 'tomorrow '], ['昨天', 'yesterday '], ['昨晚', 'last night '], ['最近', 'lately '], ['现在', 'now '], ['早上', 'in the morning '], ['晚上', 'in the evening '], ['周末', 'this weekend '], ['下个月', 'next month '],
  ['想', 'want to '], ['觉得', 'feel '], ['有点', 'a little '], ['非常', 'very '], ['特别', 'especially '], ['很', 'very '], ['好', 'very '], ['不', 'not '], ['没', 'not '], ['是', 'am '], ['在', 'am '], ['了', ''], ['吗', '?'], ['呢', '?'], ['吧', ''], ['啊', '!'],
  ['感冒', 'catch a cold '], ['发烧', 'have a fever '], ['生病', 'be sick '], ['咳嗽', 'cough '], ['累', 'tired '], ['困', 'sleepy '], ['紧张', 'nervous '], ['开心', 'happy '], ['高兴', 'happy '], ['难过', 'sad '], ['饿', 'hungry '],
  ['喝', 'drink '], ['吃', 'eat '], ['看', 'watch '], ['去', 'go '], ['买', 'buy '], ['跑步', 'run '], ['运动', 'exercise '], ['睡觉', 'sleep '], ['熬夜', 'stay up late '], ['休息', 'rest '], ['学习', 'study '], ['复习', 'review '], ['准备', 'prepare for '], ['见面', 'meet up '], ['约', 'ask out '], ['旅行', 'travel '], ['上班', 'go to work '], ['工作', 'work '], ['回家', 'go home '],
  ['咖啡', 'coffee '], ['电影', 'a movie '], ['东西', 'something '], ['饭', 'a meal '], ['面', 'noodles '], ['朋友', 'friends '], ['英语', 'English '], ['粤语', 'Cantonese '], ['考试', 'an exam '], ['天气', 'the weather '], ['冷', 'cold '], ['热', 'hot '], ['下雨', 'rain '], ['雨', 'rain '], ['好消息', 'good news '], ['半小时', 'half an hour '], ['一部', 'a '], ['一杯', 'a cup of '], ['一点', 'a little '], ['早点', 'early '], ['早', 'early '], ['一起', 'together '], ['喜欢', 'like '], ['我们', 'we '], ['我哋', 'we '], ['佢', 'they '], ['你', 'you '],
];
function roughEn(text) {
  let out = '', rest = String(text);
  while (rest.length) {
    const hit = ZH_EN.find(([zh]) => rest.startsWith(zh));
    if (hit) { out += hit[1]; rest = rest.slice(hit[0].length); }
    else { const ch = rest[0]; out += /[a-zA-Z0-9\s.,!'?-]/.test(ch) ? ch : ''; rest = rest.slice(1); }
  }
  out = out.replace(/\s+/g, ' ').trim();
  if (!out) out = 'Hello.';
  return out.charAt(0).toUpperCase() + out.slice(1) + (/[.!?]$/.test(out) ? '' : '.');
}
function cleanEn(text) {
  let t = String(text).trim().replace(/\s+/g, ' ');
  t = t.charAt(0).toUpperCase() + t.slice(1);
  return /[.!?]$/.test(t) ? t : t + '.';
}

/* 演示记忆（localStorage，明确标注演示） */
const MKEY = 'shici-demo-memory-v1';
const todayKey = () => new Date().toISOString().slice(0, 10);
function demoMemory() {
  try { const raw = localStorage.getItem(MKEY); if (raw) return JSON.parse(raw); } catch {}
  const d = new Date(); const day = n => new Date(d.getTime() - n * 86400000).toISOString().slice(0, 10);
  return {
    today: { date: todayKey(), turns: [] },
    days: [
      { date: day(1), turnsCount: 6, summary: '练习了感冒与天气话题，用了粤语表达"返工好攰"，并积累了 catch a cold、in layers 等词。', topics: ['健康', '天气', '粤语'], facts: ['用户偏好粤语输入', '提到想早点休息'], langMix: 'yue+en', mood: '平静' },
      { date: day(2), turnsCount: 4, summary: '围绕咖啡与电影展开英语对话，积累了 recommendation、take a trip 等表达。', topics: ['咖啡', '电影'], facts: ['喜欢热咖啡'], langMix: 'en', mood: '轻松' },
    ],
    profile: { summary: '粤语使用者，能自然用粤语表达日常感受；英语处于日常会话积累期，中英夹杂常见。偏好简短、生活化的对话。', languageLevel: '日常会话积累期', preferredLang: 'yue', tone: '生活化、简短', speechTraits: ['中英夹杂', '粤语口语'], interests: ['咖啡', '电影', '跑步'], weakVocab: ['exhausting', 'recommendation'], updatedAt: Date.now(), turnsObserved: 10 },
  };
}
function saveDemoMemory(m) { try { localStorage.setItem(MKEY, JSON.stringify(m)); } catch {} }
function profileMd(p) {
  return `# 用户画像（演示数据）\n\n> 更新于 ${new Date(p.updatedAt).toLocaleString('zh-CN')} · 已观察 ${p.turnsObserved} 轮对话\n\n${p.summary}\n\n- 语言水平：${p.languageLevel}\n- 偏好语言：${p.preferredLang === 'yue' ? '粤语' : '英语'}\n- 语气：${p.tone}\n- 谈吐特征：${p.speechTraits.join('、')}\n- 兴趣：${p.interests.join('、')}\n- 待巩固词汇：${p.weakVocab.join('、')}\n`;
}

const TERMS = {
  'exhausting': { zh: '令人筋疲力尽的', example: 'Work was exhausting today.', exampleZh: '今天上班累坏了。' },
  'recommendation': { zh: '推荐', example: "I'd love a recommendation.", exampleZh: '我想要个推荐。' },
  'take it easy': { zh: '放轻松', example: 'Take it easy tonight!', exampleZh: '今晚放轻松！' },
  'catch a cold': { zh: '感冒', example: "I think I've caught a cold.", exampleZh: '我好像感冒了。' },
  'in layers': { zh: '分层穿衣', example: 'Dress in layers.', exampleZh: '分层穿衣。' },
  '捱夜': { zh: '熬夜', jyutping: 'ngaai4 je6', example: '唔好成日捱夜。', exampleZh: '不要整天熬夜。' },
  '攰': { zh: '累', jyutping: 'gui6', example: '今日返工好攰。', exampleZh: '今天上班很累。' },
  '唞': { zh: '休息', jyutping: 'tau2', example: '早啲唞下啦。', exampleZh: '早点休息吧。' },
  '返工': { zh: '上班', jyutping: 'faan1 gung1', example: '我朝早返工。', exampleZh: '我早上上班。' },
  '眼瞓': { zh: '困', jyutping: 'ngaan5 fan3', example: '今日好眼瞓。', exampleZh: '今天很困。' },
};

export async function demoHandle(action, data = {}) {
  await new Promise(r => setTimeout(r, 250));
  const text = data.text || '';
  const sc = match(text);
  switch (action) {
    case 'translate': {
      if (sc) return { english: sc.en, note: '', ...enPattern(text), provider: 'demo', model: 'offline-demo' };
      if (!hasCJK(text)) return { english: cleanEn(text), note: '演示模式：已轻度整理。', pattern: 'none', patternWhy: '', provider: 'demo', model: 'offline-demo' };
      return { english: roughEn(text), note: '演示模式为离线粗译，仅供体验；配置密钥后为准确翻译。', pattern: 'none', patternWhy: '', provider: 'demo', model: 'offline-demo' };
    }
    case 'yue-translate': {
      if (sc) return { cantonese: sc.yue, jyutping: sc.jyutping, note: '', ...yuePattern(text), provider: 'demo', model: 'offline-demo' };
      return { cantonese: String(text).trim(), jyutping: '', note: '演示模式：未命中预置粤语语料，返回原句。', pattern: 'none', patternWhy: '', provider: 'demo', model: 'offline-demo' };
    }
    case 'reply': {
      if (sc) return { reply: sc.replyEn, vocab: sc.vocabEn, provider: 'demo', model: 'offline-demo', memoryUsed: { today: demoMemory().today.turns.length, recalled: [], profile: true } };
      return { reply: 'Thanks for sharing! Tell me a little more about it.', vocab: [{ term: 'tell me more', zh: '再多说一点' }], provider: 'demo', model: 'offline-demo', memoryUsed: { today: demoMemory().today.turns.length, recalled: [], profile: true } };
    }
    case 'yue-reply': {
      if (sc) return { reply: sc.replyYue, vocab: sc.vocabYue, provider: 'demo', model: 'offline-demo', memoryUsed: { today: demoMemory().today.turns.length, recalled: [], profile: true } };
      return { reply: '多謝分享！可唔可以講多啲呀？', vocab: [{ term: '講多啲', jyutping: 'gong2 do1 di1', zh: '多说一点' }], provider: 'demo', model: 'offline-demo', memoryUsed: { today: demoMemory().today.turns.length, recalled: [], profile: true } };
    }
    case 'listening': {
      const turns = (data.turns || []).slice(0, 12);
      const anyYue = turns.some(t => t.lang === 'yue');
      const you = anyYue ? '你' : 'You', partner = anyYue ? '阿粵' : 'Say';
      const script = turns.map(t => `${you}: ${t.text}\n${partner}: ${t.reply}`).join('\n');
      return { title: `演示回听 · ${todayKey()}`, script, provider: 'demo', model: 'offline-demo' };
    }
    case 'enrich': {
      if (data.mode === 'term') {
        const t = TERMS[String(text).trim()] || TERMS[String(text).trim().toLowerCase()];
        if (t) return { zh: t.zh, jyutping: t.jyutping || '', example: t.example, exampleZh: t.exampleZh, provider: 'demo', model: 'offline-demo' };
        return { zh: '（演示）离线词库暂无该词释义', jyutping: '', example: 'This is a demo example sentence.', exampleZh: '这是一句演示例句。', provider: 'demo', model: 'offline-demo' };
      }
      if (sc) return { zh: sc.zh, cantonese: sc.yue, provider: 'demo', model: 'offline-demo' };
      return { zh: hasCJK(text) ? String(text).trim() : roughEn(text), cantonese: sc ? sc.yue : String(text).trim(), provider: 'demo', model: 'offline-demo' };
    }
    case 'memory-state': {
      const m = demoMemory();
      return { today: { date: m.today.date, count: m.today.turns.length }, days: m.days, profile: m.profile, profileMd: profileMd(m.profile), provider: 'demo' };
    }
    case 'memory-append': {
      const m = demoMemory(); const t = data.turn || {};
      if (m.today.date !== todayKey()) { m.days.unshift({ date: m.today.date, turnsCount: m.today.turns.length, summary: '（演示）跨天自动压缩归档。', topics: [], facts: [], langMix: 'mixed', mood: '平静' }); m.today = { date: todayKey(), turns: [] }; }
      m.today.turns.push({ ts: t.ts || Date.now(), lang: t.lang, text: t.text, reply: t.reply || '', vocab: t.vocab || [] });
      m.profile.turnsObserved++; m.profile.updatedAt = Date.now();
      saveDemoMemory(m);
      return { ok: true, todayCount: m.today.turns.length, profileUpdated: false, provider: 'demo' };
    }
    case 'profile-refresh': {
      const m = demoMemory(); m.profile.updatedAt = Date.now(); saveDemoMemory(m);
      return { profile: m.profile, profileMd: profileMd(m.profile), provider: 'demo' };
    }
    default: throw new Error('演示模式不支持该功能。');
  }
}