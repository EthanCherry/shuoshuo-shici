import { corpus, categories, stats, extract, replyFor, wordMatch, suggestExpressions } from './corpus.js';
import { demoHandle, DEMO_EXAMPLES } from './demo.mjs';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ============================ 存储 ============================ */
const KEY = 'shici-v1';
let storageBroken = false;
const defaultPrefs = { accent: 'en-US', rate: 1, enAsr: 'zh-CN' };
function read() {
  try {
    const x = JSON.parse(localStorage.getItem(KEY) || '{}');
    return {
      words: Object.assign(Object.create(null), x.words && typeof x.words === 'object' && !Array.isArray(x.words) ? x.words : {}),
      prefs: { ...defaultPrefs, ...x.prefs },
      chats: Array.isArray(x.chats) ? x.chats : [],
    };
  } catch { return { words: Object.create(null), prefs: { ...defaultPrefs }, chats: [] }; }
}
let db = read();
let turns = db.chats.slice(-200);
function save() {
  db.chats = turns.slice(-200);
  try { localStorage.setItem(KEY, JSON.stringify(db)); storageBroken = false; }
  catch { storageBroken = true; toast('设备存储不可用或已满，请导出备份。'); }
}
function toast(t) { $('#toast').textContent = t; $('#toast').classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => $('#toast').classList.remove('show'), 3200); }

/* ============================ 语音合成 ============================ */
let voiceToken = 0;
function stopSpeech() { voiceToken++; window.speechSynthesis?.cancel(); $$('[data-say]').forEach(b => { b.classList.remove('is-speaking'); b.setAttribute('aria-pressed', 'false'); }); }
function pickVoice(lang) {
  const voices = speechSynthesis.getVoices();
  if (lang === 'yue') return voices.find(v => /^(yue([-_].*)?|zh[-_]HK)$/i.test(v.lang)) || null;
  const accent = db.prefs.accent;
  return voices.find(v => v.lang.replace('_', '-').toLowerCase() === accent.toLowerCase() && /natural|google|samantha|jenny|aria/i.test(v.name))
    || voices.find(v => v.lang.replace('_', '-').toLowerCase() === accent.toLowerCase())
    || voices.find(v => /^en[-_]/i.test(v.lang)) || null;
}
function speak(text, lang = 'en', rate = db.prefs.rate, onDone) {
  if (!('speechSynthesis' in window)) { toast('当前浏览器没有语音朗读功能。'); onDone?.(); return; }
  stopSpeech();
  const voice = pickVoice(lang);
  if (lang === 'yue' && !voice) { toast('此设备没有粤语音色（zh-HK）。可先用文字，或在 Edge / 支持粤语的设备上听。'); onDone?.(); return; }
  const token = voiceToken;
  const parts = String(text).match(/[^.!?。！？]+[.!?。！？]?/g) || [text];
  let i = 0;
  const next = () => {
    if (token !== voiceToken) return;
    if (i >= parts.length) { onDone?.(); return; }
    const u = new SpeechSynthesisUtterance(parts[i++].trim());
    u.lang = lang === 'yue' ? 'zh-HK' : db.prefs.accent;
    u.rate = Number(rate) || 1;
    if (voice) u.voice = voice;
    u.onend = next;
    u.onerror = () => { if (token === voiceToken) { onDone?.(); } };
    speechSynthesis.speak(u);
  };
  speechSynthesis.resume(); next();
}
window.speechSynthesis?.getVoices();
window.speechSynthesis?.addEventListener?.('voiceschanged', () => speechSynthesis.getVoices());
const speaker = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14"/></svg>';
const sayButton = (t, lang = 'en') => `<button class="speak" data-say="${esc(t)}" data-say-lang="${lang}" aria-label="朗读 ${esc(t)}">${speaker}</button>`;
const cantoneseButton = t => `<button class="cantonese-speak" data-say="${esc(t)}" data-say-lang="yue" aria-label="粤语朗读 ${esc(t)}">${speaker}<span>粤语</span></button>`;

/* ============================ AI 请求 ============================ */
let DEMO = false;
async function requestAI(action, payload) {
  if (DEMO) return demoHandle(action, payload);
  let response;
  try { response = await fetch('/api/' + action, { method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(50000) }); }
  catch { throw new Error('连接AI失败或等待超时，请稍后重试。'); }
  let data; try { data = await response.json(); } catch { throw new Error('AI服务暂时不可用，请稍后重试。'); }
  if (!response.ok) throw new Error(data.error || 'AI服务暂时不可用。');
  return data;
}

/* ============================ 导航 ============================ */
const pageLabels = { chat: '今天，想用粤语还是英语聊聊？', library: '生活里想说的话', search: '你的随身词语笔记', history: '每一次遇见，都有迹可循', review: '让陌生的词，慢慢熟悉', settings: '一点调整，更合心意' };
let activeView = 'chat';
function setView(v) {
  if (capturing) { toast('请先结束当前录音。'); return; }
  stopSpeech();
  activeView = v;
  $$('.view').forEach(x => x.hidden = x.id !== `${v}-view`);
  $$('.nav').forEach(x => x.classList.toggle('active', x.dataset.view === v));
  $('#page-label').textContent = pageLabels[v] || '';
  if (v === 'history') renderHistory();
  if (v === 'review') startReview();
  if (v === 'settings') { $('#accent').value = db.prefs.accent; $('#rate').value = String(db.prefs.rate); $('#en-asr').value = db.prefs.enAsr; loadMemory(); }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ============================ 对话状态 ============================ */
let draft = null, capture = null, capturing = false, busy = false, wantStop = false, inputLang = 'en';
let practiceAudio = null;
const urls = new Set();

function syncControls() {
  const locked = capturing || busy;
  $('#hold-yue').disabled = locked;
  $('#hold-en').disabled = locked;
  $('#organize').disabled = locked;
  $('#input').readOnly = locked;
  $$('.lang-chips .chip').forEach(c => c.disabled = locked);
  const rp = $('#record-practice'); if (rp) rp.disabled = locked;
  const send = $('#send'); if (send) send.disabled = !$('#confirm')?.checked || !practiceAudio || locked;
  const sendText = $('#send-text'); if (sendText) sendText.disabled = !$('#confirm')?.checked || locked;
}
function setBusy(on) { busy = on; syncControls(); }
function setInputLang(lang) { inputLang = lang; $$('.lang-chips .chip').forEach(c => c.classList.toggle('active', c.dataset.lang === lang)); }

/* ---------- 消息渲染 ---------- */
function welcomeHTML() {
  return `<div class="welcome"><h2>先说出来，<br>粤语英语慢慢来。</h2><p class="muted">长按下面的按钮说话，或打字。英语按钮支持中英夹杂；粤语按钮帮你整理成地道广东话。</p><div class="suggestions"><button data-example="我感觉自己感冒了，because 我一直流鼻涕" data-example-lang="en">我好像感冒了<span>中英夹杂 · 英语</span></button><button data-example="今日返工好攰，想早啲休息" data-example-lang="yue">今日返工好攰<span>粤语</span></button><button data-example="我周末想去看电影" data-example-lang="en">聊聊周末计划<span>英语</span></button></div></div>`;
}
function renderMessages() {
  const box = $('#messages');
  if (!turns.length) { box.innerHTML = welcomeHTML(); bindExamples(); return; }
  box.innerHTML = turns.map((t, i) => userMsgHTML(t) + botMsgHTML(t, i)).join('');
  turns.forEach((t, i) => bindReply(t, i));
  box.scrollTop = box.scrollHeight;
}
function userMsgHTML(t) {
  const langTag = t.lang === 'yue' ? '粤语' : '英语';
  return `<div class="message user"><span class="role">YOU · ${langTag}</span><div class="user-body">${esc(t.text)}${t.jyutping ? `<div class="jyutping">${esc(t.jyutping)}</div>` : ''}</div></div>`;
}
function botMsgHTML(t, i) {
  const who = t.lang === 'yue' ? '阿粵 · 粤语搭子' : 'SAY · 英语搭子';
  return `<div class="message bot"><span class="role">${who}</span><div class="bubble" id="reply-${i}"></div></div>`;
}
function bindReply(t, i) {
  const box = $('#reply-' + i); if (!box) return;
  if (t.reply) {
    const chips = (t.vocab || []).map((v, vi) => `<button class="vocab-chip ${t.lang === 'yue' ? 'yue' : ''}" data-vocab="${i}:${vi}">＋ ${esc(v.term)}<small>${esc(v.zh)}${v.jyutping ? ' · ' + esc(v.jyutping) : ''}</small></button>`).join('');
    const mu = t.memoryUsed;
    const memNote = mu ? `记忆·今天${mu.today}轮${mu.recalled?.length ? `+回溯${mu.recalled.join('/')}` : ''}${mu.profile ? '+画像' : ''}` : '';
    const sourceText = t.replySource === 'local' ? '离线语料回复' : `${DEMO ? '演示' : 'DeepSeek'}${memNote ? ' · ' + memNote : ' · 仅根据当前内容'}`;
    box.innerHTML = `<div>${esc(t.reply)}</div><div class="message-tools"><button data-play="${i}">▶ 听回复</button><button data-stop>■ 停止</button><button data-collect-sentence="${i}">☆ 收藏整句</button></div>${chips ? `<div class="vocab-chips">${chips}</div>` : ''}<small class="reply-source">${sourceText}</small>`;
    box.querySelector('[data-play]').onclick = () => speak(t.reply, t.lang);
    box.querySelector('[data-stop]').onclick = stopSpeech;
    box.querySelector('[data-collect-sentence]').onclick = () => collectSentence(t.reply, t.lang, '', '对话回复');
    box.querySelectorAll('[data-vocab]').forEach(b => b.onclick = () => { const [ti, vi] = b.dataset.vocab.split(':').map(Number); const v = turns[ti].vocab[vi]; collectTerm(v, turns[ti].lang); b.classList.add('added'); });
  } else {
    box.innerHTML = `<div class="notice">${esc(t.error || '正在听懂你的意思，准备回复…')}</div>${t.error ? '<div class="message-tools"><button data-retry>重新获取AI回复</button><button data-local>改用离线回复</button></div>' : ''}`;
    if (t.error) {
      box.querySelector('[data-retry]').onclick = () => { if (!busy) fetchReply(t, i); };
      box.querySelector('[data-local]').onclick = () => { if (busy) return; t.reply = t.lang === 'yue' ? '收到，不如講多次你嘅意思？' : replyFor(t.text); t.replySource = 'local'; t.error = null; save(); renderMessages(); };
    }
  }
}
function bindExamples() {
  $$('[data-example]').forEach(b => b.onclick = () => { $('#input').value = b.dataset.example; setInputLang(b.dataset.exampleLang || 'en'); organize(); });
}

/* ---------- 整理表达 ---------- */
async function organize() {
  if (busy || capturing) return;
  const input = $('#input').value.trim();
  if (!input) { toast('先说一句话，或输入你想表达的内容。'); $('#input').focus(); return; }
  if (input.length > 1500) { toast('请把这段话分开练习，每次不超过1500字。'); return; }
  stopSpeech(); practiceAudio = null; draft = null;
  const card = $('#practice'); card.hidden = false;
  const langName = inputLang === 'yue' ? '粤语' : '英语';
  card.innerHTML = `<span class="step-label">整理你的${langName}</span><h2>正在帮你组织表达…</h2><p class="muted">保留你的意思，整理成自然的${langName}。</p>`;
  setBusy(true);
  try {
    if (inputLang === 'yue') {
      const r = await requestAI('yue-translate', { text: input });
      draft = { lang: 'yue', source: input, text: r.cantonese, jyutping: r.jyutping || '', note: r.note || '', kind: 'llm' };
    } else {
      const r = await requestAI('translate', { text: input });
      draft = { lang: 'en', source: input, text: r.english, jyutping: '', note: r.note || '', kind: 'llm' };
    }
    renderPractice();
  } catch (error) {
    card.innerHTML = `<span class="step-label">暂时没有获取到结果</span><h2>AI这次没能完成。</h2><div class="notice">${esc(error.message)}</div><button id="retry-organize" class="primary full">重新尝试</button>${inputLang === 'en' ? '<button id="local-organize" class="outline full">使用离线语料 · 非AI整理</button>' : ''}<button id="manual-organize" class="outline full">我自己填写标准表达</button>`;
    $('#retry-organize').onclick = () => organize();
    $('#local-organize')?.addEventListener('click', organizeLocal);
    $('#manual-organize').onclick = () => {
      const t = prompt(inputLang === 'yue' ? '输入你确认的粤语表达：' : '输入你确认的英文表达：');
      if (!t || !t.trim()) return;
      draft = { lang: inputLang, source: input, text: t.trim(), jyutping: '', note: '', kind: 'manual' };
      renderPractice();
    };
  } finally { setBusy(false); card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}
function organizeLocal() {
  const input = $('#input').value.trim(); if (!input) return;
  const result = extract(input);
  if (result.kind === 'unknown' || !result.text) { toast('离线语料没有覆盖这句，请用AI整理或手动填写。'); return; }
  draft = { lang: 'en', source: input, text: result.text, jyutping: '', note: '', kind: result.kind, partial: result.partial };
  renderPractice();
}
function renderPractice() {
  const card = $('#practice'); card.hidden = false;
  const yue = draft.lang === 'yue';
  const langName = yue ? '粤语' : '英语';
  card.innerHTML = `<span class="step-label">你的标准${langName}表达</span>
    <div class="english-output" lang="${yue ? 'yue-Hant-HK' : 'en'}">${esc(draft.text)}</div>
    ${draft.jyutping ? `<div class="jyutping">${esc(draft.jyutping)}</div>` : ''}
    <div class="source-note">${draft.kind === 'llm' ? `${DEMO ? '演示整理' : 'DeepSeek 整理'} · 请确认含义与原意一致` : draft.kind === 'manual' ? '你手动填写的表达' : '离线语料整理 · 请对照原意确认'}</div>
    ${draft.note ? `<div class="notice">${esc(draft.note)}</div>` : ''}
    <details><summary>查看原话 / 修改表达</summary><p class="muted">${esc(draft.source)}</p><textarea id="edit-text" aria-label="修改表达">${esc(draft.text)}</textarea><button class="outline" id="save-edit">保存修改</button></details>
    <div class="audio-controls"><button class="outline" id="play-demo">▶ 听示范</button><button class="outline" id="play-slow">▷ 慢速听</button><button class="outline" id="stop-demo">■ 停止</button><button class="outline" id="collect-draft">☆ 收藏这句</button></div>
    <hr class="divider">
    <div class="read-heading">试着用自己的声音说一遍（可选）</div>
    <button class="record-btn ${yue ? '' : 'en'}" id="record-practice"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4M8 22h8"/></svg>长按跟读 · ${langName}</button>
    <div id="practice-audio"></div>
    <div class="score" id="score" hidden></div>
    <label class="confirm-label"><input type="checkbox" id="confirm">这句${langName}表达了我的意思</label>
    <button class="primary full" id="send" disabled>发送 ↗</button>
    <button class="outline full" id="send-text" disabled>跳过跟读，仅发送文字</button>
    <p class="micro-note">跟读提供文字匹配度参考，非发音评分（音素级评分后续接入）。</p>`;
  $('#play-demo').onclick = () => speak(draft.text, draft.lang);
  $('#play-slow').onclick = () => speak(draft.text, draft.lang, 0.75);
  $('#stop-demo').onclick = stopSpeech;
  $('#collect-draft').onclick = () => collectSentence(draft.text, draft.lang, draft.jyutping, draft.source);
  $('#save-edit').onclick = () => { const t = $('#edit-text').value.trim(); if (!t) { toast('请填写表达。'); return; } draft.text = t; draft.partial = false; practiceAudio = null; renderPractice(); toast('已更新，请重新确认；跟读需重新录制。'); };
  $('#confirm').onchange = syncControls;
  $('#send').onclick = () => sendTurn(true);
  $('#send-text').onclick = () => sendTurn(false);
  bindHold($('#record-practice'), () => beginCapture('practice', draft.lang, draft.lang === 'yue' ? 'zh-HK' : 'en-US'), endCapture);
  syncControls();
}

/* ---------- 发送与回复 ---------- */
function sendTurn(withAudio) {
  if (!draft || !$('#confirm').checked || capturing || busy || (withAudio && !practiceAudio)) return;
  const turn = { lang: draft.lang, source: draft.source, text: draft.text, jyutping: draft.jyutping || '', reply: null, vocab: [], replySource: null, error: null, ts: Date.now() };
  turns.push(turn); const i = turns.length - 1;
  save(); renderMessages();
  $('#input').value = ''; $('#input-audio').innerHTML = ''; practiceAudio = null; draft = null;
  $('#practice').hidden = true; $('#practice').innerHTML = '';
  $('#capture-status').textContent = '';
  fetchReply(turn, i);
  $('#messages').lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
async function fetchReply(turn, i) {
  if (busy) return; turn.error = null; bindReply(turn, i); setBusy(true);
  try {
    const data = await requestAI(turn.lang === 'yue' ? 'yue-reply' : 'reply', { text: turn.text });
    turn.reply = data.reply; turn.vocab = data.vocab || []; turn.replySource = 'deepseek'; turn.memoryUsed = data.memoryUsed || null;
    save(); renderMessages(); speak(turn.reply, turn.lang);
    requestAI('memory-append', { turn: { lang: turn.lang, text: turn.text, reply: turn.reply, vocab: turn.vocab, ts: turn.ts } }).catch(() => {});
  } catch (error) { turn.error = error.message; save(); bindReply(turn, i); }
  finally { setBusy(false); $('#messages').scrollTop = $('#messages').scrollHeight; }
}

/* ---------- 录音（长按） ---------- */
function bindHold(btn, onStart, onEnd) {
  if (!btn) return;
  let active = false;
  const start = e => { e.preventDefault(); if (active || btn.disabled) return; active = true; btn.classList.add('holding'); try { btn.setPointerCapture?.(e.pointerId); } catch {} onStart(); };
  const end = e => { if (!active) return; active = false; btn.classList.remove('holding'); onEnd(); };
  btn.addEventListener('pointerdown', start);
  btn.addEventListener('pointerup', end);
  btn.addEventListener('pointercancel', end);
  btn.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) start(e); });
  btn.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') end(e); });
  btn.addEventListener('contextmenu', e => e.preventDefault());
}
async function beginCapture(kind, chipLang, asrLang) {
  if (capturing || busy) return;
  stopSpeech(); $$('audio').forEach(a => a.pause());
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) { toast('当前浏览器不能录音。请用 Chrome / Edge / Safari，或直接打字。'); return; }
  capturing = true; wantStop = false; syncControls();
  $('#capture-status').textContent = '正在请求麦克风…';
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch { capturing = false; syncControls(); $('#capture-status').textContent = ''; toast('未获得麦克风权限，请在浏览器允许录音。你仍可以打字。'); return; }
  if (wantStop) { stream.getTracks().forEach(t => t.stop()); capturing = false; syncControls(); $('#capture-status').textContent = ''; return; }
  const types = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'];
  const mime = types.find(t => MediaRecorder.isTypeSupported(t));
  let recorder;
  try { recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : {}); }
  catch { stream.getTracks().forEach(t => t.stop()); capturing = false; syncControls(); toast('设备无法创建录音，请换浏览器。'); return; }
  const chunks = [];
  const session = { kind, chipLang, stream, recorder, recognition: null, text: '', stopping: false, started: Date.now(), finished: false };
  capture = session;
  recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
  recorder.onstop = async () => {
    stream.getTracks().forEach(t => t.stop()); clearTimeout(session.timer);
    await Promise.race([session.recognitionDone || Promise.resolve(), new Promise(r => setTimeout(r, 1800))]);
    if (session.finished) return; session.finished = true; session.recognition?.abort();
    const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
    const recording = blob.size ? { url: URL.createObjectURL(blob), duration: (Date.now() - session.started) / 1000 } : null;
    if (recording) urls.add(recording.url);
    capture = null; capturing = false; syncControls();
    $('#capture-status').textContent = '';
    if (!recording) { toast('没有录到有效音频，请重试。'); return; }
    if (kind === 'input') {
      $('#input-audio').innerHTML = `<audio controls src="${recording.url}" aria-label="原始录音"></audio>`;
      if (session.text.trim()) { $('#input').value = session.text.trim(); setInputLang(chipLang); $('#capture-status').textContent = '识别完成，正在整理…'; organize(); }
      else { setInputLang(chipLang); $('#capture-status').textContent = '录音已保存，没有识别到文字，请手动输入。'; toast('录音完成，但未获取到识别文字，请手动输入原意。'); }
    } else {
      practiceAudio = recording;
      $('#practice-audio').innerHTML = `<audio controls src="${recording.url}" aria-label="我的跟读"></audio>`;
      showScore(session.text);
      syncControls();
    }
  };
  recorder.onerror = () => { toast('录音中断，请重试。'); endCapture(); };
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (Recognition) {
    try {
      const rec = new Recognition(); session.recognition = rec; rec.lang = asrLang; rec.continuous = true; rec.interimResults = true;
      session.recognitionDone = new Promise(r => session.recognitionResolve = r);
      rec.onresult = event => { let all = ''; for (let i = 0; i < event.results.length; i++) all += event.results[i][0].transcript + ' '; session.text = all.trim(); if (kind === 'input') $('#input').value = session.text; };
      rec.onerror = () => session.recognitionResolve?.();
      rec.onend = () => session.recognitionResolve?.();
      rec.start();
    } catch { session.recognitionDone = Promise.resolve(); }
  }
  recorder.start();
  $('#capture-status').textContent = kind === 'input' ? '正在聆听…松开结束' : '正在录跟读…松开结束';
  session.timer = setTimeout(() => { toast('录音已达90秒，自动结束。'); endCapture(); }, 90000);
}
function endCapture() {
  if (!capture) { wantStop = true; return; }
  if (capture.stopping) return;
  capture.stopping = true; capture.recognition?.stop();
  if (capture.recorder.state !== 'inactive') capture.recorder.stop();
}
function charMatch(ref, spoken) {
  const clean = t => String(t).replace(/[\s，。！？、,.!?；;：:"'（）()「」]/g, '');
  const a = [...clean(ref)], b = [...clean(spoken)];
  if (!a.length || !b.length) return null;
  let row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) { const next = [i]; for (let j = 1; j <= b.length; j++) next[j] = Math.min(next[j - 1] + 1, row[j] + 1, row[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); row = next; }
  return Math.max(0, Math.round((1 - row[b.length] / Math.max(a.length, b.length)) * 100));
}
function showScore(spoken) {
  const box = $('#score'); if (!box || !draft) return;
  box.hidden = false;
  const score = draft.lang === 'yue' ? charMatch(draft.text, spoken) : wordMatch(draft.text, spoken);
  const match = score === null
    ? '<b>录音完成</b><span>本设备未返回识别文字，无法计算匹配度。可回听、重录。</span>'
    : `<span>跟读文字匹配度 · 非发音评分</span><strong>${score}%</strong><span>${score >= 90 ? '识别文字与目标基本一致。' : score >= 65 ? '部分文字不同，可听一遍再试。' : '差异较大，也可能是识别不准。'}</span><details><summary>查看识别文字</summary>${esc(spoken)}</details>`;
  box.innerHTML = match + '<div class="placeholder">音素级发音评分（准确度 / 流利度 / 声调）即将上线 · 英语 en-US / 粤语 zh-HK</div>';
}

/* ---------- 词汇收藏 ---------- */
function bump(rec, now) {
  if (!rec.events.length || now - rec.last > 30000) { rec.count++; rec.events.push(now); rec.events = rec.events.slice(-500); rec.last = now; }
}
function collectTerm(v, lang) {
  const key = lang === 'en' ? v.term.toLowerCase().trim() : v.term.trim();
  if (!key) return;
  const now = Date.now();
  let rec = db.words[key];
  if (!rec) {
    rec = db.words[key] = { word: key, lang, kind: lang === 'yue' ? 'yue-term' : (key.includes(' ') ? 'phrase' : 'word'), first: now, last: now, count: 0, events: [], note: '', level: 0, due: 0, entry: { translation: '', phonetic: '', jyutping: '', example: '', exampleZh: '', source: '对话生词', exampleTranslations: {}, cantoneseTranslations: {} } };
  }
  rec.lang = rec.lang || lang;
  bump(rec, now);
  if (v.zh && !rec.entry.translation) rec.entry.translation = v.zh;
  if (v.jyutping && !rec.entry.jyutping) rec.entry.jyutping = v.jyutping;
  save(); updateCounts();
  toast('已加入生词本：' + key);
  requestAI('enrich', { mode: 'term', text: key, lang }).then(r => {
    if (!rec.entry.example) rec.entry.example = r.example;
    if (!rec.entry.exampleZh) rec.entry.exampleZh = r.exampleZh;
    if (!rec.entry.translation) rec.entry.translation = r.zh;
    if (!rec.entry.jyutping && r.jyutping) rec.entry.jyutping = r.jyutping;
    save();
  }).catch(() => {});
}
function collectSentence(text, lang, jyutping, context) {
  const key = text.trim(); if (!key) return;
  const now = Date.now();
  let rec = db.words[key];
  if (!rec) rec = db.words[key] = { word: key, lang, kind: 'sentence', first: now, last: now, count: 0, events: [], note: '', level: 0, due: 0, entry: { translation: '', phonetic: '', jyutping: '', example: '', exampleZh: '', source: '对话收藏', exampleTranslations: {}, cantoneseTranslations: {} } };
  bump(rec, now);
  rec.entry.example = key;
  if (context) rec.entry.exampleZh = context;
  if (jyutping) rec.entry.jyutping = jyutping;
  if (!rec.entry.translation) rec.entry.translation = context || key;
  save(); updateCounts(); toast('已收藏整句到生词本');
}

/* ---------- 回听 ---------- */
$('#generate-listen').onclick = async () => {
  if (busy) return; stopSpeech();
  const materials = turns.filter(t => typeof t.reply === 'string').slice(-12).map(t => ({ text: t.text, reply: t.reply, lang: t.lang }));
  if (!materials.length) { toast('先发送一句话并获取回复，再生成回听。'); return; }
  setBusy(true); $('#listen-content').innerHTML = '<div class="blank-state">正在整理回听…</div>';
  try {
    const data = await requestAI('listening', { turns: materials });
    renderListening(data.title, data.script, materials);
  } catch (error) {
    const script = materials.map(t => (t.lang === 'yue' ? '你: ' : 'You: ') + t.text + '\n' + (t.lang === 'yue' ? '阿粵: ' : 'Say: ') + t.reply).join('\n\n');
    renderListening('今天的对话回听', script, materials, true);
  } finally { setBusy(false); }
};
function renderListening(title, script, materials, fallback) {
  const anyYue = materials.some(m => m.lang === 'yue');
  $('#listen-content').innerHTML = `<article class="replay-card"><span class="eyebrow">${materials.length} 轮对话</span><h3>${esc(title)}</h3><p class="source-note">${fallback ? '直接使用已发送对话，未经AI整理。' : 'DeepSeek 根据最近对话整理，仅供练习。'}</p><div class="replay-controls"><button id="play-listen" class="primary">▶ 播放回听</button><button id="stop-listen" class="outline">■ 停止</button><select id="listen-rate" aria-label="速度"><option value="0.8">0.8× 慢速</option><option value="1" selected>1.0× 正常</option></select></div><div class="transcript" id="listen-transcript">${esc(script)}</div></article>`;
  $('#play-listen').onclick = () => speak(script, anyYue ? 'yue' : 'en', Number($('#listen-rate').value));
  $('#stop-listen').onclick = stopSpeech;
}
$('#clear-chat').onclick = () => { if (capturing || busy) return; if (!turns.length) { toast('当前没有对话。'); return; } if (confirm('清空本次对话记录？生词本不受影响。')) { turns = []; draft = null; practiceAudio = null; $('#practice').hidden = true; $('#listen-content').innerHTML = ''; save(); renderMessages(); } };

/* ============================ 语料库 ============================ */
let selectedCategory = '全部', libraryLimit = 60;
function renderLibrary() {
  const q = $('#search').value.toLowerCase().trim();
  const entries = corpus.filter(e => (selectedCategory === '全部' || e.category === selectedCategory) && (!q || [e.zh, e.en, ...e.aliases].join(' ').toLowerCase().includes(q)));
  const displayed = entries.slice(0, libraryLimit);
  $('#library-list').innerHTML = entries.length
    ? displayed.map(e => `<button class="phrase-card" data-use="${e.id}"><small>${esc(e.category)}</small><h3>${esc(e.zh)}</h3><p>${esc(e.en)}</p><span class="use">使用这句开始练习 ↗</span></button>`).join('') + (entries.length > libraryLimit ? `<button id="more-phrases" class="outline more-phrases">再看60条 · ${displayed.length}/${entries.length}</button>` : '')
    : '<div class="blank-state">没有找到这类表达，试试其他关键词。</div>';
  $('#more-phrases')?.addEventListener('click', () => { libraryLimit += 60; renderLibrary(); });
  $$('[data-use]').forEach(b => b.onclick = () => { if (capturing || busy) { toast('请先完成当前操作。'); return; } const e = corpus[Number(b.dataset.use)]; setView('chat'); $('#input').value = e.zh; setInputLang('en'); organizeLocal(); });
}
$('#corpus-count').textContent = `${categories.length} 个生活主题 · ${stats.authored} 条基础表达 + ${stats.templates} 条句型扩展（英语离线语料）。`;
$('#categories').innerHTML = ['全部', ...categories].map(c => `<button data-cat="${esc(c)}" class="${c === '全部' ? 'active' : ''}">${esc(c)}</button>`).join('');
$('#search').oninput = () => { libraryLimit = 60; renderLibrary(); };

/* ============================ 查词 ============================ */
const editorial = {
  encounter: { lead: '带有「偶然遇见」的意味，也常用来表示遇到问题或困难。', phrases: [['encounter a problem', '遇到问题'], ['a chance encounter', '一次偶遇']], examples: [['We encountered a few problems along the way.', '我们在途中遇到了一些问题。']], origin: '来自古法语 encontrer（相遇），可追溯到拉丁语 contra（对面）。' },
  serendipity: { lead: '没有刻意寻找，却意外发现美好或有价值的事物。', phrases: [['by serendipity', '机缘巧合之下']], examples: [['Finding this little bookshop was pure serendipity.', '发现这家小书店，纯属意外之喜。']], origin: '作家 Horace Walpole 于 1754 年创造这个词。' },
  linger: { lead: '人舍不得离开，或某种感觉、气味迟迟没有消散。', phrases: [['linger on', '继续存在，迟迟不散']], examples: [['The smell of coffee lingered in the room.', '房间里仍飘着咖啡的香气。']] },
};
const hkEditorial = {
  'We encountered a few problems along the way.': '我哋沿途遇到咗一啲問題。',
  'Finding this little bookshop was pure serendipity.': '無意中搵到呢間小書店，真係意外之喜。',
  'The smell of coffee lingered in the room.': '間房仲留住陣咖啡香。',
};
let current = null, requestId = 0;
const shards = new Map();
function unpack(r) { return { phonetic: r[0], translation: r[1].replace(/\\n/g, '\n'), exchange: r[2] }; }
async function localLookup(word) {
  const key = (word + '__').slice(0, 2);
  if (!shards.has(key)) { const res = await fetch(`/dict/${key}.json`); if (res.status === 404) return null; if (!res.ok) throw new Error('词库暂时无法加载'); shards.set(key, await res.json()); }
  const shard = shards.get(key); const r = Object.hasOwn(shard, word) ? shard[word] : null;
  return r ? unpack(r) : null;
}
async function apiLookup(word) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 5000);
  try { const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`, { signal: controller.signal }); if (!res.ok) return null; const data = await res.json(); return Array.isArray(data) ? data[0] : null; }
  catch { return null; } finally { clearTimeout(timer); }
}
function parseApi(api) { return { definitions: (api.meanings || []).flatMap(m => (m.definitions || []).slice(0, 2).map(d => ({ pos: m.partOfSpeech, definition: d.definition, example: d.example }))).slice(0, 5), origin: api.origin || '', phonetic: api.phonetic || api.phonetics?.find(p => p.text)?.text || '', source: api.sourceUrls?.find(u => /^https:\/\//.test(u)) || 'https://dictionaryapi.dev/', license: api.license || null }; }
async function lookup(raw) {
  const word = raw.trim().toLowerCase();
  if (!/^[a-z][a-z'-]{0,39}$/.test(word)) { $('#search-error').hidden = false; $('#search-error').textContent = '请输入一个英文单词，可包含连字符或撇号。'; return; }
  const id = ++requestId; setView('search'); $('#word-input').value = word; $('#search-error').hidden = true; $('#welcome').hidden = true;
  $('#result').innerHTML = '<p class="loading-line">正在翻开词典…</p>'; $('#search-submit').disabled = true;
  let base = db.words[word]?.entry; let remote = null;
  try {
    if (!base || !base.translation) base = await localLookup(word) || base;
    if (!base) { remote = await apiLookup(word); if (remote) base = { translation: '暂无中文释义，以下为英文词典解释。', ...parseApi(remote) }; }
    if (id !== requestId) return;
    if (!base) { $('#result').innerHTML = ''; $('#search-error').hidden = false; $('#search-error').textContent = navigator.onLine ? '没有找到这个词，请检查拼写。' : '离线中，这个词尚未缓存。'; $('#welcome').hidden = false; return; }
    const now = Date.now(); let rec = db.words[word];
    if (!rec) rec = db.words[word] = { word, lang: 'en', kind: 'word', first: now, last: now, count: 0, events: [], note: '', level: 0, due: 0, entry: {} };
    bump(rec, now);
    rec.entry = { ...base, exampleTranslations: rec.entry.exampleTranslations || {}, cantoneseTranslations: rec.entry.cantoneseTranslations || {} };
    current = word; save(); updateCounts(); $('#search-submit').disabled = false; renderResult(word);
    if (!base.definitions) { const api = remote || await apiLookup(word); if (id !== requestId) return; if (api) { rec.entry = { ...rec.entry, ...parseApi(api), phonetic: base.phonetic || parseApi(api).phonetic }; save(); if (current === word) renderResult(word); } }
  } catch { if (id === requestId) { $('#result').innerHTML = ''; $('#welcome').hidden = false; $('#search-error').hidden = false; $('#search-error').textContent = '词库加载失败，请检查网络后重试。'; } }
  finally { if (id === requestId) $('#search-submit').disabled = false; }
}
function cantoneseValue(english, entry) { return hkEditorial[english] ? { text: hkEditorial[english], source: '拾词口语整理' } : entry.cantoneseTranslations?.[english]; }
function cantoneseSection(english, entry) {
  const v = cantoneseValue(english, entry);
  return `<div class="hk-cantonese-line" data-yue-example="${esc(english)}">${v ? `<span class="hk-label">港式口语</span><div class="hk-copy"><small lang="yue-Hant-HK">${esc(v.text)}</small><span class="translation-source">${esc(v.source)}</span></div>${cantoneseButton(v.text)}` : '<small class="muted">正在补充粤语口语…</small>'}</div>`;
}
function renderResult(word) {
  const r = db.words[word], e = r.entry, ed = editorial[word];
  const examples = ed?.examples || e.definitions?.filter(d => d.example).slice(0, 3).map(d => [d.example, '']);
  $('#result').innerHTML = `<article class="result-card"><div class="word-top"><div><h2 class="word-title">${esc(word)}</h2><div class="phonetic">${esc(e.phonetic ? (e.phonetic.startsWith('/') ? e.phonetic : `/${e.phonetic}/`) : '')}</div></div><div class="word-actions">${sayButton(word, 'en')}</div></div>
    <span class="badge">${r.count > 1 ? `第 ${r.count} 次遇见` : '第一次遇见，已经替你记下了'}</span>
    <div class="translation">${esc(e.translation || '')}</div>
    ${ed?.lead ? `<p class="details-text">${esc(ed.lead)}</p>` : ''}
    ${ed?.phrases ? `<div class="content-block"><h3 class="block-heading">常用搭配<span class="source">拾词整理</span></h3>${ed.phrases.map(p => `<div class="phrase"><span>${esc(p[0])}</span><span>${esc(p[1])}</span></div>`).join('')}</div>` : ''}
    ${examples?.length ? `<div class="content-block"><h3 class="block-heading">放进句子里<span class="source">${ed ? '拾词编写' : 'Free Dictionary API'}</span></h3>${examples.map(p => `<div class="example"><div><p>${esc(p[0])}</p><small class="example-zh" lang="zh-CN" data-example-translation="${esc(p[0])}">${esc(p[1] || e.exampleTranslations?.[p[0]]?.text || '正在补充中文翻译…')}</small>${cantoneseSection(p[0], e)}</div>${sayButton(p[0], 'en')}</div>`).join('')}</div>` : ''}
    <div class="content-block"><details><summary>英文解释与词源</summary>${e.definitions?.length ? e.definitions.map(d => `<p class="en-def"><span class="pos">${esc(d.pos)}</span>${esc(d.definition)}</p>`).join('') : '<p class="muted">暂无英文释义。</p>'}${ed?.origin || e.origin ? `<p class="details-text">${esc(ed?.origin || e.origin)}</p>` : ''}<p class="muted">中文与音标：ECDICT · 英文释义：Free Dictionary API</p></details></div>
    <div class="content-block"><details id="note-details"><summary>记下你在哪里遇见它${r.note ? ' · 已有笔记' : ''}</summary><textarea id="word-note" class="note-input" placeholder="例如：今天读的一篇文章里…" maxlength="4000">${esc(r.note)}</textarea><div class="note-actions"><span class="muted">保存在当前设备</span><button class="outline" id="save-note">保存笔记</button></div></details></div>
    <div class="timeline">首次 ${formatDate(r.first)} · 最近 ${formatDate(r.last)} · 共查询 ${r.count} 次</div></article>`;
  hydrateExamples(word);
}
async function hydrateExamples(word) {
  const rec = db.words[word]; if (!rec || current !== word) return;
  await Promise.allSettled($$('[data-example-translation]').map(async node => {
    const sentence = node.dataset.exampleTranslation;
    const cachedZh = rec.entry.exampleTranslations?.[sentence];
    const cachedYue = cantoneseValue(sentence, rec.entry);
    const yueRow = $(`[data-yue-example="${CSS.escape(sentence)}"]`);
    if (cachedZh?.text) node.textContent = cachedZh.text;
    if (cachedYue && yueRow) yueRow.innerHTML = `<span class="hk-label">港式口语</span><div class="hk-copy"><small lang="yue-Hant-HK">${esc(cachedYue.text)}</small><span class="translation-source">${esc(cachedYue.source)}</span></div>${cantoneseButton(cachedYue.text)}`;
    if (cachedZh?.text && cachedYue) return;
    try {
      const r = await requestAI('enrich', { mode: 'example', text: sentence });
      rec.entry.exampleTranslations = rec.entry.exampleTranslations || {};
      rec.entry.cantoneseTranslations = rec.entry.cantoneseTranslations || {};
      rec.entry.exampleTranslations[sentence] = { text: r.zh, source: DEMO ? '演示翻译' : 'DeepSeek 翻译' };
      if (!hkEditorial[sentence]) rec.entry.cantoneseTranslations[sentence] = { text: r.cantonese, source: DEMO ? '演示粤文整理' : 'DeepSeek 粤文整理' };
      save();
      if (current === word && node.isConnected) node.textContent = r.zh;
      if (current === word && yueRow?.isConnected && !hkEditorial[sentence]) yueRow.innerHTML = `<span class="hk-label">港式口语</span><div class="hk-copy"><small lang="yue-Hant-HK">${esc(r.cantonese)}</small><span class="translation-source">${DEMO ? '演示粤文整理' : 'DeepSeek 粤文整理'}</span></div>${cantoneseButton(r.cantonese)}`;
    } catch { if (current === word && node.isConnected && !cachedZh) node.textContent = '翻译暂不可用。'; }
  }));
}
function openRecord(word) { const r = db.words[word]; if (!r) return; if (r.lang === 'en' && r.kind === 'word' && /^[a-z][a-z'-]{0,39}$/.test(word)) { lookup(word); return; } ++requestId; current = word; setView('search'); $('#welcome').hidden = true; $('#search-error').hidden = true; $('#word-input').value = word; renderCollected(r); }
function renderCollected(r) {
  const yue = r.lang === 'yue';
  $('#result').innerHTML = `<article class="result-card"><div class="word-top"><div><h2 class="word-title" lang="${yue ? 'yue-Hant-HK' : 'en'}">${esc(r.word)}</h2>${r.entry.jyutping ? `<div class="phonetic">${esc(r.entry.jyutping)}</div>` : r.entry.phonetic ? `<div class="phonetic">${esc(r.entry.phonetic)}</div>` : ''}</div><div class="word-actions">${sayButton(r.word, yue ? 'yue' : 'en')}</div></div>
    <span class="badge">${r.kind === 'sentence' ? '收藏整句' : yue ? '粤语表达' : r.kind === 'phrase' ? '英语短语' : '对话生词'} · 第 ${r.count} 次遇见</span>
    <div class="translation">${esc(r.entry.translation || '')}</div>
    ${r.entry.example ? `<div class="content-block"><h3 class="block-heading">例句</h3><div class="example"><div><p lang="${yue ? 'yue-Hant-HK' : 'en'}">${esc(r.entry.example)}</p>${r.entry.exampleZh ? `<small class="example-zh">${esc(r.entry.exampleZh)}</small>` : ''}</div>${sayButton(r.entry.example, yue ? 'yue' : 'en')}</div></div>` : ''}
    <div class="content-block"><details id="note-details"><summary>笔记${r.note ? ' · 已有' : ''}</summary><textarea id="word-note" class="note-input" maxlength="4000">${esc(r.note)}</textarea><div class="note-actions"><span class="muted">保存在当前设备</span><button class="outline" id="save-note">保存笔记</button></div></details></div>
    <div class="timeline">来源：${esc(r.entry.source || '对话')} · 首次 ${formatDate(r.first)} · 最近 ${formatDate(r.last)}</div></article>`;
}

/* ============================ 足迹 / 复习 ============================ */
function formatDate(t) { return new Date(t).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }); }
function ago(t) { const d = Math.floor((Date.now() - t) / 86400000); return d <= 0 ? '今天' : d === 1 ? '昨天' : d < 30 ? `${d} 天前` : formatDate(t); }
function updateCounts() {
  $('#nav-count').textContent = Object.keys(db.words).length;
  const recent = Object.values(db.words).sort((a, b) => b.last - a.last).slice(0, 5);
  $('#recent-home').innerHTML = recent.length ? `<p class="home-recent-title">最近遇见</p><div class="home-recent">${recent.map(w => `<button data-open="${esc(w.word)}">${esc(w.word)}</button>`).join('')}</div>` : '';
}
let sort = 'recent';
function langTag(r) { if (r.lang === 'yue') return '<span class="lang-tag yue">粤</span>'; if (r.kind === 'phrase' || r.kind === 'sentence') return '<span class="lang-tag phrase">短语</span>'; return '<span class="lang-tag en">英</span>'; }
function renderHistory() {
  const words = Object.values(db.words), total = words.reduce((s, r) => s + r.count, 0), repeated = words.filter(r => r.count > 1).length;
  $('#history-stats').innerHTML = [[words.length, '遇见的词句'], [total, '累计遇见'], [repeated, '反复遇见']].map(([n, t]) => `<div class="stat"><strong>${n}</strong><span>${t}</span></div>`).join('');
  const q = $('#history-filter').value.trim().toLowerCase();
  const list = words.filter(r => r.word.toLowerCase().includes(q) || (r.entry?.translation || '').toLowerCase().includes(q)).sort((a, b) => sort === 'frequent' ? b.count - a.count || b.last - a.last : b.last - a.last);
  $('#history-list').innerHTML = list.length ? list.map(r => `<button class="history-row" data-open="${esc(r.word)}"><div><strong>${esc(r.word)}${langTag(r)}</strong><small>${esc(r.entry?.translation || r.entry?.example || '')}</small></div><div class="row-meta"><b>${r.count} 次</b>${ago(r.last)}</div></button>`).join('') : `<div class="empty"><div class="empty-icon"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg></div>${words.length ? '没有匹配的记录。' : '还没有足迹。查一个词，或在对话里收藏一个表达。'}</div>`;
}
let reviewQueue = [], reviewIndex = 0;
function startReview() { reviewQueue = Object.values(db.words).filter(r => !r.due || r.due <= Date.now()).sort((a, b) => b.count - a.count || a.last - b.last).slice(0, 5).map(r => r.word); reviewIndex = 0; renderReview(); }
function renderReview() {
  const all = Object.keys(db.words).length;
  if (!reviewQueue.length) { $('#review-area').innerHTML = `<div class="empty"><div class="empty-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l2.5 1.5"/></svg></div>${all ? '今天还没有到期的词，给记忆一点时间。' : '先查几个词或收藏表达，之后来这里回顾。'}<br><button class="outline" data-view="search">去查一个词 ↗</button>${all ? '<br><button class="outline" id="review-anyway">现在回顾最近的词</button>' : ''}</div>`; return; }
  if (reviewIndex >= reviewQueue.length) { $('#review-area').innerHTML = `<div class="review-card"><div class="empty-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg></div><h3>又熟悉了一点。</h3><p class="muted">这次回顾了 ${reviewQueue.length} 个词句。</p><button class="outline" data-view="chat">回到对话 ↗</button></div>`; return; }
  const r = db.words[reviewQueue[reviewIndex]]; const yue = r.lang === 'yue';
  const isSentence = r.kind === 'sentence';
  $('#review-area').innerHTML = `<div class="review-card"><span class="eyebrow">${reviewIndex + 1} / ${reviewQueue.length} · 想一想它的意思</span>
    <div class="review-word" lang="${yue ? 'yue-Hant-HK' : 'en'}">${esc(isSentence ? (r.entry.exampleZh || r.word) : r.word)}</div>
    ${r.entry.jyutping ? `<div class="review-jyutping">${esc(r.entry.jyutping)}</div>` : ''}
    ${sayButton(isSentence ? r.word : r.word, yue ? 'yue' : 'en')}
    <div id="review-answer" hidden><div class="review-meaning">${esc(isSentence ? r.word : (r.entry.translation || ''))}</div>${r.entry.example && !isSentence ? `<div class="review-example" lang="${yue ? 'yue-Hant-HK' : 'en'}">${esc(r.entry.example)}${r.entry.exampleZh ? `<br>${esc(r.entry.exampleZh)}` : ''}</div>` : ''}<div class="review-buttons"><button data-grade="0">忘了</button><button data-grade="1">有点模糊</button><button data-grade="2">记得</button></div></div>
    <div><button id="reveal" class="primary" style="margin-top:24px">看看意思</button></div></div>`;
}
function grade(g) {
  const r = db.words[reviewQueue[reviewIndex]];
  r.level = g === 2 ? Math.min((r.level || 0) + 1, 5) : g === 1 ? Math.max((r.level || 0) - 1, 0) : 0;
  r.due = Date.now() + (g === 0 ? 10 / 1440 : g === 1 ? 1 : [1, 3, 7, 14, 30, 60][r.level]) * 86400000;
  r.lastReview = Date.now(); save(); reviewIndex++; renderReview();
}

/* ============================ 设置 / 数据 ============================ */
$('#accent').onchange = e => { db.prefs.accent = e.target.value; save(); };
$('#rate').onchange = e => { db.prefs.rate = Number(e.target.value); save(); };
$('#en-asr').onchange = e => { db.prefs.enAsr = e.target.value; save(); };
$('#test-en').onclick = () => speak('Hello, nice to meet you.', 'en');
$('#test-yue').onclick = () => speak('你好，好開心見到你。', 'yue');
$('#export-data').onclick = () => {
  const blob = new Blob([JSON.stringify({ version: 2, exported: new Date().toISOString(), words: db.words, prefs: db.prefs, chats: turns }, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `shuoshuo-shici-backup-${new Date().toISOString().slice(0, 10)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); toast('备份已导出。');
};
$('#import-data').onchange = async e => {
  try {
    const f = e.target.files[0]; if (!f) return; if (f.size > 20 * 1024 * 1024) throw Error();
    const data = JSON.parse(await f.text());
    if ((data.version !== 1 && data.version !== 2) || !data.words || typeof data.words !== 'object') throw Error();
    let n = 0;
    for (const [w, r] of Object.entries(data.words)) {
      if (!r || typeof r !== 'object' || !Number.isFinite(r.first) || !Number.isFinite(r.last)) continue;
      const old = db.words[w];
      const clean = { word: w, lang: r.lang === 'yue' ? 'yue' : 'en', kind: r.kind || 'word', count: Number.isSafeInteger(r.count) ? r.count : 1, first: r.first, last: r.last, events: Array.isArray(r.events) ? r.events.filter(Number.isFinite).slice(-500) : [], note: typeof r.note === 'string' ? r.note.slice(0, 4000) : '', level: 0, due: 0, entry: { translation: r.entry?.translation || '', phonetic: r.entry?.phonetic || '', jyutping: r.entry?.jyutping || '', example: r.entry?.example || '', exampleZh: r.entry?.exampleZh || '', exchange: r.entry?.exchange || '', source: r.entry?.source || '导入', exampleTranslations: r.entry?.exampleTranslations || {}, cantoneseTranslations: r.entry?.cantoneseTranslations || {} } };
      if (!old) { db.words[w] = clean; n++; }
      else { old.count = Math.max(old.count, clean.count); old.first = Math.min(old.first, clean.first); old.last = Math.max(old.last, clean.last); old.events = [...new Set([...old.events, ...clean.events])].sort((a, b) => a - b).slice(-500); if (!old.note) old.note = clean.note; n++; }
    }
    if (Array.isArray(data.chats) && !turns.length) turns = data.chats.slice(-200);
    save(); updateCounts(); renderMessages(); toast(`已合并 ${n} 条记录`);
  } catch { toast('无法导入，请选择有效的备份文件。'); }
  finally { e.target.value = ''; }
};
async function checkHealth() {
  const h = location.hostname;
  const isLocal = h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || /^192\.168\./.test(h) || /^10\./.test(h) || /^172\.(1[6-9]|2\d|3[01])\./.test(h);
  let configured = false, model = '';
  if (isLocal) { try { const r = await fetch('/api/health', { cache: 'no-store' }); if (r.ok) { const d = await r.json(); configured = !!d.configured; model = d.model || ''; } } catch {} }
  DEMO = !configured;
  $('#ai-status').textContent = DEMO ? '演示模式 · 离线预置语料 · 无需密钥' : `DeepSeek 已就绪 · ${model}`;
  const banner = $('#demo-banner'); if (banner) banner.hidden = !DEMO;
  const ex = $('#demo-examples');
  if (ex) { ex.hidden = !DEMO; if (DEMO && !ex.childElementCount) ex.innerHTML = DEMO_EXAMPLES.map((e, i) => `<button class="chip demo-chip" data-demo="${i}">${esc(e.label)}</button>`).join(''); }
  const note = $('#composer-note'); if (note && DEMO) note.textContent = '演示模式：回复来自离线预置语料，仅供体验流程；语音识别仍由浏览器提供。部署配置密钥后切换为 DeepSeek 实时生成。';
}

/* ============================ 记忆与画像 ============================ */
async function loadMemory() {
  const box = $('#memory-summary'); if (!box) return;
  try {
    const s = await requestAI('memory-state', {});
    box.textContent = `${DEMO ? '（演示）' : ''}今天 ${s.today.count} 轮全量记忆 · 已压缩 ${s.days.length} 天 · ${s.profile ? '画像已生成' : '画像待生成'}`;
    $('#memory-days').innerHTML = s.days.length
      ? s.days.slice(0, 7).map(d => `<div class="memory-day"><b>${esc(d.date)}</b><span>${d.turnsCount} 轮</span><p>${esc(d.summary)}</p></div>`).join('')
      : '<p class="muted">还没有跨天压缩记忆。跨天后今天会自动压缩归档。</p>';
    $('#profile-md').textContent = s.profileMd || '';
  } catch { box.textContent = '记忆服务未连接。'; }
}
$('#refresh-profile').onclick = async () => {
  if (busy) return; setBusy(true); toast('正在根据最近对话更新画像…');
  try { const r = await requestAI('profile-refresh', {}); $('#profile-md').textContent = r.profileMd; $('#profile-details').open = true; toast('画像已更新。'); loadMemory(); }
  catch (e) { toast(e.message); }
  finally { setBusy(false); }
};
$('#export-memory').onclick = async () => {
  try {
    const s = await requestAI('memory-state', {});
    const blob = new Blob([JSON.stringify({ version: 1, exported: new Date().toISOString(), ...s }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `shuoshuo-memory-${new Date().toISOString().slice(0, 10)}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); toast('记忆已导出。');
  } catch { toast('导出失败，请稍后再试。'); }
};

/* ============================ 事件绑定 ============================ */
document.addEventListener('click', e => {
  const b = e.target.closest('button,a.brand'); if (!b) return;
  if (b.matches('a.brand')) { e.preventDefault(); setView('chat'); return; }
  if (b.dataset.view) { setView(b.dataset.view); return; }
  if (b.dataset.word) { lookup(b.dataset.word); return; }
  if (b.dataset.open) { openRecord(b.dataset.open); return; }
  if (b.dataset.say) { speak(b.dataset.say, b.dataset.sayLang || 'en'); return; }
  if (b.dataset.cat) { selectedCategory = b.dataset.cat; libraryLimit = 60; $$('[data-cat]').forEach(c => c.classList.toggle('active', c === b)); renderLibrary(); return; }
  if (b.dataset.sort) { sort = b.dataset.sort; $$('[data-sort]').forEach(x => x.classList.toggle('selected', x === b)); renderHistory(); return; }
  if (b.dataset.lang) { setInputLang(b.dataset.lang); return; }
  if (b.dataset.demo !== undefined) { const e = DEMO_EXAMPLES[Number(b.dataset.demo)]; $('#input').value = e.text; setInputLang(e.lang); $('#input').focus(); return; }
  if (b.id === 'save-note' && current) { db.words[current].note = $('#word-note').value; save(); if (!storageBroken) toast('笔记已保存'); return; }
  if (b.id === 'reveal') { $('#review-answer').hidden = false; b.hidden = true; return; }
  if (b.dataset.grade !== undefined) { grade(Number(b.dataset.grade)); return; }
  if (b.id === 'review-anyway') { reviewQueue = Object.values(db.words).sort((a, b) => b.last - a.last).slice(0, 5).map(r => r.word); reviewIndex = 0; renderReview(); return; }
});
$('#search-form').addEventListener('submit', e => { e.preventDefault(); $('#word-input').blur(); lookup($('#word-input').value); });
$('#history-filter').addEventListener('input', renderHistory);
$('#organize').onclick = () => organize();
$('#input').addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); organize(); } });
bindHold($('#hold-yue'), () => beginCapture('input', 'yue', 'zh-HK'), endCapture);
bindHold($('#hold-en'), () => beginCapture('input', 'en', db.prefs.enAsr), endCapture);
window.addEventListener('storage', e => { if (e.key === KEY) { db = read(); turns = db.chats.slice(-200); updateCounts(); if (activeView === 'history') renderHistory(); } });
window.addEventListener('pagehide', () => { stopSpeech(); if (capture) { capture.recognition?.abort(); capture.stream.getTracks().forEach(t => t.stop()); } urls.forEach(u => URL.revokeObjectURL(u)); });

/* ============================ 初始化 ============================ */
setInputLang('en');
renderMessages();
renderLibrary();
updateCounts();
checkHealth();
setView('chat');