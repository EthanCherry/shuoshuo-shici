import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createApiHandler } from '../api.mjs';

const ENV = { DEEPSEEK_API_KEY: 'test-key-secret' };

function upstream(content, { finish = 'stop', status = 200 } = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async json() {
      return { choices: [{ finish_reason: finish, message: { content: typeof content === 'string' ? content : JSON.stringify(content) } }] };
    },
  };
}

function makeHandler(responder) {
  return createApiHandler({ fetchImpl: async () => responder(), memoryRoot: mkdtempSync(path.join(tmpdir(), 'shici-mem-')) });
}

function post(handler, path, body, { origin = 'http://localhost:4173', user = 'lan-user' } = {}) {
  const headers = { 'content-type': 'application/json', origin };
  if (user) headers['x-local-user'] = user;
  return handler(new Request('http://localhost:4173' + path, { method: 'POST', headers, body: JSON.stringify(body) }), ENV);
}

async function body(res) { return res.json(); }

test('health reports configured without leaking key', async () => {
  const handler = makeHandler(() => upstream({}));
  const res = await handler(new Request('http://localhost:4173/api/health', { headers: { 'x-local-user': 'lan-user' } }), ENV);
  const data = await body(res);
  assert.equal(data.configured, true);
  assert.ok(!JSON.stringify(data).includes('test-key-secret'));
});

test('translate returns clean English and note', async () => {
  const handler = makeHandler(() => upstream({ english: 'I feel like I have a cold.', note: '' }));
  const data = await body(await post(handler, '/api/translate', { text: '我感冒了' }));
  assert.equal(data.english, 'I feel like I have a cold.');
  assert.equal(data.provider, 'deepseek');
});

test('translate rejects Chinese in english field', async () => {
  const handler = makeHandler(() => upstream({ english: '我感冒了', note: '' }));
  const res = await post(handler, '/api/translate', { text: '我感冒了' });
  assert.equal(res.status, 502);
});

test('yue-translate accepts Cantonese with jyutping', async () => {
  const handler = makeHandler(() => upstream({ cantonese: '今日返工好攰。', jyutping: 'gam1 jat6 faan1 gung1 hou2 gui6.', note: '' }));
  const data = await body(await post(handler, '/api/yue-translate', { text: '今天上班很累' }));
  assert.equal(data.cantonese, '今日返工好攰。');
  assert.equal(data.jyutping, 'gam1 jat6 faan1 gung1 hou2 gui6.');
});

test('yue-translate rejects non-Chinese cantonese', async () => {
  const handler = makeHandler(() => upstream({ cantonese: 'so tired', jyutping: '', note: '' }));
  const res = await post(handler, '/api/yue-translate', { text: '好攰' });
  assert.equal(res.status, 502);
});

test('reply cleans vocab and drops invalid terms', async () => {
  const handler = makeHandler(() => upstream({
    reply: 'Hope you feel better soon!',
    vocab: [{ term: 'feel better', zh: '感觉好些' }, { term: '123', zh: '坏' }, { term: 'ok', zh: '' }],
  }));
  const data = await body(await post(handler, '/api/reply', { text: 'I am sick.' }));
  assert.equal(data.vocab.length, 1);
  assert.equal(data.vocab[0].term, 'feel better');
});

test('yue-reply keeps Cantonese vocab with jyutping', async () => {
  const handler = makeHandler(() => upstream({
    reply: '早啲唞下啦。',
    vocab: [{ term: '唞', zh: '休息', jyutping: 'tau2' }],
  }));
  const data = await body(await post(handler, '/api/yue-reply', { text: '好攰' }));
  assert.equal(data.vocab[0].jyutping, 'tau2');
});

test('enrich term mode returns card', async () => {
  const handler = makeHandler(() => upstream({ zh: '熬夜', jyutping: 'ngaai4 je6', example: '唔好成日捱夜。', exampleZh: '不要整天熬夜。' }));
  const data = await body(await post(handler, '/api/enrich', { mode: 'term', text: '捱夜', lang: 'yue' }));
  assert.equal(data.zh, '熬夜');
  assert.equal(data.jyutping, 'ngaai4 je6');
});

test('enrich example mode returns zh and cantonese', async () => {
  const handler = makeHandler(() => upstream({ zh: '咖啡香留在房间里。', cantonese: '間房留住咖啡香。' }));
  const data = await body(await post(handler, '/api/enrich', { mode: 'example', text: 'The coffee smell lingered.' }));
  assert.equal(data.cantonese, '間房留住咖啡香。');
});

test('empty input rejected', async () => {
  const handler = makeHandler(() => upstream({}));
  const res = await post(handler, '/api/translate', { text: '   ' });
  assert.equal(res.status, 400);
});

test('overlong input rejected', async () => {
  const handler = makeHandler(() => upstream({}));
  const res = await post(handler, '/api/translate', { text: 'a'.repeat(1600) });
  assert.equal(res.status, 413);
});

test('cross-site request rejected', async () => {
  const handler = makeHandler(() => upstream({ english: 'Hi.', note: '' }));
  const res = await post(handler, '/api/translate', { text: '你好' }, { origin: 'http://evil.example' });
  assert.equal(res.status, 403);
});

test('missing user header rejected', async () => {
  const handler = makeHandler(() => upstream({}));
  const res = await post(handler, '/api/translate', { text: '你好' }, { user: null });
  assert.equal(res.status, 401);
});

test('missing key returns 503', async () => {
  const handler = makeHandler(() => upstream({}));
  const res = await handler(new Request('http://localhost:4173/api/translate', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'http://localhost:4173', 'x-local-user': 'lan-user' },
    body: JSON.stringify({ text: '你好' }),
  }), {});
  assert.equal(res.status, 503);
});

test('truncated AI output rejected', async () => {
  const handler = makeHandler(() => upstream({ english: 'Half a sen' }, { finish: 'length' }));
  const res = await post(handler, '/api/translate', { text: '你好' });
  assert.equal(res.status, 502);
});

test('upstream 402 surfaces balance message', async () => {
  const handler = makeHandler(() => upstream({}, { status: 402 }));
  const data = await body(await post(handler, '/api/translate', { text: '你好' }));
  assert.match(data.error, /余额不足/);
});

test('key never appears in any response', async () => {
  const handler = makeHandler(() => upstream({ english: 'Hello.', note: '' }));
  const res = await post(handler, '/api/translate', { text: '你好' });
  assert.ok(!(await res.text()).includes('test-key-secret'));
});

test('listening allows Cantonese when a turn is yue', async () => {
  const handler = makeHandler(() => upstream({ title: '今日粤语', script: '你: 好攰。\n阿粵: 早啲唞。' }));
  const data = await body(await post(handler, '/api/listening', { turns: [{ text: '好攰', reply: '早啲唞', lang: 'yue' }] }));
  assert.match(data.script, /阿粵/);
});

test('listening rejects Chinese for English-only turns', async () => {
  const handler = makeHandler(() => upstream({ title: 't', script: '你: 你好。' }));
  const res = await post(handler, '/api/listening', { turns: [{ text: 'hello', reply: 'hi', lang: 'en' }] });
  assert.equal(res.status, 502);
});

test('translate passes whitelisted pattern and why', async () => {
  const handler = makeHandler(() => upstream({ english: 'I really like coffee.', note: '', pattern: 'literal', patternWhy: '逐字直译：very like 换 really like。' }));
  const data = await body(await post(handler, '/api/translate', { text: 'I very like coffee.' }));
  assert.equal(data.pattern, 'literal');
  assert.equal(data.patternWhy, '逐字直译：very like 换 really like。');
});

test('translate drops unknown pattern and clears why', async () => {
  const handler = makeHandler(() => upstream({ english: 'I have a cold.', note: '', pattern: 'mandarin', patternWhy: '不该出现' }));
  const data = await body(await post(handler, '/api/translate', { text: '我感冒了' }));
  assert.equal(data.pattern, 'none');
  assert.equal(data.patternWhy, '');
});

test('yue-translate keeps mandarin pattern', async () => {
  const handler = makeHandler(() => upstream({ cantonese: '今日返工好攰。', jyutping: 'gam1 jat6 faan1 gung1 hou2 gui6.', note: '', pattern: 'mandarin', patternWhy: '普通话句式换粤语语序。' }));
  const data = await body(await post(handler, '/api/yue-translate', { text: '今天上班很累' }));
  assert.equal(data.pattern, 'mandarin');
  assert.equal(data.patternWhy, '普通话句式换粤语语序。');
});