import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createMemory, referencesPast, dayKey } from '../memory.mjs';
import { createApiHandler } from '../api.mjs';

const root = () => mkdtempSync(path.join(tmpdir(), 'shici-memory-'));
const mockLLM = async (system) => {
  if (system.startsWith('You compress')) return { summary: '用户提到自己感冒流鼻涕。', topics: ['感冒', '健康'], facts: ['用户最近感冒'], langMix: 'en:2,yue:1', mood: '有点累' };
  return { summary: '中英夹杂的初学者，语气随意。', languageLevel: 'beginner', preferredLang: 'mixed', tone: 'casual', speechTraits: ['中英夹杂'], interests: ['电影'], topics: ['健康'], weakVocab: ['cold'], goals: ['日常对话'] };
};

test('referencesPast detects temporal expressions', () => {
  assert.ok(referencesPast('昨天我说过感冒'));
  assert.ok(referencesPast('上次那个词怎么读'));
  assert.ok(referencesPast('do you remember yesterday'));
  assert.ok(!referencesPast('今天天气不错'));
});

test('appendTurn stores today and builds profile after three turns', async () => {
  const r = root();
  const mem = createMemory({ root: r, llm: mockLLM, now: () => Date.parse('2026-11-18T10:00:00') });
  for (let i = 0; i < 3; i++) await mem.appendTurn('u', { lang: 'en', text: `line ${i} 感冒`, reply: 'ok', vocab: [] });
  const today = await mem.loadToday('u');
  assert.equal(today.turns.length, 3);
  assert.equal(today.date, '2026-11-18');
  const profile = await mem.loadProfile('u');
  assert.equal(profile.languageLevel, 'beginner');
  assert.ok(existsSync(path.join(r, 'u', 'profile.md')));
  assert.match(readFileSync(path.join(r, 'u', 'profile.md'), 'utf8'), /用户画像/);
});

test('day rollover compresses yesterday into archival memory', async () => {
  const r = root();
  let clock = Date.parse('2026-11-18T10:00:00');
  const mem = createMemory({ root: r, llm: mockLLM, now: () => clock });
  await mem.appendTurn('u', { lang: 'en', text: '我感冒了', reply: 'feel better', vocab: [] });
  clock = Date.parse('2026-11-19T09:00:00');
  const today = await mem.loadToday('u');
  assert.equal(today.date, '2026-11-19');
  assert.equal(today.turns.length, 0);
  const days = await mem.listDays('u');
  assert.equal(days.length, 1);
  assert.equal(days[0].date, '2026-11-18');
  assert.match(days[0].summary, /感冒/);
});

test('recall finds yesterday compressed memory on past reference', async () => {
  const r = root();
  let clock = Date.parse('2026-11-18T10:00:00');
  const mem = createMemory({ root: r, llm: mockLLM, now: () => clock });
  await mem.appendTurn('u', { lang: 'en', text: '我感冒了', reply: 'ok', vocab: [] });
  clock = Date.parse('2026-11-19T09:00:00');
  await mem.loadToday('u');
  const hit = await mem.recall('u', '昨天我说我感冒，还记得吗');
  assert.ok(hit.used);
  assert.equal(hit.days[0].date, '2026-11-18');
  const none = await mem.recall('u', '今天想聊电影');
  assert.ok(!none.used);
});

test('recall falls back to keyword match when no date word', async () => {
  const r = root();
  let clock = Date.parse('2026-11-18T10:00:00');
  const mem = createMemory({ root: r, llm: mockLLM, now: () => clock });
  await mem.appendTurn('u', { lang: 'en', text: '我感冒了', reply: 'ok', vocab: [] });
  clock = Date.parse('2026-11-25T09:00:00');
  await mem.loadToday('u');
  const hit = await mem.recall('u', '之前我提过感冒那件事');
  assert.ok(hit.used);
  assert.equal(hit.days[0].date, '2026-11-18');
});

test('contextFor prioritizes today and exposes memoryUsed', async () => {
  const r = root();
  const mem = createMemory({ root: r, llm: mockLLM, now: () => Date.parse('2026-11-18T10:00:00') });
  await mem.appendTurn('u', { lang: 'yue', text: '今日好攰', reply: '早啲唞', vocab: [] });
  const ctx = await mem.contextFor('u', '今日好攰');
  assert.equal(ctx.today.length, 1);
  assert.equal(ctx.today[0].lang, 'yue');
  assert.equal(ctx.memoryUsed.today, 1);
  assert.deepEqual(ctx.memoryUsed.recalled, []);
});

test('api memory-append then memory-state then reply carries memoryUsed', async () => {
  const r = root();
  const handler = createApiHandler({ fetchImpl: async () => ({ ok: true, status: 200, async json() { return { choices: [{ finish_reason: 'stop', message: { content: JSON.stringify({ reply: 'Feel better soon!', vocab: [] }) } }] }; } }), memoryRoot: r });
  const headers = { 'content-type': 'application/json', origin: 'http://localhost:4173', 'x-local-user': 'lan-user' };
  const post = (p, b) => handler(new Request('http://localhost:4173' + p, { method: 'POST', headers, body: JSON.stringify(b) }), { DEEPSEEK_API_KEY: 'k' });
  const appended = await (await post('/api/memory-append', { turn: { lang: 'en', text: 'I am sick.', reply: 'Feel better!', vocab: [], ts: Date.now() } })).json();
  assert.equal(appended.ok, true);
  assert.equal(appended.todayCount, 1);
  const state = await (await post('/api/memory-state', {})).json();
  assert.equal(state.today.count, 1);
  const reply = await (await post('/api/reply', { text: 'I am sick.' })).json();
  assert.equal(reply.memoryUsed.today, 1);
});