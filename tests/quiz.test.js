import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PATTERN_LABELS, cleanPattern, eligiblePair, makeQuiz, orderPairs, gradePair, habitTop } from '../public/quiz.mjs';

test('cleanPattern whitelists per language', () => {
  assert.equal(cleanPattern('literal', 'en'), 'literal');
  assert.equal(cleanPattern('mandarin', 'en'), 'none');
  assert.equal(cleanPattern('mandarin', 'yue'), 'mandarin');
  assert.equal(cleanPattern('literal', 'yue'), 'none');
  assert.equal(cleanPattern(undefined, 'en'), 'none');
  assert.equal(cleanPattern('none', 'en'), 'none');
});

test('eligiblePair skips pure Chinese to English and identical text', () => {
  assert.equal(eligiblePair('en', '我感冒了', 'I have a cold.'), false);
  assert.equal(eligiblePair('en', 'I very like coffee.', 'I really like coffee.'), true);
  assert.equal(eligiblePair('en', 'I like coffee.', 'I like coffee.'), false);
  assert.equal(eligiblePair('yue', '我今天上班很累', '今日返工好攰。'), true);
  assert.equal(eligiblePair('en', '', 'x'), false);
});

test('makeQuiz offers source and corrected with one correct', () => {
  const p = { lang: 'en', source: 'I very like coffee.', text: 'I really like coffee.' };
  for (const rand of [() => 0, () => 0.9]) {
    const q = makeQuiz(p, rand);
    assert.equal(q.options.length, 2);
    assert.equal(q.options.filter(o => o.correct).length, 1);
    assert.deepEqual(q.options.map(o => o.text).sort(), [p.source, p.text].sort());
    assert.equal(q.options.find(o => o.correct).text, p.text);
  }
  assert.equal(makeQuiz({ lang: 'yue', source: 'a', text: 'b' }).prompt, '哪句更似广东话口语？');
});

test('orderPairs prioritizes wrong and due, caps limit', () => {
  const now = 1000000000;
  const pairs = [
    { ts: 1, wrong: 0, due: 0 },
    { ts: 2, wrong: 2, due: 0 },
    { ts: 3, wrong: 1, due: now + 99999 },
    { ts: 4, wrong: 1, due: now - 1 },
  ];
  assert.deepEqual(orderPairs(pairs, now, 2).map(p => p.ts), [2, 4]);
});

test('gradePair schedules sooner after wrong and grows streak', () => {
  const now = 1000000000;
  const p = { ts: 1, asked: 0, wrong: 0, streak: 0, due: 0 };
  const bad = gradePair(p, false, now);
  assert.equal(bad.wrong, 1);
  assert.equal(bad.streak, 0);
  assert.ok(bad.due - now < 86400000);
  const ok1 = gradePair(bad, true, now);
  assert.equal(ok1.streak, 1);
  assert.equal(ok1.due - now, 1 * 86400000);
  const ok2 = gradePair(ok1, true, now);
  assert.equal(ok2.due - now, 3 * 86400000);
});

test('habitTop ranks patterns and falls back to all time', () => {
  const now = 10 * 86400000;
  const pairs = [
    { ts: now - 1 * 86400000, pattern: 'literal', source: 'a1', text: 'b1' },
    { ts: now - 2 * 86400000, pattern: 'literal', source: 'a2', text: 'b2' },
    { ts: now - 3 * 86400000, pattern: 'order', source: 'a3', text: 'b3' },
    { ts: now - 40 * 86400000, pattern: 'tone', source: 'a4', text: 'b4' },
    { ts: now - 1 * 86400000, pattern: 'none', source: 'a5', text: 'b5' },
  ];
  const h = habitTop(pairs, now);
  assert.equal(h.scope, 'week');
  assert.deepEqual(h.items.map(g => g.pattern), ['literal', 'order']);
  assert.equal(h.items[0].count, 2);
  assert.equal(h.items[0].example.source, 'a1');
  const old = habitTop([{ ts: now - 40 * 86400000, pattern: 'tone', source: 'a4', text: 'b4' }], now);
  assert.equal(old.scope, 'all');
  assert.equal(old.items[0].label, PATTERN_LABELS.tone);
  assert.equal(habitTop([], now).items.length, 0);
});