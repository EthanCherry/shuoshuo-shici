/* 错句闭环纯逻辑：习惯标签、入册资格、测验、队列与统计。浏览器与 node 测试共用。 */

export const PATTERN_LABELS = {
  literal: '逐字直译',
  collocation: '搭配选词',
  order: '语序句式',
  tone: '语气场合',
  mandarin: '普通话句式',
  particle: '语气词',
  latin: '字母代字',
};

const PATTERNS = {
  en: ['literal', 'collocation', 'order', 'tone'],
  yue: ['mandarin', 'particle', 'latin', 'collocation'],
};

export function cleanPattern(p, lang) {
  return PATTERNS[lang]?.includes(p) ? p : 'none';
}

/* 只有"原句≠整理句"且原句带目标语痕迹才入册：纯中文→英语没有可考的错句。 */
export function eligiblePair(lang, source, text) {
  const s = String(source ?? '').trim(), t = String(text ?? '').trim();
  if (!s || !t || s === t) return false;
  return lang === 'yue' ? true : /[a-zA-Z]/.test(s);
}

export function makeQuiz(pair, rand = Math.random) {
  const options = [{ text: pair.source, correct: false }, { text: pair.text, correct: true }];
  if (rand() < 0.5) options.reverse();
  return { prompt: pair.lang === 'yue' ? '哪句更似广东话口语？' : '哪句更自然？', options };
}

export function orderPairs(pairs, now = Date.now(), limit = 6) {
  return pairs.filter(p => !p.due || p.due <= now)
    .sort((a, b) => (b.wrong || 0) - (a.wrong || 0) || (a.due || 0) - (b.due || 0) || (b.ts || 0) - (a.ts || 0))
    .slice(0, limit);
}

export function gradePair(pair, ok, now = Date.now()) {
  const streak = ok ? (pair.streak || 0) + 1 : 0;
  const days = ok ? [1, 3, 7, 14, 30][Math.min(streak - 1, 4)] : 10 / 1440;
  return { ...pair, asked: (pair.asked || 0) + 1, wrong: (pair.wrong || 0) + (ok ? 0 : 1), streak, due: now + days * 86400000, lastReview: now };
}

export function habitTop(pairs, now = Date.now(), days = 7, top = 3) {
  const tagged = pairs.filter(p => p.pattern && p.pattern !== 'none');
  const week = tagged.filter(p => (p.ts || 0) >= now - days * 86400000);
  const pool = week.length ? week : tagged;
  const map = new Map();
  for (const p of pool) {
    const g = map.get(p.pattern) || { pattern: p.pattern, label: PATTERN_LABELS[p.pattern] || p.pattern, count: 0, example: null };
    g.count++;
    if (!g.example || (p.ts || 0) > (g.example.ts || 0)) g.example = p;
    map.set(p.pattern, g);
  }
  return { scope: week.length ? 'week' : 'all', items: [...map.values()].sort((a, b) => b.count - a.count).slice(0, top) };
}