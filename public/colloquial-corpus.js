// Conversational alternatives and short exchanges absent from a simple scene/keyword list.
const raw=`天气穿着|天气变冷了/天气越来越冷了/天气越来越冷/天越来越冷了/气温降下来了/最近降温了/最近天气变冷了|It's getting colder.|Thanks for the heads-up. You keep warm too.
天气穿着|外面太冷了/外面太冷/外面好冷/外面很冷/外边很冷|It's too cold outside.|Are you somewhere you can keep warm?
身体状态|今天感冒好点了吗/感冒好点了吗/你感冒好点了吗|Is your cold any better today?|I don't get colds, but thank you for checking in. How are you feeling?
天气穿着|外面冷不冷/外面冷吗|Is it cold outside?|I can't check the weather directly. You could look at the local forecast.
天气穿着|衣服穿厚一点/衣服穿厚点/穿厚一点衣服/多穿件衣服/多穿一件/多加件衣服/多穿几件/穿暖和点/穿暖点|Dress warmly.|Thanks for looking out for me. You keep warm too!
天气穿着|我去拿件外套/我去拿外套/我去加件衣服|I'll grab a jacket.|That sounds useful if it's chilly.
天气穿着|我穿太少了/我衣服穿少了/穿少了|I'm not wearing enough layers.|Are you able to get a jacket?
天气穿着|我穿太多了/衣服穿多了|I'm wearing too many layers.|Can you take a layer off?
天气穿着|天气一会冷一会热/忽冷忽热/天气忽冷忽热|The weather keeps changing between hot and cold.|That can make it hard to decide what to wear.
天气穿着|这天气适合睡觉/下雨天适合睡觉|This is perfect weather for sleeping in.|A cozy day indoors sounds nice.
天气穿着|雨下了一整天/下了一天雨|It's been raining all day.|Have you had to go outside much?
天气穿着|风吹得我好冷/风吹得很冷|The wind is making me feel cold.|Could you find somewhere sheltered?
天气穿着|我鞋子湿了/鞋子淋湿了|My shoes got wet.|That's uncomfortable. Can you change into a dry pair?
天气穿着|我被雨淋湿了/我淋雨了/淋了一身雨|I got caught in the rain.|That sounds uncomfortable. Are you somewhere dry now?
吃饭饮食|我不饿/我一点也不饿/我一点都不饿|I'm not hungry.|No problem. You can eat when you feel like it.
吃饭饮食|我饱了/我吃饱了/已经吃饱了|I'm full.|Did you enjoy your meal?
吃饭饮食|我还想再吃一点/我还能再吃一点|I'd like a little more.|What would you like more of?
吃饭饮食|吃什么都行/我吃什么都可以/我不挑食|I'm not picky about food.|That makes choosing a meal easier.
吃饭饮食|这是什么味道/这吃起来什么味|What does this taste like?|Which food are you asking about?
吃饭饮食|有点太咸了/这道菜太咸了/太咸了|This is too salty.|Do you usually prefer lighter seasoning?
吃饭饮食|这个太甜了/太甜了/甜得发腻|This is too sweet for me.|Would you prefer something less sweet?
吃饭饮食|这汤真好喝/汤很好喝|This soup is delicious.|What kind of soup is it?
吃饭饮食|我吃不下了/我实在吃不下了|I can't eat any more.|No need to force yourself. Are you full?
吃饭饮食|我没什么胃口/没有胃口/我没胃口|I don't have much of an appetite.|Is it just today, or have you felt that way for a while?
吃饭饮食|要不要来一点/你要尝尝吗/要不要尝一口|Would you like to try some?|That's kind of you. I can't taste food, but I'd love to hear what it's like.
吃饭饮食|我想换换口味/今天想换个口味|I'd like to try something different.|What kind of food are you thinking of?
吃饭饮食|这附近有好吃的吗/附近有好吃的店吗|Are there any good places to eat nearby?|I don't have local listings. What kind of food would you like?
吃饭饮食|我去买点早餐/我去买早饭|I'll get some breakfast.|What would you like to have?
吃饭饮食|我忘了带饭/我没带午饭|I forgot to bring my lunch.|Will you get something nearby?
吃饭饮食|我带了自己做的饭/我带饭了|I brought a homemade lunch.|Nice! What did you make?
餐厅点单|能加点水吗/加点水/续杯水|Could I have some more water, please?|You can ask a member of staff for a refill.
餐厅点单|不要吸管/不需要吸管|I don't need a straw, thanks.|No problem.
餐厅点单|我要热的/要热的|I'd like it hot, please.|Got it. Anything else?
餐厅点单|我要冰的/要冰的|I'd like it iced, please.|Sure. How much ice would you like?
餐厅点单|我要中杯/中杯就行|I'd like a medium, please.|Got it. Anything else with that?
餐厅点单|我要大杯/大杯就行|I'd like a large, please.|Got it. What else would you like?
餐厅点单|我已经点好了/我点好了|I'm ready to order.|What would you like?
餐厅点单|我们还没想好/我们还没决定|We haven't decided yet.|Of course. Take your time.
餐厅点单|可以等一下再点吗/我们再看一下菜单|Could we have a little more time to decide?|Of course. Take your time.
餐厅点单|这个能做不辣的吗/可以做不辣吗|Could you make this without chili?|It's worth checking with the kitchen.
餐厅点单|能把酱汁分开放吗/酱汁分开|Could I have the sauce on the side?|That's a clear way to ask for it separately.
餐厅点单|我没有预订/我们没订位|I don't have a reservation.|You can ask whether any tables are available.
餐厅点单|可以拼桌吗/能拼桌吗|Would you mind sharing a table?|That's a polite way to ask.
作息休息|我想赖会床/我想赖床/不想起床|I don't feel like getting out of bed yet.|Is it a slow morning, or do you need to get going?
作息休息|我一晚上没睡/我通宵没睡/我整晚没睡|I didn't sleep at all last night.|That sounds exhausting. Are you able to rest today?
作息休息|我睡得很好/我昨晚睡得很好|I slept really well last night.|That's great. Do you feel refreshed?
作息休息|我最近睡眠不好/最近睡眠很差|I haven't been sleeping well lately.|That sounds tiring. Is something keeping you awake?
作息休息|我想调整作息/我作息乱了|I want to get my sleep schedule back on track.|What routine would you like to aim for?
作息休息|我越睡越困/睡完更困了|I feel even sleepier after sleeping.|That sounds frustrating. Did you sleep for a long time?
作息休息|我打算今晚早点睡/今晚想早点睡|I'm planning to go to bed early tonight.|Sounds good. Do you have an early start tomorrow?
身体状态|我浑身没劲/我全身没力气/浑身没力气|I feel weak all over.|I'm sorry you're feeling unwell. When did it start?
身体状态|我有点不舒服但没发烧/我不舒服但是没发烧|I don't feel well, but I don't have a fever.|I'm sorry you're feeling unwell. What else is bothering you?
身体状态|我感觉像要感冒了/我好像要感冒了|I feel like I'm coming down with a cold.|That's uncomfortable. How are you feeling?
身体状态|我最近老打哈欠/我一直打哈欠|I keep yawning.|Are you feeling sleepy?
身体状态|我嘴唇很干/嘴唇干裂了|My lips are really dry.|That sounds uncomfortable. Is the weather dry too?
身体状态|我脸上长痘了/我又长痘了|I've broken out in spots.|That can be frustrating. Has it happened suddenly?
身体状态|我晒伤了/皮肤晒伤了|I got sunburned.|That sounds uncomfortable. How are you feeling now?
身体状态|我被蚊子咬了/蚊子咬我了|I got bitten by mosquitoes.|That's annoying. Were you outside for long?
身体状态|我今天没发烧/我没有发烧/我没发烧|I don't have a fever.|Thanks for clarifying. How are you feeling otherwise?
身体状态|我不咳嗽/我没有咳嗽|I'm not coughing.|Good to know. What symptoms are bothering you?
身体状态|我去拿体检报告/我体检报告出来了|My checkup results are ready.|Are you going to discuss them with a doctor?
工作职场|今天又是忙碌的一天/今天忙得停不下来/我忙得不可开交|It's been a really busy day.|What has been keeping you busy?
工作职场|我手头还有好多事/我还有很多工作要做|I still have a lot of work to do.|What do you need to finish first?
工作职场|我马上就下班了/我快下班了|I'm about to finish work.|Nice. Do you have plans for the evening?
工作职场|我今天提前下班/我今天早下班|I'm finishing work early today.|That sounds nice. Do you have something planned?
工作职场|我工作还没做完/我还没干完活|I haven't finished my work yet.|What is left to do?
工作职场|我今天忙到没时间吃饭/忙得没空吃饭|I've been too busy to eat today.|That sounds like a tough day. Are you able to take a break now?
工作职场|同事帮了我很大的忙/同事帮了大忙|My colleague was a big help.|That's great. What did they help you with?
工作职场|我需要和老板聊聊/我想跟老板谈一下|I need to talk to my manager.|What would you like to discuss?
工作职场|我周一不想上班/又到周一了|I'm not looking forward to work on Monday.|What is making it feel difficult?
工作职场|我刚到公司/我到办公室了|I just got to the office.|How is your morning going?
工作职场|我在回邮件/我正在回复邮件|I'm catching up on emails.|Do you have many to get through?
工作职场|我电脑突然死机了/工作电脑死机了|My work computer suddenly froze.|That's frustrating. Did you lose any work?
工作职场|我需要再核对一下/我再检查一遍|I need to check it one more time.|Of course. It's worth making sure.
工作职场|这个得重新做/我得重做一遍|I need to do this again.|That's frustrating. What needs to change?
工作职场|今天会议取消了/会议取消了|The meeting has been canceled.|Does that free up some time for you?
工作职场|我被临时叫去开会/临时通知开会|I was called into a last-minute meeting.|Did it interrupt something important?
工作职场|我想申请在家办公/我想申请远程办公|I'd like to ask to work from home.|What would help you make the case for it?
学校学习|这段我看不懂/这段话我不懂|I don't understand this passage.|Which part is unclear?
学校学习|我记不住这个单词/单词老是记不住|I can't remember this word.|Would an example sentence help you remember it?
学校学习|我读得很慢/我阅读速度很慢|I read slowly.|What kind of material are you reading?
学校学习|我口语不太流利/我说英语不流利|I'm not very fluent in spoken English yet.|We can practice a little at a time. What would you like to say?
学校学习|我想练一下发音/我想练发音|I want to practice my pronunciation.|Which word or sentence would you like to try?
学校学习|我语法总是出错/我总是犯语法错误|I keep making grammar mistakes.|What kinds of mistakes are you noticing?
学校学习|我不知道怎么开始/我不知道从哪开始|I don't know where to start.|What's the task or goal?
学校学习|我想每天学一点/我打算每天学一点英语|I want to learn a little English every day.|That sounds manageable. What time of day works for you?
学校学习|我今天复习了昨天学的/我在复习昨天的内容|I'm reviewing what I learned yesterday.|That's a useful habit. What do you remember best?
学校学习|我上完课了/我刚下课|I just finished class.|How was it?
学校学习|我不想挂科/我担心考试不及格|I'm worried about failing the exam.|Which topics feel the hardest?
交通出行|公交车刚开走/公交车刚走/车刚走|The bus just left.|That's frustrating. How long until the next one?
交通出行|我快到家了/我马上到家了|I'm almost home.|Nice. Has it been a long journey?
交通出行|我还有一站就到了/再一站就到了|I have one more stop to go.|Thanks for the update.
交通出行|我坐反方向了/我坐错方向了|I'm going in the wrong direction.|Can you change direction at the next stop?
交通出行|我坐错车了/我上错车了|I got on the wrong bus.|Oh no. Can you get off safely at the next stop?
交通出行|我错过末班车了/没赶上末班车|I missed the last bus.|That's frustrating. Is there another way to get home?
交通出行|我打不到车/一直叫不到车|I can't get a taxi.|That's frustrating. Is there another option nearby?
交通出行|司机走错路了/司机开错路了|The driver took a wrong turn.|Have you been able to let the driver know?
交通出行|车还有多久到/车几分钟到|How long until the car arrives?|You can check the arrival estimate in the booking app.
交通出行|请把我送到这个地址/去这个地址|Could you take me to this address, please?|You can show the driver the address.
交通出行|这里可以下车吗/我想在这里下车|Could I get off here, please?|You can ask the driver to stop somewhere safe.
交通出行|我车钥匙找不到了/找不到车钥匙|I can't find my car keys.|Where did you last have them?
交通出行|我忘记车停哪了/我忘了停车的位置|I forgot where I parked.|Do you remember which entrance you used?
购物消费|这个质量不太好/质量不好|The quality isn't very good.|What seems wrong with it?
购物消费|我还想再比较一下/我再比比价格|I'd like to compare a few more options.|That makes sense. What matters most to you?
购物消费|我在网上买的/这是网购的|I bought it online.|Are you happy with it so far?
购物消费|这个颜色不适合我/颜色不太适合|This color doesn't suit me.|What color would you prefer?
购物消费|这个穿着很舒服/穿起来很舒服|This is really comfortable to wear.|That's a good sign. Does it fit well too?
购物消费|我想买个生日礼物/我想买生日礼物|I'd like to buy a birthday present.|Who is it for?
购物消费|我不知道送什么礼物/不知道送什么|I don't know what gift to get.|What does the person enjoy?
购物消费|能帮我包装一下吗/能包装成礼物吗|Could you gift-wrap this, please?|You can ask the cashier whether gift wrapping is available.
购物消费|我没有现金/我没带现金|I don't have any cash.|Do you have another way to pay?
购物消费|我可以手机支付吗/可以扫码吗|Can I pay with my phone?|You can ask the cashier which payment methods they accept.
购物消费|我付款码打不开/支付码打不开|I can't open my payment code.|That's frustrating. Do you have another way to pay?
购物消费|我忘了用优惠券/我忘用券了|I forgot to use my coupon.|That's annoying. Can the order still be changed?
约见安排|我有点事要处理/我有点事情|I have something to take care of.|No problem. Take your time.
约见安排|我在路上了/我已经出发了|I'm on my way.|Thanks for letting me know. Have a safe trip.
约见安排|我刚出门/我刚出发|I just left.|Thanks for the update.
约见安排|我可能赶不上/我可能来不及|I might not make it in time.|Thanks for letting me know. What would you like to do?
约见安排|我们下次再去/下次再去吧|Let's go another time.|Sure. We can find another day.
约见安排|我周末没空/这周末我没空|I'm not free this weekend.|No problem. Would another day work?
约见安排|我明天有空/我明天没事|I'm free tomorrow.|Would you like to make a plan?
约见安排|我明天没空/明天我没时间|I'm not free tomorrow.|No problem. When would work better?
约见安排|我到门口了/我在门口|I'm at the door.|Thanks for letting me know.
约见安排|我快到了/马上就到了/我马上到|I'm almost there.|Thanks for the update. No rush.
约见安排|稍微等我几分钟/再等我几分钟|Please give me a few more minutes.|Of course. Take your time.
约见安排|不好意思让你久等了/让你等这么久|Sorry to keep you waiting.|No problem. Thanks for letting me know.
约见安排|谢谢你等我/谢谢你愿意等|Thanks for waiting for me.|You're welcome.
朋友家人|我们好久没见了/好久不见|It's been a long time since we last met.|It's nice to catch up. How have you been?
朋友家人|你最近怎么样/最近过得如何|How have you been lately?|I'm here and ready to practice with you. How have you been?
朋友家人|我最近挺好的/最近还不错|I've been doing pretty well lately.|That's good to hear. What's been going well?
朋友家人|帮我给她带个话/帮我转告她|Could you pass a message on to her?|What would you like the message to say?
朋友家人|我跟家人吃了顿饭/我和家人吃饭了|I had a meal with my family.|That sounds nice. Was it a special occasion?
朋友家人|我周末回老家/周末回老家|I'm going back to my hometown this weekend.|Are you visiting family?
朋友家人|我想给家人买点东西/我想给爸妈买点东西|I'd like to get something for my family.|Do you have anything in mind?
朋友家人|我跟朋友聊了很久/和朋友聊了一晚上|I had a long chat with a friend.|It's nice to catch up. What did you talk about?
朋友家人|我今天陪孩子做作业/我在陪孩子写作业|I'm helping my child with homework.|What subject are they working on?
朋友家人|孩子今天不舒服/我孩子生病了|My child isn't feeling well today.|I'm sorry to hear that. How are they doing?
情绪想法|我也这么觉得/我也是这么觉得的|I feel the same way.|What makes you feel that way?
情绪想法|我不这么认为/我不是这么想的|I don't think so.|I'd like to hear your perspective.
情绪想法|我有点拿不定主意/我拿不定主意|I'm having trouble making up my mind.|What options are you considering?
情绪想法|我不想再想这件事了/我不想再考虑了|I don't want to think about it anymore.|That's understandable. Would you like to talk about something else?
情绪想法|我心情好多了/我情绪好多了|I'm feeling much better emotionally.|I'm glad to hear that. What helped?
情绪想法|我心里有点不舒服/我心情不太好|I'm feeling a little upset.|Would you like to talk about what's bothering you?
情绪想法|我有点舍不得/我舍不得离开|I'm finding it hard to say goodbye.|That sounds emotional. What will you miss most?
情绪想法|我已经尽力了/我尽力了|I did my best.|That matters. How do you feel about it now?
情绪想法|我想重新试一次/我想再试一次|I'd like to try again.|That's a good approach. What would you change this time?
情绪想法|我不想放弃/我还不想放弃|I don't want to give up.|What's motivating you to keep going?
情绪想法|我现在只想放空/我想放空一下|I just want to switch off for a while.|That's understandable. What helps you unwind?
情绪想法|我有点担心明天/我担心明天的事|I'm a little worried about tomorrow.|What is happening tomorrow?
情绪想法|我终于可以放松了/终于能松口气了|I can finally relax.|That must feel good. What did you finish?
情绪想法|这让我想起了以前/这勾起了回忆|This brings back memories.|What does it remind you of?
情绪想法|我觉得很值得/这很值得|I think it was worth it.|What made it worthwhile?
手机网络|我刚才没信号/刚才没信号|I didn't have a signal earlier.|No problem. Is the connection better now?
手机网络|我刚才在忙没看手机/刚才没看手机|I was busy and wasn't checking my phone.|No worries. How is your day going?
手机网络|我没看到你的来电/我没接到电话|I missed your call.|No problem. Is now a good time to talk?
手机网络|我给你回电话/我等下给你打回去|I'll call you back.|Sure. Take your time.
手机网络|你能开一下摄像头吗/打开摄像头|Could you turn on your camera?|You could ask the person on the call to turn it on.
手机网络|屏幕共享一下/你能共享屏幕吗|Could you share your screen?|You can ask the person on the call to share it.
手机网络|我把链接发给你/我发个链接给你|I'll send you the link.|Thanks. What is the link about?
手机网络|我手机快关机了/手机电量很低|My phone's battery is very low.|Do you have somewhere to charge it?
手机网络|我先挂了/我先挂电话了|I have to hang up now.|Of course. Talk to you later.
酒店住宿|我想住得离地铁近一点/我想找地铁附近的酒店|I'd like to stay somewhere near the subway.|That sounds convenient. Which area are you considering?
酒店住宿|房间太吵了/我的房间很吵|My room is too noisy.|You could ask reception whether a quieter room is available.
酒店住宿|我想要一间安静的房间/要安静一点的房间|I'd like a quiet room.|You can mention that when booking or checking in.
酒店住宿|这里能充电吗/有没有插座|Is there a power outlet I can use?|You can ask a staff member where to find one.
酒店住宿|行李能放这里吗/我可以放行李吗|Can I leave my luggage here?|You can ask the staff about luggage storage.
酒店住宿|附近有什么好玩的/这里有什么值得去的地方|What is there to do around here?|I don't have live local listings. What kinds of activities do you enjoy?
酒店住宿|我第一次来这里/我第一次来这|This is my first time here.|Welcome! What would you like to explore?
酒店住宿|我需要换一点钱/我想换点钱|I'd like to exchange some money.|You can check with an authorized exchange service or bank.
居家生活|家里没吃的了/家里没有吃的|There's nothing to eat at home.|Will you get groceries or order something?
居家生活|冰箱里还有什么/冰箱还有什么吃的|What's left in the fridge?|I can't see inside it, but you could check before deciding what to make.
居家生活|我把饭做糊了/饭烧糊了|I burned the food.|That's frustrating. What were you making?
居家生活|锅里还煮着东西/灶上还煮着东西|There's still something cooking on the stove.|Thanks for the reminder. Make sure someone is keeping an eye on it.
居家生活|我找不到遥控器/遥控器不见了|I can't find the remote.|Where did you last use it?
居家生活|我想把房间重新布置一下/我想重新布置房间|I'd like to rearrange my room.|What kind of layout are you thinking of?
居家生活|这屋里太闷了/房间太闷了|It's stuffy in here.|Would opening a window help?
居家生活|房东还没回复我/房东没回消息|My landlord hasn't replied yet.|How long has it been?
居家生活|我想找人修一下/我得找人来修|I need to get someone to fix it.|What needs repairing?
居家生活|我家的灯坏了/灯泡坏了|The light at home isn't working.|Is it just one light or several?
沟通请求|你刚才说什么/你说啥/刚说什么|What did you just say?|Would you like me to repeat it more slowly?
沟通请求|不是那个是这个/不是那个/我说的是这个|That's not the one I meant.|Thanks for clarifying. Which one did you mean?
沟通请求|差不多吧/大概是这样|Something like that.|Got it. Is there any detail you'd like to add?
沟通请求|我不太明白你的意思/我不太懂你的意思|I'm not quite sure what you mean.|Which part would you like me to explain?
沟通请求|我可以问你个问题吗/能问个问题吗|Can I ask you a question?|Of course. Go ahead.
沟通请求|这不太方便/恐怕不太方便|I'm afraid that's not convenient.|No problem. What would work better?
沟通请求|你先忙/你先忙你的/我不打扰你了|I'll let you get back to what you were doing.|Thanks. We can talk again later.
沟通请求|我一会儿回来/我马上回来/等我回来|I'll be back in a moment.|Sure. Take your time.
沟通请求|我去一下洗手间/我去趟厕所|I'm going to the restroom.|Of course. Take your time.
沟通请求|再给我一次机会/让我再试试|Could I have another try?|Of course. Go ahead.
沟通请求|我来帮你/让我帮你/要我帮忙吗|Let me help you.|That's kind of you. Thank you.
沟通请求|你先请/你先来/你先走|After you.|Thank you. That's very polite.
沟通请求|别客气/不用客气/不用这么客气|There's no need to be so formal.|Thanks. I appreciate it.
沟通请求|你说得对/你是对的|You're right.|What part do you agree with?
沟通请求|我不太确定这样行不行/我不知道这样行不行|I'm not sure this will work.|What are you concerned about?
沟通请求|我想听听你的意见/你有什么建议|I'd like to hear your thoughts.|Of course. What would you like my thoughts on?`;
export const colloquial=raw.split('\n').map(line=>{const [category,aliases,en,reply]=line.split('|');return {category,aliases:aliases.split('/'),zh:aliases.split('/')[0],en,reply,source:'authored'};});
