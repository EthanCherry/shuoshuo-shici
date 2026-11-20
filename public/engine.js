import {corpus as legacy,wordMatch} from './base-corpus.js';
import {authored,generateTemplates} from './expanded-corpus.js';
import {generateStates} from './state-templates.js';
import {generateObjects} from './object-templates.js';
import {colloquial} from './colloquial-corpus.js';
export {wordMatch};
export function normalize(text){return text.normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9\u4e00-\u9fff']/g,'');}
const mixedReplacements=[['order a coffee','买咖啡'],['take a break','休息'],['take a shower','洗澡'],['go to the gym','去健身房'],['have breakfast','吃早饭'],['go home','回家'],['because','因为'],['but','但是'],['and','而且'],['cold','冷'],['tired','累']];
export function canonical(text){let t=text.normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'");
 if(/[\u4e00-\u9fff]/.test(t))for(const [a,b] of mixedReplacements)t=t.replace(new RegExp(`\\b${a}\\b`,'gi'),b);
 t=t.replace(/\bi want to\s*/gi,'我想').replace(/\bi need to\s*/gi,'我需要').replace(/\bi feel\s*/gi,'我').replace(/\bi am\s*/gi,'我').replace(/\bi'm\s*/gi,'我').replace(/我feel\s*/gi,'我');
 return normalize(t).replace(/外边/g,'外面').replace(/明儿/g,'明天').replace(/今儿/g,'今天').replace(/昨儿/g,'昨天').replace(/咱们/g,'我们').replace(/待会儿/g,'等会').replace(/待会/g,'等会').replace(/一会儿/g,'一会').replace(/一点儿/g,'一点').replace(/周末的时候/g,'周末').replace(/出门的时候/g,'出门').replace(/今天晚上/g,'今晚').replace(/今天早晨/g,'今天早上').replace(/明天早晨/g,'明天早上').replace(/我感觉自己/g,'我').replace(/我感觉/g,'我').replace(/我觉得自己/g,'我').replace(/一直在/g,'一直').replace(/真的挺/g,'很').replace(/真的很/g,'很').replace(/有一点/g,'有点').replace(/好像有点/g,'有点').replace(/记得要/g,'记得').replace(/记着/g,'记得').replace(/记住要/g,'记得').replace(/千万别/g,'别').replace(/千万不要/g,'不要').replace(/麻烦你/g,'麻烦').replace(/能不能/g,'能').replace(/可不可以/g,'可以').replace(/[啊呀啦哦呐嗯呃]+/g,'');
}
const originalAuthored=[...authored,...colloquial];
const careRows=originalAuthored.filter(e=>/^(Wear|Dress|Remember|Be careful|Get some rest|Don't stay|Stay safe|Send me a message|Try not to worry|Don't push|Watch your step)/.test(e.en));
for(const e of careRows){const plain=[...e.aliases];for(const a of plain){const prefixes=/^(别|不要|不用)/.test(a)?['你']:/^记得/.test(a)?['你','你要','一定要','出门']:['你','你要','你得','你应该','要','记得','一定要','出门记得'];for(const prefix of prefixes)e.aliases.push(prefix+a);}}
const allRows=[...originalAuthored,...legacy.map(e=>({...e,source:'authored'})),...generateTemplates(),...generateStates(),...generateObjects()];
const categoryAliases={'日常作息':'作息休息','学校学习':'学习英语','天气季节':'天气穿着','心情感受':'情绪想法','旅行住宿':'酒店住宿','旅行出行':'交通出行','日常交流':'沟通请求','城市出行':'地点问路','购物物品':'购物消费','数量点单':'餐厅点单'};
for(const row of allRows)row.category=categoryAliases[row.category]||row.category;
const byEnglish=new Map();
for(const row of allRows){if(!row.en||!row.aliases?.length)throw new Error('Invalid corpus row');const k=normalize(row.en);const old=byEnglish.get(k);if(old)old.aliases.push(...row.aliases);else byEnglish.set(k,{...row,aliases:[...row.aliases]});}
const allEntries=[...byEnglish.values()];
const aliasIndex=new Map();
for(const e of allEntries)for(const alias of e.aliases){if(!/[\u4e00-\u9fff]/.test(alias))continue;const k=canonical(alias);if(k&&!aliasIndex.has(k))aliasIndex.set(k,e);}
const authoredKeys=new Set(originalAuthored.flatMap(a=>a.aliases.map(canonical)));
for(const e of allEntries.filter(e=>e.source==='template'))for(const alias of e.aliases){const k=canonical(alias);if(/^(我|你|他|她|我们|他们)/.test(k)&&!authoredKeys.has(k))aliasIndex.set(k,e);}
const englishIndex=new Map(allEntries.map(e=>[normalize(e.en),e]));
export const corpus=allEntries.map(e=>{const aliases=[...new Set(e.aliases)];const chinese=aliases.filter(a=>/[\u4e00-\u9fff]/.test(a)&&aliasIndex.get(canonical(a))===e);return chinese.length?{...e,aliases,zh:chinese.includes(e.zh)?e.zh:chinese[0]}:null;}).filter(Boolean).map((e,id)=>({...e,id}));
const publicByEnglish=new Map(corpus.map(e=>[normalize(e.en),e]));
for(const [k,e] of aliasIndex)aliasIndex.set(k,publicByEnglish.get(normalize(e.en))||e);
for(const [k,e] of englishIndex)englishIndex.set(k,publicByEnglish.get(k)||e);
export const categories=[...new Set(corpus.map(e=>e.category))];
export const stats={authored:corpus.filter(e=>e.source==='authored').length,templates:corpus.filter(e=>e.source==='template').length,aliases:aliasIndex.size};
const lengths=[...new Set([...aliasIndex.keys()].map(k=>k.length))].sort((a,b)=>b-a);
const connectors=[['因为','because'],['但是','but'],['不过','but'],['可是','but'],['而且','and'],['然后','then'],['所以','so'],['并且','and'],['还有','and']];
const fillers=['呢','吧','呀','啊','啦','了','的'];
function cap(s){return s?s[0].toUpperCase()+s.slice(1):s;}
function lower(s){return /^I(?:\b|'m|'ve|'ll|'d)/.test(s)?s:s[0].toLowerCase()+s.slice(1);}
function strip(s){return s.replace(/[.!]$/,'');}
function renderParts(parts){let text='';for(const p of parts){if(p.type==='connector'){if(text)text=strip(text)+', '+p.en+' ';continue;}if(p.type==='unknown')continue;if(!text)text=p.en;else if(/, (because|but|and|so|then) $/.test(text))text+=lower(p.en);else text+=' '+p.en;}return cap(text.trim());}
function matchNormalized(norm){
 const cache=new Map();
 function visit(pos){if(pos===norm.length)return {cost:0,parts:[],count:0};if(cache.has(pos))return cache.get(pos);
  const rest=norm.slice(pos);const options=[];
  for(const len of lengths){if(len>rest.length)continue;const key=rest.slice(0,len);const entry=aliasIndex.get(key);if(entry){const tail=visit(pos+len);options.push({cost:tail.cost,parts:[{type:'entry',entry,en:entry.en,matched:key},...tail.parts],count:tail.count+1});}}
  for(const [zh,en] of connectors)if(rest.startsWith(zh)){const tail=visit(pos+zh.length);options.push({cost:tail.cost+.01,parts:[{type:'connector',en},...tail.parts],count:tail.count});}
  if(fillers.includes(rest[0])&&(rest.length===1||connectors.some(([z])=>rest.slice(1).startsWith(z)))){const tail=visit(pos+1);options.push({...tail,cost:tail.cost+.03});}
  const tail=visit(pos+1);options.push({cost:tail.cost+10,parts:[{type:'unknown',text:rest[0]},...tail.parts],count:tail.count});
  options.sort((a,b)=>a.cost-b.cost||a.count-b.count);const best=options[0];cache.set(pos,best);return best;
 }return visit(0);
}
const fallback="Thanks for sharing that. Could you tell me a little more about it?";
export function extract(input){
 const source=String(input).trim();if(!source)return {kind:'empty',entries:[],text:'',partial:false,unmatched:''};
 if(!/[\u4e00-\u9fff]/.test(source)){const entry=englishIndex.get(normalize(source));return {kind:'english',entries:entry?[entry]:[],text:source,partial:false,unmatched:'',segments:[]};}
 if(source.length>1200)return {kind:'unknown',entries:[],text:'',partial:true,unmatched:source,segments:[]};
 const norm=canonical(source);const exact=aliasIndex.get(norm);if(exact)return {kind:'matched',entries:[exact],text:exact.en,partial:false,unmatched:'',segments:[{source,en:exact.en,status:'matched'}]};
 const clauses=source.split(/[，,。；;！!？?\n]+/).map(t=>t.trim()).filter(Boolean);
 const pieces=[],segments=[];let totalUnknown='';
 for(const clause of clauses){const n=canonical(clause);const r=matchNormalized(n);const unknown=r.parts.filter(p=>p.type==='unknown').map(p=>p.text).join('');
  const matchedParts=r.parts.filter(p=>p.type==='entry');
  const unsafe=/(不|没|别|非|如果|假如|要是)/.test(unknown)||(/^(你|他|她|我们|咱们)/.test(n)&&r.parts[0]?.type==='unknown')||(/[吗么]$/.test(n)&&(matchedParts.length!==1||!matchedParts[0].en.endsWith('?')));
  const safeParts=unsafe?r.parts.map(p=>p.type==='entry'?{type:'unknown',text:p.matched}:p):r.parts;
  totalUnknown+=unsafe?n:unknown;
  const text=renderParts(safeParts);segments.push({source:clause,en:text,status:unknown||unsafe?'partial':'matched',unmatched:unknown});pieces.push(...safeParts);
 }
 const text=renderParts(pieces),entries=pieces.filter(p=>p.type==='entry').map(p=>p.entry);
 return {kind:entries.length?'matched':'unknown',entries,text,partial:!!totalUnknown,unmatched:totalUnknown,segments};
}
export function replyFor(text){
 const exact=englishIndex.get(normalize(text));if(exact)return exact.reply;
 const lowerText=text.toLowerCase();
 if(/wear something warm|wear a jacket|keep warm|take an umbrella|catch a cold/.test(lowerText))return 'Thanks for looking out for me. You take care of yourself too!';
 if(/\bif\b/.test(lowerText)&&/rain/.test(lowerText))return 'That sounds like a sensible plan. What would you like to do instead?';
 for(const sentence of text.match(/[^.!?]+[.!?]?/g)||[]){const e=englishIndex.get(normalize(sentence.trim()));if(e)return e.reply;}
 const becauseParts=text.split(/,?\s+because\s+/i);if(becauseParts.length>1){const e=englishIndex.get(normalize(becauseParts[0]));if(e)return e.reply;}
 return fallback;
}
export function suggestExpressions(input,limit=5){
 const key=canonical(input);if(!key)return [];const grams=t=>{const set=new Set();for(let i=0;i<t.length-1;i++)set.add(t.slice(i,i+2));return set;};const target=grams(key);
 return corpus.filter(e=>e.source==='authored').map(e=>{let score=0;for(const a of e.aliases){const g=grams(canonical(a));let common=0;for(const x of g)if(target.has(x))common++;score=Math.max(score,common/Math.max(2,Math.sqrt(target.size*g.size)));}return {entry:e,score};}).filter(x=>x.score>.2).sort((a,b)=>b.score-a.score).slice(0,limit).map(x=>x.entry);
}
