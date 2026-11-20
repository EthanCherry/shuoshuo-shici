// Subject and polarity are kept explicit: an adjective alone must never invent "I".
const raw=`心情感受|开心/高兴/happy|happy|happier|What made you feel that way?
心情感受|难过/sad|sad|sadder|Would you like to talk about what happened?
心情感受|紧张/nervous|nervous|more nervous|What are you nervous about?
心情感受|焦虑/anxious|anxious|more anxious|What's been on your mind?
心情感受|生气/angry|angry|angrier|What happened?
心情感受|失望/disappointed|disappointed|more disappointed|What were you hoping for?
心情感受|孤独/lonely|lonely|lonelier|Would you like to tell me about your day?
心情感受|无聊/bored|bored|more bored|Would you like to try something new?
心情感受|兴奋/excited|excited|more excited|What are you excited about?
心情感受|烦躁/irritated|irritated|more irritated|What's been bothering you?
心情感受|尴尬/embarrassed|embarrassed|more embarrassed|What happened?
心情感受|困惑/confused|confused|more confused|Which part feels unclear?
心情感受|担心/worried|worried|more worried|What's worrying you?
心情感受|放松/relaxed|relaxed|more relaxed|What's helped you unwind?
心情感受|自信/confident|confident|more confident|What's helped you feel that way?
心情感受|失落/down|down|more down|Would you like to talk about it?
心情感受|沮丧/frustrated|frustrated|more frustrated|What has been frustrating you?
身体状态|累/tired|tired|more tired|Have you had a long day?
身体状态|困/sleepy|sleepy|sleepier|Did you sleep well last night?
身体状态|饿/hungry|hungry|hungrier|What would you like to eat?
身体状态|渴/thirsty|thirsty|thirstier|What would you like to drink?
身体状态|冷/cold|cold|colder|Are you dressed warmly enough?
身体状态|热/hot|hot|hotter|Are you somewhere cool?
身体状态|头晕/dizzy|dizzy|dizzier|Are you somewhere you can sit down?
身体状态|虚弱/weak|weak|weaker|I'm sorry you're feeling that way. How long has it been going on?
工作职场|忙/busy|busy|busier|What has been keeping you busy?`;
export const states=raw.split('\n').map(r=>{const [category,aliases,adj,comparative,reply]=r.split('|');return {category,aliases:aliases.split('/'),adj,comparative,reply};});
export function generateStates(){const rows=[];for(const s of states){const add=(patterns,en,reply=s.reply)=>{const aliases=s.aliases.flatMap(z=>patterns.map(p=>p(z)));rows.push({category:s.category,zh:aliases[0],aliases,en,reply,source:'template'});};
 add([z=>`我很${z}`,z=>`我好${z}`,z=>`我觉得很${z}`,z=>`I feel ${z}`,z=>`我feel ${z}`],`I'm really ${s.adj}.`);
 add([z=>`我有点${z}`,z=>`我有一点${z}`,z=>`我觉得有点${z}`],`I'm a little ${s.adj}.`);
 add([z=>`我不${z}`,z=>`我一点也不${z}`,z=>`我一点都不${z}`],`I'm not ${s.adj}.`,'Thanks for clarifying. How are you feeling instead?');
 add([z=>`我今天很${z}`,z=>`今天我很${z}`,z=>`我今天好${z}`],`I'm really ${s.adj} today.`);
 add([z=>`我今天不${z}`,z=>`今天我不${z}`],`I'm not ${s.adj} today.`,'Thanks for clarifying. How has your day been?');
 add([z=>`我昨天很${z}`,z=>`昨天我很${z}`],`I was really ${s.adj} yesterday.`);
 add([z=>`我昨天不${z}`],`I wasn't ${s.adj} yesterday.`);
 add([z=>`我最近很${z}`,z=>`最近我很${z}`,z=>`我最近总是${z}`],`I've been feeling ${s.adj} lately.`);
 add([z=>`你${z}吗`,z=>`你${z}不${z}`,z=>`你会不会${z}`],`Are you ${s.adj}?`,"I don't have human feelings or physical sensations, but I'd like to hear how you're doing.");
 add([z=>`你今天${z}吗`,z=>`你今天${z}不${z}`],`Are you ${s.adj} today?`,"I'm here to practice with you. How are you feeling today?");
 for(const [zh,en,be] of [['他','He','is'],['她','She','is'],['他们','They','are'],['我们','We','are']]){
  add([z=>`${zh}很${z}`,z=>`${zh}好${z}`],`${en} ${be} really ${s.adj}.`,'What seems to be behind that feeling?');
  add([z=>`${zh}不${z}`],`${en} ${be==='is'?"isn't":"aren't"} ${s.adj}.`,'Thanks for explaining. What is the situation like?');
 }
 }return rows;}
