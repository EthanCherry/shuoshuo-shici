// Hand-authored everyday expressions. Each row: category | aliases | expression | reply.
const raw = `身体状态|我感觉自己感冒了/我好像感冒了/我感觉感冒了/我感冒了/感冒/coming down with a cold|I think I'm coming down with a cold.|That sounds uncomfortable. Are you getting enough rest?
身体状态|我一直流鼻涕/我流鼻涕/流鼻涕/runny nose/my nose keeps running|My nose keeps running.|That must be annoying. How are you feeling otherwise?
身体状态|我发烧了/我发烧/发烧/have a fever|I have a fever.|I'm sorry you're feeling unwell. Have you checked your temperature?
身体状态|我嗓子疼/我喉咙痛/嗓子疼/喉咙痛/sore throat|I have a sore throat.|That sounds uncomfortable. Does it hurt when you swallow?
身体状态|我一直咳嗽/我咳嗽/咳嗽/keep coughing|I keep coughing.|That sounds tiring. How long has it been going on?
身体状态|我头疼/我头痛/头疼/头痛/headache|I have a headache.|I'm sorry to hear that. Has it been bothering you all day?
身体状态|我肚子疼/我胃疼/肚子疼/胃疼/stomach hurts|My stomach hurts.|That sounds unpleasant. When did it start?
身体状态|我有点头晕/我头晕/头晕/dizzy|I feel a little dizzy.|I'm sorry you're feeling that way. Are you somewhere you can sit down?
身体状态|我不太舒服/我身体不舒服/身体不舒服/not feeling well|I'm not feeling very well.|I'm sorry to hear that. What's bothering you?
身体状态|我感觉好多了/我好多了/好多了/feel much better|I feel much better now.|I'm glad you're feeling better. What are you planning to do today?
身体状态|我想请病假/我要请病假/请病假/take a sick day|I need to take a sick day.|That makes sense. Have you let your manager know?
身体状态|我要去看医生/我想看医生/去看医生/看医生/see a doctor|I'm going to see a doctor.|I hope the appointment goes smoothly. Have you booked one yet?
身体状态|我过敏了/我过敏/过敏/allergies are acting up|My allergies are acting up.|That sounds frustrating. Do you know what's triggering them?
身体状态|我背疼/我腰疼/背疼/腰疼/back hurts|My back hurts.|That sounds uncomfortable. Have you been sitting for a long time?
作息休息|我昨晚没睡好/昨晚没睡好/没睡好/didn't sleep well|I didn't sleep well last night.|That's rough. Was it hard to fall asleep, or did you keep waking up?
作息休息|我昨晚熬夜了/我熬夜了/熬夜了/stayed up late|I stayed up late last night.|I know that feeling. What kept you up?
作息休息|我很困/我好困/我困了/好困/sleepy|I'm really sleepy.|Sounds like you could use some rest. Did you have a long day?
作息休息|我今天起晚了/我起晚了/起晚了/overslept|I overslept today.|Oh no! Did it throw off your morning plans?
作息休息|我想早点睡/我要早点睡/早点睡/go to bed early|I want to go to bed early tonight.|That sounds like a good plan. What time are you aiming for?
作息休息|我睡不着/睡不着/can't fall asleep|I can't fall asleep.|That's frustrating. Is something on your mind?
作息休息|我刚睡醒/刚睡醒/just woke up|I just woke up.|Good morning! How did you sleep?
作息休息|我想午睡/我要午睡/午睡/take a nap|I want to take a nap.|A short break sounds nice. Have you had a busy morning?
作息休息|我需要休息一下/我想休息一下/休息一下/need a break|I need a break.|Of course. What's been keeping you busy?
作息休息|我今天很累/我很累/我好累/好累/really tired|I'm really tired today.|Sounds like a long day. What wore you out?
工作职场|我今天工作太忙了/今天工作太忙了/我工作太忙了/工作太忙/忙了一天/work was really busy|Work was really busy today.|That sounds exhausting. What kept you so busy?
工作职场|我今天要加班/我又要加班了/我要加班/加班/work overtime|I have to work overtime today.|That's a long day. Do you know when you'll finish?
工作职场|我今天开了好多会/今天开了好多会/好多会/so many meetings|I had so many meetings today.|That can be draining. Did you get any time for your own work?
工作职场|我马上要开会/我要开会/要开会/have a meeting|I have a meeting coming up.|I hope it goes well. What is it about?
工作职场|我终于下班了/我下班了/下班了/finished work|I've finally finished work.|Nice! How are you going to spend the rest of your day?
工作职场|我今天在家办公/我在家办公/在家办公/working from home|I'm working from home today.|Sounds nice. Do you find it easier to focus at home?
工作职场|我想换工作/我要换工作/换工作/change jobs|I'm thinking about changing jobs.|That's a big decision. What would you like in your next role?
工作职场|我明天有面试/我有面试/明天面试/interview tomorrow|I have a job interview tomorrow.|Good luck! What kind of role are you interviewing for?
工作职场|我想请一天假/我想请假/请一天假/take a day off|I'd like to take a day off.|Do you have something planned, or do you just need a break?
工作职场|这个任务太难了/工作很难/任务太难/task is difficult|This task is really difficult.|What part is giving you the most trouble?
工作职场|我赶不上截止日期/来不及交/赶不上截止日期/miss the deadline|I'm worried I won't meet the deadline.|That sounds stressful. Is there anyone you can ask for help?
工作职场|我把工作做完了/我完成任务了/完成任务/finished the task|I've finished the task.|Well done! Was it as difficult as you expected?
学习英语|我不知道怎么用英语说/不知道怎么用英语说/don't know how to say|I don't know how to say this in English.|That's okay. Try describing what you mean in simple words.
学习英语|我想练英语/我想学英语/练英语/学英语/practice my English|I want to practice my English.|Great! What would you like to talk about today?
学习英语|我英语不太好/我的英语不好/英语不太好/English isn't very good|My English isn't very good yet.|That's okay. We can take it one sentence at a time.
学习英语|我没听懂/我听不懂/听不懂/didn't understand|I didn't understand what you said.|No problem. Would you like me to say it more simply?
学习英语|你能说慢一点吗/说慢一点/说慢点/speak more slowly|Could you speak a little more slowly?|Of course. I'll keep my sentences short and simple.
学习英语|你能再说一遍吗/再说一遍/repeat that|Could you say that again?|Of course. What would you like me to repeat?
学习英语|我忘了这个单词/忘了这个单词/忘记单词/forgot the word|I've forgotten the word for it.|It happens! Can you describe it in another way?
学习英语|我今天学了一个新单词/学了一个新单词/新单词/learned a new word|I learned a new word today.|Nice! What was the word?
学习英语|我明天有考试/我明天考试/明天考试/exam tomorrow|I have an exam tomorrow.|Good luck! How are you feeling about it?
学习英语|我作业还没写完/作业没写完/作业还没写完/homework yet|I haven't finished my homework yet.|What do you still need to work on?
吃饭饮食|我还没吃饭/我没吃饭/没吃饭/haven't eaten|I haven't eaten yet.|Are you getting hungry? What would you like to eat?
吃饭饮食|我刚吃完饭/我吃过饭了/我吃完饭了/吃完饭了/just eaten|I've just eaten.|Nice! What did you have?
吃饭饮食|我饿了/我好饿/好饿/hungry|I'm hungry.|What are you in the mood for?
吃饭饮食|我渴了/我好渴/好渴/thirsty|I'm thirsty.|What would you like to drink?
吃饭饮食|我想点外卖/我要点外卖/点外卖/order takeout|I want to order takeout.|Sounds easy. What kind of food are you craving?
吃饭饮食|我今天想自己做饭/我想做饭/自己做饭/cook at home|I want to cook at home today.|Sounds good! What are you thinking of making?
吃饭饮食|我不知道吃什么/不知道吃什么/don't know what to eat|I don't know what to eat.|Would you prefer something light or something filling?
吃饭饮食|我想喝咖啡/我要喝咖啡/喝咖啡/want some coffee|I'd like some coffee.|How do you usually take your coffee?
吃饭饮食|这家餐厅很好吃/这家店很好吃/很好吃/food is delicious|The food here is delicious.|That's great! What did you order?
吃饭饮食|这道菜太辣了/太辣了/太辣/too spicy|This dish is too spicy for me.|Oh no! Do you usually enjoy spicy food?
吃饭饮食|我吃太多了/吃太多了/吃撑了/ate too much|I ate too much.|It happens! Was the food especially good?
吃饭饮食|我想吃火锅/想吃火锅/吃火锅/hot pot|I'm craving hot pot.|That sounds delicious. Who would you like to go with?
吃饭饮食|我不喝咖啡/不喝咖啡/don't drink coffee|I don't drink coffee.|What do you usually drink instead?
吃饭饮食|我不吃辣/不吃辣/don't eat spicy food|I don't eat spicy food.|Got it. What kinds of flavors do you enjoy?
交通出行|我快迟到了/我要迟到了/快迟到了/running late|I'm running late.|Oh no! How much time do you have left?
交通出行|我堵在路上了/我堵车了/堵车/stuck in traffic|I'm stuck in traffic.|That's frustrating. Is it usually this busy?
交通出行|我没赶上地铁/我错过地铁了/没赶上地铁/missed the subway|I missed the subway.|That's annoying. How long until the next one?
交通出行|我没赶上公交/我错过公交了/没赶上公交/missed the bus|I missed the bus.|Oh no. Is there another way you can get there?
交通出行|我今天坐地铁/我坐地铁/坐地铁/taking the subway|I'm taking the subway today.|Where are you heading?
交通出行|我想打车/我要打车/打车/take a taxi|I want to take a taxi.|Where do you need to go?
交通出行|我在等车/等车/waiting for the bus|I'm waiting for the bus.|Has it been a long wait?
交通出行|我已经到了/我到了/已经到了/I've arrived|I've arrived.|Great! Was it easy to find the place?
交通出行|我在回家的路上/我正在回家/回家的路上/on my way home|I'm on my way home.|How was your day?
交通出行|我找不到路了/我迷路了/迷路/lost my way|I think I'm lost.|Where are you trying to go?
交通出行|我今天走路上班/走路上班/walking to work|I'm walking to work today.|That sounds nice. How long does the walk take?
交通出行|我手机快没电了/手机快没电了/手机没电了/phone is running out of battery|My phone is running out of battery.|Do you have a charger with you?
天气季节|今天下雨了/外面下雨了/下雨了/it's raining|It's raining today.|Did you bring an umbrella?
天气季节|我忘带伞了/忘带伞/forgot my umbrella|I forgot to bring an umbrella.|Oh no! Are you somewhere you can wait for the rain to stop?
天气季节|今天太热了/好热/天气很热/so hot today|It's so hot today.|It really can be uncomfortable. Are you spending much time outside?
天气季节|今天太冷了/好冷/天气很冷/so cold today|It's so cold today.|Are you staying warm?
天气季节|今天天气很好/天气真好/天气很好/weather is lovely|The weather is lovely today.|Perfect for getting outside. Do you have any plans?
天气季节|今天风很大/风很大/really windy|It's really windy today.|Is it making it difficult to get around?
天气季节|外面下雪了/今天下雪了/下雪了/it's snowing|It's snowing outside.|How lovely! Does it snow often where you live?
天气季节|今天很闷热/闷热/hot and humid|It's hot and humid today.|That can be uncomfortable. Do you have a cool place to relax?
心情感受|我今天很开心/我很开心/好开心/开心/really happy|I'm really happy today.|That's lovely to hear! What made you happy?
心情感受|我今天不开心/我不开心/不开心/not happy|I'm not feeling happy today.|I'm sorry to hear that. Would you like to talk about it?
心情感受|我有点难过/我很难过/难过/feeling sad|I'm feeling a little sad.|I'm here to listen. What happened?
心情感受|我有点焦虑/我很焦虑/焦虑/anxious|I'm feeling anxious.|That sounds hard. What's been on your mind?
心情感受|我有点紧张/我很紧张/紧张/nervous|I'm a little nervous.|That's understandable. What are you nervous about?
心情感受|我压力很大/压力太大/压力很大/stressed|I'm feeling really stressed.|That sounds difficult. What's causing the most stress?
心情感受|我觉得很无聊/我好无聊/无聊/bored|I'm bored.|Would you rather do something relaxing or try something new?
心情感受|我觉得很孤独/我很孤独/孤独/lonely|I'm feeling lonely.|That can be tough. Would you like to tell me about your day?
心情感受|我有点失望/我很失望/失望/disappointed|I'm disappointed.|I'm sorry. What were you hoping would happen?
心情感受|我很期待/好期待/期待/looking forward to it|I'm really looking forward to it.|That sounds exciting! What are you looking forward to?
心情感受|我生气了/我很生气/生气/angry|I'm upset.|What happened? I'm listening.
心情感受|我松了一口气/松了一口气/relieved|I feel relieved.|That's good to hear. What had you been worried about?
周末娱乐|我周末想去看电影/周末想去看电影/我想看电影/去看电影/want to see a movie|I want to see a movie this weekend.|Sounds fun! What kind of movie would you like to see?
周末娱乐|我周末不想出门/我不想出门/不想出门/don't feel like going out|I don't feel like going out.|A quiet day can be nice. What would you like to do at home?
周末娱乐|我周末想待在家/周末想待在家/周末宅家/stay home this weekend|I want to stay home this weekend.|Sounds relaxing. How would you like to spend your time?
周末娱乐|我最近在追剧/我在追剧/追剧/watching a TV series|I've been watching a TV series lately.|What are you watching? Would you recommend it?
周末娱乐|我想出去走走/出去走走/散步/go for a walk|I want to go for a walk.|That sounds nice. Do you have a favorite place to walk?
周末娱乐|我今天想打游戏/我想打游戏/打游戏/play video games|I want to play video games today.|Sounds fun! What do you like to play?
周末娱乐|我想听音乐/听音乐/listen to music|I want to listen to some music.|What kind of music are you in the mood for?
周末娱乐|我想去看演唱会/看演唱会/go to a concert|I want to go to a concert.|Whose concert would you like to see?
周末娱乐|我想读本书/我想看书/看书/read a book|I want to read a book.|What do you enjoy reading?
周末娱乐|我还没想好周末干什么/周末没计划/no plans for the weekend|I don't have any plans for the weekend yet.|Would you prefer to relax or go somewhere new?
旅行住宿|我想去旅行/我想出去旅游/去旅行/去旅游/want to travel|I want to go on a trip.|Where would you like to go?
旅行住宿|我想去海边/去海边/go to the beach|I want to go to the beach.|That sounds lovely. Do you prefer swimming or just relaxing by the water?
旅行住宿|我订好酒店了/我订了酒店/订好酒店/booked a hotel|I've booked a hotel.|Nice! What made you choose that one?
旅行住宿|我要订机票/我想订机票/订机票/book a flight|I need to book a flight.|Where are you flying to?
旅行住宿|我的航班延误了/航班延误/flight is delayed|My flight has been delayed.|That's frustrating. Have they told you how long the delay will be?
旅行住宿|我想办理入住/办理入住/check in please|I'd like to check in, please.|Of course. Do you have a reservation?
旅行住宿|我想退房/我要退房/退房/check out please|I'd like to check out, please.|Certainly. How was your stay?
旅行住宿|我行李丢了/我的行李不见了/行李丢了/luggage is missing|My luggage is missing.|That sounds stressful. Have you spoken to the baggage service desk?
旅行住宿|我想问一下洗手间在哪/洗手间在哪/厕所在哪/where is the restroom|Excuse me, where is the restroom?|If you're in a restaurant or station, a staff member can point you in the right direction.
旅行住宿|我想拍张照片/拍张照片/take a photo|I'd like to take a photo.|What would you like to take a photo of?
购物消费|我想买件衣服/我想买衣服/买衣服/buy some clothes|I want to buy some clothes.|What kind of clothes are you looking for?
购物消费|这个太贵了/太贵了/太贵/too expensive|This is too expensive.|What's your budget?
购物消费|这个多少钱/多少钱/how much is this|How much is this?|Which item are you asking about?
购物消费|我想试穿一下/试穿/try this on|Could I try this on?|Of course. What size do you usually wear?
购物消费|有没有大一点的/大一点的/larger size|Do you have this in a larger size?|Which size are you looking for?
购物消费|有没有小一点的/小一点的/smaller size|Do you have this in a smaller size?|Which size would you like to try?
购物消费|我想退货/我要退货/退货/return this|I'd like to return this.|What's the reason for the return?
购物消费|我的快递还没到/快递还没到/package hasn't arrived|My package hasn't arrived yet.|That's frustrating. When was it supposed to arrive?
购物消费|我今天收到快递了/我收到快递了/收到快递/package arrived|My package arrived today.|Nice! What did you order?
购物消费|我去超市买东西/我要去超市/去超市/go to the supermarket|I'm going to the supermarket.|What do you need to pick up?
购物消费|我想省点钱/我要省钱/省钱/save money|I want to save some money.|Do you have a particular goal in mind?
购物消费|我忘带钱包了/忘带钱包/forgot my wallet|I forgot my wallet.|Oh no! Do you have another way to pay?
朋友家人|我今天和朋友吃饭/我要和朋友吃饭/和朋友吃饭/dinner with friends|I'm having dinner with friends today.|That sounds nice. Where are you going?
朋友家人|我想约朋友出去/约朋友出去/meet up with a friend|I want to meet up with a friend.|What would you like to do together?
朋友家人|我和朋友吵架了/我跟朋友吵架了/和朋友吵架/argued with a friend|I had an argument with a friend.|I'm sorry. Would you like to talk about what happened?
朋友家人|我想家了/想家/homesick|I'm feeling homesick.|What do you miss most about home?
朋友家人|我想给妈妈打电话/给妈妈打电话/call my mom|I want to call my mom.|That sounds nice. Do you talk often?
朋友家人|今天是我生日/今天我生日/我生日/my birthday today|It's my birthday today.|Happy birthday! How are you celebrating?
朋友家人|我朋友要结婚了/朋友结婚/friend is getting married|My friend is getting married.|That's exciting! Will you be going to the wedding?
朋友家人|我很久没见朋友了/很久没见朋友/haven't seen my friends|I haven't seen my friends in a long time.|Do you think you could arrange a catch-up soon?
朋友家人|我想养一只猫/我想养猫/养猫/get a cat|I'd like to get a cat.|Cats can be lovely company. Have you had one before?
朋友家人|我带狗出去散步/我去遛狗/遛狗/walk my dog|I'm taking my dog for a walk.|Sounds nice! Does your dog have a favorite route?
居家生活|我要打扫房间/我想打扫房间/打扫房间/clean my room|I need to clean my room.|Would you like to start with one small area?
居家生活|我今天洗衣服/我要洗衣服/洗衣服/do the laundry|I need to do the laundry.|One of those everyday chores! Do you have much to wash?
居家生活|我不想洗碗/不想洗碗/don't want to wash the dishes|I don't feel like washing the dishes.|I know that feeling. Have you just finished cooking?
居家生活|我忘带钥匙了/忘带钥匙/forgot my keys|I forgot my keys.|Oh no! Is there anyone who has a spare?
居家生活|我家网络坏了/我家断网了/断网/internet isn't working|My internet isn't working.|That's annoying. Is it affecting all your devices?
居家生活|我家空调坏了/空调坏了/air conditioner is broken|My air conditioner isn't working.|That's inconvenient. Have you arranged to get it repaired?
居家生活|我想搬家/我要搬家/搬家/move to a new place|I want to move to a new place.|What are you looking for in your next home?
居家生活|邻居太吵了/邻居很吵/邻居太吵/neighbors are too noisy|My neighbors are too noisy.|That sounds frustrating. Is it happening often?
居家生活|我今天什么都不想做/什么都不想做/don't feel like doing anything|I don't feel like doing anything today.|Sounds like you need a slower day. Has it been a busy week?
居家生活|我忘记关灯了/我忘关灯了/忘关灯/forgot to turn off the lights|I forgot to turn off the lights.|It happens. Are you already far from home?
运动健康|我想去跑步/我要去跑步/去跑步/go for a run|I want to go for a run.|Sounds good! Do you have a usual route?
运动健康|我今天去健身房/我要去健身房/去健身房/go to the gym|I'm going to the gym today.|What are you planning to work on?
运动健康|我好久没运动了/好久没运动/haven't exercised|I haven't exercised in a while.|Would you like to start with something gentle?
运动健康|我想减肥/我要减肥/减肥/lose weight|I want to lose weight.|What kind of routine would feel sustainable for you?
运动健康|我昨天运动后肌肉酸痛/我肌肉酸痛/肌肉酸痛/muscles are sore|My muscles are sore after exercising.|Sounds like a tough workout. What did you do?
运动健康|我今天不想运动/不想运动/don't feel like exercising|I don't feel like exercising today.|That's okay. How is your energy level today?
运动健康|我想去游泳/去游泳/go swimming|I want to go swimming.|That sounds refreshing. Do you swim often?
运动健康|我想去爬山/去爬山/go hiking|I want to go hiking.|Sounds lovely. Do you have a trail in mind?
运动健康|我想少喝点奶茶/少喝奶茶/cut back on milk tea|I want to cut back on milk tea.|What would you like to drink instead?
日常交流|你好/hello/hi there|Hi!|Hi! How is your day going?
日常交流|早上好/good morning|Good morning!|Good morning! What are your plans for today?
日常交流|晚上好/good evening|Good evening!|Good evening! How was your day?
日常交流|谢谢你/谢谢/thank you/thanks|Thank you!|You're welcome! I'm happy to help.
日常交流|不好意思/对不起/sorry|I'm sorry.|That's okay. What happened?
日常交流|没关系/没事的/it's okay|It's okay.|Thanks for understanding.
日常交流|我不确定/不确定/not sure|I'm not sure.|That's okay. What are you trying to decide?
日常交流|我同意/我也是这么想的/I agree|I agree.|What makes you feel that way?
日常交流|我不同意/不同意/I disagree|I disagree.|I'd like to hear your perspective. What do you think?
日常交流|我不知道/不知道/I don't know|I don't know.|That's okay. What would you like to find out?
日常交流|等我一下/等一下/wait a moment|Give me a moment, please.|Of course. Take your time.
日常交流|我要走了/我先走了/have to go|I have to go now.|Of course. It was nice talking to you!
日常交流|晚安/good night|Good night!|Good night! Sleep well.
日常交流|明天见/see you tomorrow|See you tomorrow!|See you tomorrow! Have a good rest.
日常交流|你今天怎么样/how are you|How are you today?|I'm ready to chat with you. How is your day going?
日常交流|你喜欢什么/what do you like|What do you like?|I enjoy helping you put everyday experiences into English. What do you like doing?
日常交流|你在做什么/what are you doing|What are you doing?|I'm here to practice English with you. What are you up to?
日常交流|你能帮帮我吗/你能帮我吗/can you help me|Could you help me?|Of course. What do you need help with?`;
export const corpus = raw.split('\n').map((line,id)=>{const [category,aliases,en,reply]=line.split('|');return {id,category,aliases:aliases.split('/'),zh:aliases.split('/')[0],en,reply};});
export const categories = [...new Set(corpus.map(e=>e.category))];
export function normalize(text){return text.toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9\u4e00-\u9fff']/g,'');}
const ignorable=['我感觉自己','我觉得自己','我感觉','我觉得','就是说','什么什么的','然后','所以','但是','因为','今天','现在','自己','有一点','有点','真的','一直','非常','特别','了','啊','呢','呀','吧','我','because','and','but','so'];
export function extract(text){
 const source=text.trim(), norm=normalize(source); if(!norm)return {kind:'empty',entries:[],text:''};
 // English is preserved rather than pretending to correct unseen grammar.
 if(!/[\u4e00-\u9fff]/.test(source)) {const entry=corpus.find(e=>normalize(e.en)===norm)||corpus.filter(e=>e.aliases.some(a=>/^[a-z]/i.test(a)&&normalize(a).length>=5&&norm.includes(normalize(a)))).sort((a,b)=>normalize(b.en).length-normalize(a.en).length)[0];return {kind:'english',entries:entry?[entry]:[],text:source,partial:false,unmatched:''};}
 const matches=[];
 for(const entry of corpus) for(const alias of entry.aliases){const key=normalize(alias);let pos=norm.indexOf(key);while(key&&pos>=0){if(key.length>1)matches.push({entry,start:pos,end:pos+key.length,len:key.length});pos=norm.indexOf(key,pos+1);}}
 matches.sort((a,b)=>b.len-a.len||a.start-b.start);const chosen=[];
 for(const m of matches){if(!chosen.some(n=>m.start<n.end&&m.end>n.start))chosen.push(m);}
 chosen.sort((a,b)=>a.start-b.start);
 // Short social phrases inside a larger unmatched sentence are not a translation.
 const entries=chosen.map(m=>m.entry);let left=[...norm];for(const m of chosen)for(let i=m.start;i<m.end;i++)left[i]='';let unmatched=left.join('');for(const word of [...ignorable].sort((a,b)=>b.length-a.length))unmatched=unmatched.split(normalize(word)).join('');
 const unique=entries.filter((e,i)=>entries.findIndex(n=>n.id===e.id)===i);
 let output=unique.map(e=>e.en).join(' ');
 const because=norm.indexOf('because')>=0?norm.indexOf('because'):norm.indexOf('因为');
 if(unique.length===2&&chosen.length===2&&because>chosen[0].start&&because<chosen[1].start&&!/[?？!！]$/.test(unique[1].en))output=unique[0].en.replace(/[.!]$/,'')+', because '+unique[1].en[0].toLowerCase()+unique[1].en.slice(1);
 return {kind:unique.length?'matched':'unknown',entries:unique,text:output,partial:unmatched.length>0,unmatched};
}
export function replyFor(text){const result=extract(text);return result.entries[0]?.reply || "Thanks for sharing that. Could you tell me a little more about it?";}
export function wordMatch(reference,spoken){const words=t=>t.toLowerCase().replace(/[’‘]/g,"'").match(/[a-z]+(?:'[a-z]+)?|\d+/g)||[];const a=words(reference),b=words(spoken);if(!a.length||!b.length)return null;let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}return Math.max(0,Math.round((1-row[b.length]/Math.max(a.length,b.length))*100));}
