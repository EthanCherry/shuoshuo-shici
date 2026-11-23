import test from 'node:test';
import assert from 'node:assert/strict';
import { demoHandle, DEMO_EXAMPLES } from '../public/demo.mjs';

const store = new Map();
globalThis.localStorage = {
  getItem: k => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: k => store.delete(k),
};

test('translate 命中预置场景', async () => {
  const r = await demoHandle('translate', { text: '我好像感冒了，有点发烧。' });
  assert.match(r.english, /caught a cold/);
  assert.equal(r.note, '');
  assert.equal(r.provider, 'demo');
});

test('translate 纯英语仅轻度整理', async () => {
  const r = await demoHandle('translate', { text: 'i walked to the park' });
  assert.equal(r.english, 'I walked to the park.');
  assert.match(r.note, /轻度整理/);
});

test('translate 未命中中文走离线粗译', async () => {
  const r = await demoHandle('translate', { text: '我想买一台电脑' });
  assert.match(r.english, /buy/);
  assert.match(r.note, /粗译/);
});

test('CJK 区间端点仍判定为中文', async () => {
  const r = await demoHandle('translate', { text: '㐀' });
  assert.match(r.note, /粗译/);
});

test('yue-translate 命中带粤拼', async () => {
  const r = await demoHandle('yue-translate', { text: '今日返工好攰' });
  assert.match(r.cantonese, /返工/);
  assert.match(r.jyutping, /faan1 gung1/);
});

test('yue-translate 未命中返回原句', async () => {
  const r = await demoHandle('yue-translate', { text: '一句不存在的话' });
  assert.equal(r.cantonese, '一句不存在的话');
  assert.match(r.note, /未命中/);
});

test('reply 与 yue-reply 命中带生词', async () => {
  const en = await demoHandle('reply', { text: '我好像感冒了' });
  assert.ok(en.vocab.some(v => v.term === 'fever'));
  assert.equal(typeof en.memoryUsed.today, 'number');
  const yue = await demoHandle('yue-reply', { text: '今日返工好攰' });
  assert.ok(yue.vocab.some(v => v.jyutping));
});

test('reply 未命中有兜底', async () => {
  const r = await demoHandle('reply', { text: 'zzz nothing' });
  assert.ok(r.reply.length > 0);
  assert.ok(r.vocab.length > 0);
});

test('listening 按语种选角色', async () => {
  const r = await demoHandle('listening', { turns: [{ lang: 'yue', text: '你好', reply: '你好呀' }] });
  assert.match(r.script, /你: 你好/);
  assert.match(r.title, /演示回听/);
});

test('enrich term 命中与兜底', async () => {
  const hit = await demoHandle('enrich', { mode: 'term', text: '攰' });
  assert.equal(hit.zh, '累');
  assert.equal(hit.jyutping, 'gui6');
  const miss = await demoHandle('enrich', { mode: 'term', text: 'zzz' });
  assert.match(miss.zh, /演示/);
});

test('enrich example 命中场景', async () => {
  const r = await demoHandle('enrich', { mode: 'example', text: '我好像感冒了' });
  assert.match(r.zh, /感冒/);
  assert.match(r.cantonese, /感冒咗/);
});

test('memory-append 累计与跨天压缩', async () => {
  store.clear();
  const a = await demoHandle('memory-append', { turn: { lang: 'en', text: 'hi', reply: 'hello' } });
  assert.equal(a.todayCount, 1);
  const b = await demoHandle('memory-append', { turn: { lang: 'yue', text: '你好', reply: '你好呀' } });
  assert.equal(b.todayCount, 2);
  const m = JSON.parse(store.get('shici-demo-memory-v1'));
  m.today.date = '2000-01-01';
  store.set('shici-demo-memory-v1', JSON.stringify(m));
  const c = await demoHandle('memory-append', { turn: { lang: 'en', text: 'new day', reply: 'ok' } });
  assert.equal(c.todayCount, 1);
  const s = await demoHandle('memory-state', {});
  assert.equal(s.days.length, 3);
  assert.equal(s.days[0].date, '2000-01-01');
  assert.match(s.profileMd, /演示数据/);
});

test('profile-refresh 返回画像 md', async () => {
  const r = await demoHandle('profile-refresh', {});
  assert.match(r.profileMd, /用户画像/);
});

test('DEMO_EXAMPLES 全部命中预置场景', async () => {
  assert.equal(DEMO_EXAMPLES.length, 5);
  for (const e of DEMO_EXAMPLES) {
    assert.ok(['en', 'yue'].includes(e.lang));
    const r = await demoHandle(e.lang === 'yue' ? 'yue-translate' : 'translate', { text: e.text });
    assert.equal(r.note, '');
  }
});

test('不支持的 action 抛错', async () => {
  await assert.rejects(() => demoHandle('nope', {}), /不支持/);
});