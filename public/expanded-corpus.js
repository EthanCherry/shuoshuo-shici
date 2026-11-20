// Original authored bilingual examples, organized using public A2/B1 topic and speech-act taxonomies.
// Reference frameworks are documented in research/research-notes.md; sentences are not scraped datasets.
const raw=`居家生活|能把窗户关上吗/能关一下窗户吗/关一下窗户/把窗户关上/帮我关窗/关窗户|Could you close the window, please?|You can ask someone nearby to close it for you.
居家生活|能把窗户打开吗/能开一下窗户吗/开一下窗户/把窗户打开/帮我开窗/开窗户|Could you open the window, please?|You can ask someone nearby to open it for you.
居家生活|我准备好了/准备好了|I'm ready.|Great. What would you like to do next?
天气穿着|天气冷了/天冷了/降温了/变冷了/开始冷了|It's getting colder.|Thanks for the reminder. I'll keep warm.
天气穿着|外面有点凉/外面凉了/有点凉/有点凉快|It's a little chilly outside.|Thanks for letting me know. Is it windy as well?
天气穿着|天气预报说要降温/预报说要降温/天气预报说明天降温|The forecast says it's going to get colder.|Thanks for the heads-up. I'll dress warmly.
天气穿着|今天比昨天冷/今天比昨天还冷|It's colder today than it was yesterday.|It sounds like a day for an extra layer.
天气穿着|今天比昨天热/比昨天热|It's hotter today than it was yesterday.|Are you staying somewhere cool?
天气穿着|明天会不会下雨/明天会下雨吗/明天下雨吗|Will it rain tomorrow?|I don't have live weather information. You could check your local forecast.
天气穿着|今天多少度/今天气温多少/现在几度/现在多少度|What's the temperature today?|I don't have live weather data. Your weather app should have the current temperature.
天气穿着|天气怎么样/今天天气怎么样/外面天气如何|What's the weather like?|I can't check live weather here. What's it like where you are?
天气穿着|雨停了/不下雨了/雨已经停了|It has stopped raining.|That's good. Are you thinking of going outside?
天气穿着|雨越来越大了/雨下大了|The rain is getting heavier.|Are you somewhere dry?
天气穿着|快下雨了/看起来要下雨了/好像要下雨了|It looks like it's going to rain.|It might be worth taking an umbrella.
天气穿着|今天阴天/今天阴沉沉的|It's cloudy today.|Does it look like it might rain?
天气穿着|太阳出来了/出太阳了|The sun has come out.|That's nice! Are you going outside?
天气穿着|太阳太晒了/太晒了/阳光好强|The sun is really strong.|Are you planning to stay outside for long?
天气穿着|空气质量不好/空气很差|The air quality is poor.|Are you staying indoors today?
天气穿着|天气好干/天气很干燥/空气太干了|The air is really dry.|Does it feel uncomfortable indoors too?
天气穿着|早晚温差大/早晚温差很大|There's a big temperature difference between day and night.|An extra layer could come in handy.
天气穿着|我觉得有点冷/我有点冷/我感觉冷/我好冷|I feel a little cold.|Would an extra layer help?
天气穿着|我不冷/我一点都不冷/我一点也不冷|I'm not cold at all.|Good to know. Are you comfortable where you are?
天气穿着|你冷不冷/你冷吗/你会不会冷|Are you cold?|I don't feel temperature, but thanks for asking.
天气穿着|多穿衣服/多穿点衣服/多穿一点/多穿点/穿暖一点/穿暖和一点/穿厚一点/穿厚点/穿多点/注意保暖|Wear something warm.|Thanks for looking out for me. You keep warm too!
天气穿着|你记得加件外套/记得加件外套/加件外套/穿件外套/记得穿外套/穿外套/带件外套|Remember to wear a jacket.|Thanks for the reminder. I'll keep that in mind.
天气穿着|别感冒/不要感冒/小心着凉/别着凉/当心着凉|Be careful not to catch a cold.|Thanks for caring. Take care of yourself too.
天气穿着|出门记得带伞/出门带伞/记得带伞/别忘带伞/带上雨伞/带把伞/带伞|Remember to take an umbrella.|Thanks for the reminder. You stay dry too!
天气穿着|涂点防晒霜/记得涂防晒/涂防晒/做好防晒/涂防晒霜|Put on some sunscreen.|That's a useful reminder for a sunny day.
天气穿着|空调开得太低了/空调温度太低了/空调好冷|The air conditioning is too cold.|Would you like to turn it down a little?
天气穿着|把空调调高一点/空调调高点|Could you turn the temperature up a little?|You could ask someone near the controls to adjust it.
天气穿着|这件外套很暖和/这件衣服很暖和|This jacket is really warm.|Sounds perfect for a chilly day.
天气穿着|我忘穿外套了/我没带外套|I forgot to bring a jacket.|That's frustrating. Are you able to get somewhere warm?
天气穿着|今天有点cold|It's a little cold today.|Are you dressed warmly enough?
关心提醒|记得多喝水/多喝点水/多喝水/喝点水/补充水分|Remember to drink plenty of water.|Thanks for the reminder. Take care of yourself too.
关心提醒|早点休息/早点休息吧/好好休息/你早点睡/早点睡觉|Get some rest.|Thanks. I hope you get some rest too.
关心提醒|别熬夜了/不要熬夜/别熬夜|Don't stay up too late.|Thanks for looking out for me.
关心提醒|路上注意安全/路上小心/注意安全/开车小心/开车慢点/一路平安|Stay safe on your way.|Thank you. Take care too!
关心提醒|到家给我发消息/到家了告诉我/到了告诉我/到家报个平安|Send me a message when you get home.|That's thoughtful. Thanks for checking in.
关心提醒|你别太担心/别太担心/别担心/不用担心/不要担心|Try not to worry too much.|Thanks. Talking about it helps.
关心提醒|别忘了锁门/记得锁门/别忘记锁门/记得把门锁好|Don't forget to lock the door.|Thanks for reminding me.
关心提醒|别忘了关灯/记得关灯|Don't forget to turn off the lights.|Thanks. That's easy to overlook.
关心提醒|小心烫/小心烫嘴/当心烫|Careful, it's hot.|Thanks for warning me.
关心提醒|慢慢吃/吃慢点/吃饭慢点|Take your time eating.|Thanks. There's no rush.
关心提醒|慢慢来/别着急/不要急/不着急/不用着急|Take your time. There's no rush.|Thank you. I appreciate that.
关心提醒|别太累了/别把自己累坏了/不要太辛苦|Don't push yourself too hard.|Thanks for caring. You take care too.
关心提醒|早点回来/别太晚回来|Come back early.|Thanks for checking in.
关心提醒|小心台阶/注意台阶|Watch your step.|Thanks for the heads-up.
关心提醒|路很滑/地上很滑|It's slippery.|Thanks for warning me. Be careful too.
餐厅点单|我还没吃早饭/我没吃早餐/我没吃早饭/还没吃早饭/没吃早饭/没吃早餐|I haven't had breakfast yet.|Are you planning to have something now?
餐厅点单|你吃饭了没/你吃饭了吗/吃饭了吗/吃了没/吃过饭了吗|Have you eaten yet?|I don't eat, but thanks for asking. Have you had something?
餐厅点单|中午一起吃饭吗/一起吃午饭吧/一起吃午饭吗/午饭一起吃吗|Would you like to have lunch together?|That sounds like a nice plan. Where would you like to go?
餐厅点单|晚上想吃清淡一点/晚饭想吃清淡点/想吃清淡一点/想吃清淡点|I'd like something light for dinner.|What kind of light meal are you in the mood for?
餐厅点单|我想要一份菜单/给我一份菜单/能看看菜单吗/菜单给我看看/菜单/拿个菜单|Could I see the menu, please?|Sure. What kind of food are you looking for?
餐厅点单|不要放香菜/别放香菜/不加香菜/不要香菜|No cilantro, please.|Got it. Any other ingredients you don't want?
餐厅点单|不要放葱/不要葱/不加葱|No green onions, please.|Got it. Is there anything else you'd like to leave out?
餐厅点单|不要辣/微辣就好/少放点辣/少辣|Just a little spice, please.|Sure. Mild sounds good.
餐厅点单|少放点盐/少盐/少放盐|Less salt, please.|Got it. Is there anything else you'd like adjusted?
餐厅点单|少放点糖/少糖/少放糖/less sugar|Less sugar, please.|Got it. Do you have any other preferences?
餐厅点单|不要糖/不加糖/无糖/no sugar|No sugar, please.|Got it. Anything else?
餐厅点单|少放点冰/少冰/少点冰/less ice|Less ice, please.|Sure. Do you have any other preferences?
餐厅点单|不要冰/去冰/不加冰/no ice|No ice, please.|Got it. Anything else you'd like?
餐厅点单|帮我带杯拿铁/帮我带一杯拿铁/给我带杯拿铁|Could you get me a latte, please?|Would you like it hot or iced?
餐厅点单|我想要一杯拿铁/我要一杯拿铁/来杯拿铁|I'd like a latte, please.|Would you like it hot or iced?
餐厅点单|这杯咖啡有点苦/咖啡太苦了/咖啡有点苦|This coffee is a little bitter.|Do you usually prefer a milder coffee?
餐厅点单|我对花生过敏/花生过敏|I'm allergic to peanuts.|Thanks for letting me know. Make sure the staff know too.
餐厅点单|我对海鲜过敏/海鲜过敏|I'm allergic to seafood.|It's important to let the restaurant staff know.
餐厅点单|我乳糖不耐受/乳糖不耐受|I'm lactose intolerant.|Would you prefer a dairy-free option?
餐厅点单|我不吃牛肉/不吃牛肉|I don't eat beef.|Got it. What would you like instead?
餐厅点单|我不吃猪肉/不吃猪肉|I don't eat pork.|Got it. Do you have a preferred alternative?
餐厅点单|我是素食者/我吃素/吃素|I'm vegetarian.|What kinds of vegetarian dishes do you enjoy?
餐厅点单|这份给我打包吧/帮我打包/我要打包/这份打包/打包带走|Could I have this to go, please?|Of course. Is that everything you'd like to take?
餐厅点单|我在这里吃/在这吃/堂食|I'll eat here.|Got it. Would you like something to drink as well?
餐厅点单|麻烦结一下账/麻烦结账/结一下账/买单/结账/请给我账单|Could I have the bill, please?|You can ask a member of staff for the bill.
餐厅点单|我们AA吧/我们aa吧/咱们AA/咱们aa/各付各的/平摊账单|Let's split the bill.|That sounds fair.
餐厅点单|这顿我请/我请客/我来买单|This one's on me.|That's very kind of you. Thank you!
餐厅点单|我想要一杯水/给我一杯水/来杯水|Could I have a glass of water, please?|Would you prefer still or sparkling water?
餐厅点单|有推荐的菜吗/有什么推荐/推荐什么菜|What would you recommend?|What flavors do you usually enjoy?
餐厅点单|这是什么做的/这里面有什么/有什么配料|What's in this dish?|Which dish are you asking about?
餐厅点单|我们点的菜还没上/怎么还没上菜/菜还没上|Our food hasn't arrived yet.|That's frustrating. How long have you been waiting?
餐厅点单|这不是我点的/你上错菜了/上错菜了|This isn't what I ordered.|You could politely let the server know what you ordered.
餐厅点单|饭凉了/菜凉了/食物凉了|The food has gone cold.|Would you like to heat it up?
餐厅点单|我去热一下/我热一下/热一下饭|I'll heat it up.|That should make it nicer to eat.
餐厅点单|这家店排队的人好多/排队的人好多/队伍好长/排好长的队|The queue is really long.|Do you want to wait or try somewhere else?
餐厅点单|两个人有位置吗/两位有位置吗/有两个人的位置吗|Do you have a table for two?|Have you made a reservation?
餐厅点单|可以靠窗坐吗/我想坐窗边|Could we sit by the window?|You could ask the server whether a window table is available.
餐厅点单|我想吃面条/想吃面条/想吃面|I'd like some noodles.|What kind of noodles are you in the mood for?
餐厅点单|我不想吃米饭/不想吃米饭|I don't want rice.|What would you like instead?
作息休息|我昨天睡得很晚/我昨晚睡得很晚/昨天睡得很晚/昨晚睡得很晚|I went to bed late last night.|What kept you up?
作息休息|今天早上差点起不来/早上差点起不来|I could barely get up this morning.|Did you have a late night?
作息休息|我最近总是失眠/最近总是失眠/我最近失眠/我经常失眠|I've been having trouble sleeping lately.|That sounds tiring. What's been on your mind?
作息休息|我想再睡五分钟/再睡五分钟/让我再睡五分钟|I'd like five more minutes of sleep.|Sometimes getting up is the hardest part of the morning.
作息休息|我得洗个澡再睡/我要先洗澡再睡觉/洗个澡再睡|I need to take a shower before bed.|That sounds like a relaxing way to end the day.
作息休息|我今天一点也不累/我今天一点都不累/我一点也不累/我一点都不累/我不累|I'm not tired at all today.|Sounds like you have plenty of energy. What are your plans?
作息休息|我做噩梦了/我昨晚做噩梦/做噩梦了|I had a nightmare.|That sounds unsettling. Are you feeling okay now?
作息休息|我被吵醒了/被吵醒了|I was woken up by a noise.|That's frustrating. Were you able to get back to sleep?
作息休息|我忘记定闹钟了/我忘设闹钟/忘了定闹钟|I forgot to set my alarm.|Oh no. Did you manage to wake up on time?
作息休息|我今天醒得很早/我醒得很早|I woke up early today.|Was that planned, or did you wake up naturally?
作息休息|我睡过头了/睡过头了|I overslept.|Did you end up running late?
身体状态|我感冒还没好/我的感冒还没好/感冒还没好|I haven't gotten over my cold yet.|I'm sorry you're not feeling better yet. How are you doing today?
身体状态|我不是感冒是过敏/不是感冒是过敏/不是感冒，是过敏|It's not a cold. It's allergies.|Thanks for clarifying. Are they bothering you a lot today?
身体状态|我没有感冒/我没感冒/我不是感冒|I don't have a cold.|Glad to hear it. How are you feeling otherwise?
身体状态|你今天感觉好点了吗/你感觉好点了吗/你好点了吗/好点了吗|Are you feeling any better today?|I don't get sick, but thanks for checking on me. How are you feeling?
身体状态|我嗓子痒/我喉咙痒/嗓子痒/喉咙痒|My throat feels itchy.|That sounds irritating. Has it been bothering you for long?
身体状态|一直想咳嗽/总想咳嗽|I keep feeling the urge to cough.|That sounds uncomfortable. Is your throat bothering you too?
身体状态|我预约了明天的牙医/我约了明天看牙/明天去看牙医|I have a dentist appointment tomorrow.|I hope it goes smoothly. Is it a checkup?
身体状态|我忘了吃药/我忘记吃药了/忘记吃药/忘了吃药|I forgot to take my medicine.|You could check the instructions or ask a pharmacist what to do about a missed dose.
身体状态|我想量一下体温/量一下体温/量体温|I'd like to check my temperature.|Do you have a thermometer available?
身体状态|我扭到脚了/我扭伤脚了/扭到脚/崴脚了|I twisted my ankle.|That sounds painful. Are you able to get it checked if you need to?
身体状态|我牙疼/我牙痛/牙疼/牙痛|I have a toothache.|That sounds painful. Have you arranged to see a dentist?
身体状态|我恶心想吐/我想吐/我有点恶心|I feel nauseous.|I'm sorry you're feeling unwell. When did it start?
身体状态|我拉肚子了/我腹泻了/拉肚子|I have diarrhea.|I'm sorry you're feeling unwell. Are you able to rest?
身体状态|我鼻子堵了/鼻塞/鼻子不通气|My nose is blocked.|That sounds uncomfortable. Is it making it hard to sleep?
身体状态|我一直打喷嚏/一直打喷嚏/老打喷嚏|I keep sneezing.|That sounds annoying. Has it been happening all day?
身体状态|我眼睛不舒服/我眼睛酸/眼睛酸|My eyes feel sore.|Have you been looking at a screen for a long time?
身体状态|我脖子疼/我颈椎疼/脖子疼|My neck hurts.|That sounds uncomfortable. Have you been sitting in one position for a while?
身体状态|我手指划破了/我切到手了/手划破了|I cut my finger.|That sounds painful. Are you able to get it cleaned and checked if needed?
身体状态|我今天去体检/我要去体检/去体检|I'm having a medical checkup today.|I hope everything goes smoothly.
身体状态|我已经退烧了/我退烧了/退烧了|My fever has gone down.|I'm glad to hear that. How are you feeling now?
工作职场|我今天不想加班/我不想加班/不想加班|I don't want to work overtime today.|I understand. What would you rather do after work?
工作职场|老板让我改了三遍/老板叫我改了三次/老板让我改三遍|My boss asked me to revise it three times.|That sounds frustrating. Were the instructions clear?
工作职场|会议改到下午了/会议挪到下午了/开会改下午了|The meeting has been moved to the afternoon.|Does the new time work for you?
工作职场|我马上把文件发给你/我等下把文件发你/我把文件发给你|I'll send you the file shortly.|Thanks. Which file are you sending?
工作职场|麻烦把这个发我邮箱/发我邮箱/发到我邮箱/邮件发给我|Could you send it to me by email?|Sure. What would you like included?
工作职场|这个任务今天必须做完/这个任务得今天完成/今天必须做完|This task has to be finished today.|Is there much left to do?
工作职场|我还差一点就做完了/我快做完了/我快完成了/马上做完了|I'm almost finished.|That's good progress. What's left to do?
工作职场|我今天请假了/今天请假了|I'm taking a day off today.|I hope you have a good day. Do you have anything planned?
工作职场|这个周末我不用上班/这周末不用上班/周末不用上班|I don't have to work this weekend.|That's nice. How would you like to spend your weekend?
工作职场|下班以后我想去健身/下班后想去健身/下班去健身|I want to go to the gym after work.|Sounds like a good way to switch off. What kind of workout are you planning?
工作职场|今天一直开会/我今天一直开会/一直开会/一直在开会|I've been in meetings all day.|That sounds tiring. Did you get any breaks?
工作职场|我今天迟到了/今天迟到了|I was late today.|What held you up?
工作职场|我明天要出差/我明天出差/明天出差|I'm going on a business trip tomorrow.|Where are you heading?
工作职场|我工资发了/我发工资了/发工资了|I got paid.|Nice! Are you saving for anything in particular?
工作职场|我升职了/我被升职了/升职了|I got promoted.|Congratulations! How are you feeling about the new role?
工作职场|我刚换了工作/我找到新工作了/我找到工作了|I got a new job.|Congratulations! What will you be doing?
工作职场|我想辞职/我准备辞职/想辞职|I'm thinking about resigning.|What's making you consider leaving?
工作职场|我被裁员了/我失业了/被裁员|I lost my job.|I'm sorry. That can be a lot to take in. How are you doing?
工作职场|我还在试用期/我在试用期|I'm still in my probation period.|How is the new role going so far?
工作职场|我同事人很好/同事人很好|My colleagues are really nice.|That makes a big difference. Are you settling in well?
工作职场|这个项目进展怎么样/项目进展如何|How is the project going?|Which part of the project would you like to talk about?
工作职场|我今天效率很低/我没什么效率/效率很低|I haven't been very productive today.|Some days are like that. What's been distracting you?
工作职场|我需要你的反馈/给我点反馈|I'd appreciate your feedback.|Of course. What would you like me to look at?
学校学习|今天上课差点迟到了/上课差点迟到/差点迟到|I was almost late for class today.|Did you make it in time?
学校学习|这道题我不会做/我不会做这道题/这题不会/这道题不会|I don't know how to solve this problem.|Which part are you stuck on?
学校学习|我想把这个单词记下来/我想记下这个单词/把单词记下来|I want to write this word down.|That's a useful way to review it later.
学校学习|你能用简单一点的英语说吗/用简单点的英语说/用简单英语说/说简单一点|Could you say that in simpler English?|Of course. I'll use shorter sentences and simpler words.
学校学习|这个单词怎么发音/怎么读这个单词/这个词怎么读|How do you pronounce this word?|Which word would you like to practice?
学校学习|我能听懂但说不出来/听得懂说不出来/能听懂但是说不出来|I can understand it, but I can't express myself.|That's a useful starting point. We can practice one short sentence at a time.
学校学习|我考试没考好/我没考好/没考好|I didn't do well on the exam.|I'm sorry. Which part was the hardest?
学校学习|我考试通过了/我通过考试了/考试过了|I passed the exam.|Congratulations! How are you celebrating?
学校学习|我论文还没写完/论文还没写完|I haven't finished my paper yet.|How much do you still have left to write?
学校学习|老师讲得太快了/讲得太快了|The teacher speaks too fast.|Would you feel comfortable asking them to slow down?
学校学习|我上课走神了/上课走神|I lost focus in class.|Was there something on your mind?
学校学习|我今天没课/今天没课|I don't have any classes today.|Nice. How will you spend your free time?
学校学习|明天要交作业/作业明天截止|The assignment is due tomorrow.|How much is left to finish?
学校学习|我想申请奖学金/申请奖学金|I want to apply for a scholarship.|What are the application requirements?
学校学习|我最近在准备考试/最近准备考试/准备考试|I'm preparing for an exam.|What subject are you studying?
学校学习|我把笔记忘在家了/笔记忘在家|I left my notes at home.|That's annoying. Can you get a copy from someone?
学校学习|可以借我一支笔吗/借支笔/借一支笔|Could I borrow a pen?|You could ask someone sitting nearby.
交通出行|我的公交车还没来/公交车还没来/车还没来|My bus hasn't arrived yet.|Have you been waiting long?
交通出行|地铁今天人好多/今天地铁人好多/地铁好挤/地铁太挤了|The subway is really crowded today.|That can be uncomfortable. Do you have far to go?
交通出行|我坐过站了/坐过站了/我坐过头了|I missed my stop.|Oh no. Can you get off at the next stop?
交通出行|前面路口左转/下个路口左转/路口左转|Turn left at the next intersection.|Got it. Thanks for the directions.
交通出行|前面路口右转/下个路口右转/路口右转|Turn right at the next intersection.|Got it. Thanks for the directions.
交通出行|一直往前走/往前直走/一直直走|Keep going straight.|Thanks. That's clear.
交通出行|去机场大概多久/到机场要多久/去机场要多长时间|How long does it take to get to the airport?|It depends on your starting point and the traffic. Where are you leaving from?
交通出行|能在这里停车吗/这里停一下/麻烦这儿停/在这停车|Could you stop here, please?|You can ask the driver to stop somewhere safe.
交通出行|我还有十分钟到/还有十分钟到/十分钟后到|I'll be there in ten minutes.|Thanks for the update. No rush.
交通出行|我先出门了/我出门了/我先走了啊|I'm heading out now.|Have a good time. Stay safe!
交通出行|我找不到停车位/找不到车位/找不到停车位|I can't find a parking space.|That's frustrating. Is there another parking area nearby?
交通出行|今天堵车堵得特别厉害/堵车堵得很厉害/堵得特别厉害/堵得很厉害|The traffic is terrible today.|That's frustrating. Do you have another route you could take?
交通出行|因为堵车所以我迟到了/因为堵车我迟到了/我因为堵车迟到了|I was late because of the traffic.|That's frustrating. Was the traffic worse than usual?
交通出行|我正在过马路/我过马路/过马路|I'm crossing the road.|Take your time and stay safe.
交通出行|我在等红灯/等红灯|I'm waiting at a red light.|Thanks for the update. Stay safe on the road.
交通出行|我车没油了/车快没油了/没油了|My car is running out of gas.|Is there a gas station nearby?
交通出行|我自行车坏了/自行车坏了|My bike is broken.|That's inconvenient. What seems to be wrong with it?
交通出行|我晕车/我有点晕车/晕车了|I'm feeling carsick.|That sounds unpleasant. Are you able to take a break?
交通出行|我想充一下公交卡/给公交卡充值|I'd like to top up my transit card.|How much would you like to add?
购物消费|这个有别的颜色吗/还有别的颜色吗/有没有其他颜色/有别的颜色吗|Do you have this in another color?|Which color would you prefer?
购物消费|能便宜一点吗/可以便宜点吗/便宜一点行吗/便宜点|Could you lower the price a little?|What price did you have in mind?
购物消费|我只是随便看看/我随便看看/随便看看/只是看看|I'm just browsing, thanks.|Of course. Let me know if you need anything.
购物消费|我想换一个尺码/我想换个码/换一个尺码/换尺码|I'd like to exchange this for a different size.|What size would you like instead?
购物消费|这双鞋有点紧/鞋有点紧/鞋太紧了|These shoes are a little tight.|Would you like to try a larger size?
购物消费|我收到的东西坏了/收到的东西坏了/收到的商品坏了|The item I received was damaged.|That's frustrating. Have you contacted the seller?
购物消费|快递送错地址了/快递送错了/送错地址了|My package was delivered to the wrong address.|That's annoying. Have you checked with the delivery company?
购物消费|帮我放在门口/放在门口/放门口就行/放门口吧|Please leave it at the door.|Got it. Thanks for the delivery instructions.
购物消费|我不需要袋子/不用袋子/不要袋子/不需要袋子|I don't need a bag, thanks.|No problem.
购物消费|能刷卡吗/可以刷卡吗/能用银行卡吗/支持刷卡吗|Can I pay by card?|You can ask the cashier which payment methods they accept.
购物消费|可以给我小票吗/给我小票/要一张小票/给张收据|Could I have a receipt, please?|You can ask the cashier for a receipt.
购物消费|这件太大了/这个太大了/这件大了|This is too big.|Would you like to try a smaller size?
购物消费|我不要/我不想要/这个我不要|I don't want it.|That's fine. What would you prefer?
购物消费|这个没货了/缺货了/卖完了|It's out of stock.|That's disappointing. Will you look for an alternative?
购物消费|什么时候补货/什么时候有货|When will it be back in stock?|You could ask the store for an estimated restock date.
购物消费|这个打折吗/有没有折扣/能打折吗|Is there a discount on this?|You can ask whether any promotions apply.
购物消费|我买错了/我买错东西了|I bought the wrong item.|Would you like to exchange it or return it?
购物消费|我想取消订单/取消订单|I'd like to cancel my order.|Have you checked whether it has already shipped?
购物消费|我想查一下物流/查物流/查一下快递|I'd like to track my package.|Do you have the tracking number?
购物消费|我还没收到退款/退款还没到账/退款没到账|I haven't received my refund yet.|Have you checked the expected processing time?
约见安排|这周末你有空吗/周末你有空吗/周末有空吗|Are you free this weekend?|I'm here whenever you want to practice. What would you like to do?
约见安排|要不要一起去看电影/一起去看电影吗/一起看电影吧|Would you like to see a movie together?|That sounds fun. What kind of movie are you thinking of?
约见安排|我们改天再约吧/改天再约/改天吧/改天再说|Let's meet another day.|No problem. What day would work better?
约见安排|不好意思我临时有事/不好意思临时有事/我临时有事/临时有点事|I'm sorry, something came up.|No problem. Would you like to reschedule?
约见安排|我可能要晚到一会儿/我可能晚到一会/我会晚一点到|I might be a little late.|Thanks for letting me know. Take your time.
约见安排|你到哪儿了/你到哪了/你现在在哪/你在哪里|Where are you now?|I'm here in the chat. Are you waiting for someone?
约见安排|我等你/我会等你/我在这等你|I'll wait for you.|Thanks for being patient.
约见安排|我们几点见/几点碰面/几点见面|What time should we meet?|What time works best for you?
约见安排|我们在哪里见/在哪碰面/在哪里碰面|Where should we meet?|Is there somewhere convenient for both of you?
约见安排|我已经在楼下了/我在楼下了/我到楼下了|I'm downstairs.|Thanks for the update.
约见安排|你到了吗/你到没到/你到了没有|Have you arrived yet?|I'm here in the chat. Are you checking on someone's arrival?
约见安排|我现在没空/我现在不方便/现在不方便|I'm not available right now.|No problem. We can talk another time.
约见安排|我有空再联系你/我晚点联系你/晚点联系|I'll get back to you later.|Sure. Take your time.
约见安排|你什么时候方便/你什么时候有空|When would be a good time for you?|I'm available whenever you want to practice.
约见安排|我记错时间了/记错时间了|I got the time wrong.|It happens. Can you still make it?
约见安排|我们能改个时间吗/可以改时间吗/能改期吗|Could we reschedule?|Of course. What time would work better?
周末娱乐|我最近在学做饭/我在学做饭/最近学做饭|I've been learning to cook lately.|That's a useful skill. What have you tried making?
周末娱乐|这部电影比我想象的好看/电影比想象的好看/比我想象的好看|The movie was better than I expected.|That's a nice surprise. What did you like about it?
周末娱乐|我不喜欢恐怖片/不喜欢恐怖片|I don't like horror movies.|What kind of movies do you prefer?
周末娱乐|这部剧太好看了/这部剧很好看/剧太好看了|This TV series is really good.|What makes it so good?
周末娱乐|这部电影很无聊/电影很无聊|The movie was boring.|What didn't you like about it?
周末娱乐|我想换个发型/我想剪头发/去剪头发|I want to get a haircut.|Do you have a style in mind?
周末娱乐|我想去逛街/去逛街/逛街去|I want to go shopping.|Are you looking for anything in particular?
周末娱乐|我想去野餐/去野餐|I want to go on a picnic.|That sounds lovely. Where would you like to go?
周末娱乐|我想去露营/去露营|I want to go camping.|Do you have a campsite in mind?
周末娱乐|我买到演唱会门票了/抢到票了|I managed to get concert tickets.|That's exciting! Whose concert are you going to?
周末娱乐|我没抢到票/没买到票|I couldn't get tickets.|That's disappointing. Will you try again?
运动健康|我今天跑了三公里/今天跑了三公里/跑了三公里|I ran three kilometers today.|Nice work. How did the run feel?
运动健康|运动完感觉好多了/运动后感觉好多了/锻炼完好多了|I feel better after exercising.|That's great. What kind of exercise did you do?
运动健康|我想开始锻炼/我准备开始运动|I want to start exercising.|What kind of activity would you enjoy?
运动健康|我今天走了一万步/走了一万步|I walked ten thousand steps today.|That's a lot of walking. Where did you go?
运动健康|我今天休息不练了/今天休息不练|I'm taking a rest day today.|A break can be welcome. Have you had a busy week?
运动健康|我最近在练瑜伽/我在练瑜伽|I've been doing yoga lately.|How are you finding it?
运动健康|我想找个人一起运动/想找人一起运动|I'd like someone to exercise with.|What kind of activity would you like to do together?
朋友家人|我昨晚和室友吵架了/我和室友吵架了/跟室友吵架了/和室友吵架了|I had an argument with my roommate last night.|That sounds upsetting. What happened?
朋友家人|谢谢你一直听我说/谢谢你听我说/谢谢你愿意听/感谢你听我说|Thanks for listening to me.|You're welcome. I'm glad you shared that with me.
朋友家人|我替你感到开心/我为你开心/真替你高兴/替你开心|I'm happy for you.|Thank you. That's really kind of you.
朋友家人|这不是你的错/不是你的错/别怪自己|It's not your fault.|Thanks. That means a lot.
朋友家人|我想一个人待一会儿/我想一个人静静/想一个人待会/想静静|I'd like some time alone.|Of course. Take the time you need.
朋友家人|我不知道该怎么选/不知道怎么选/我很纠结|I don't know which option to choose.|What are the options you're considering?
朋友家人|今天真是倒霉的一天/今天真倒霉/今天太倒霉了|I've had a rough day.|I'm sorry. What happened?
朋友家人|我和他不太熟/我们不太熟|I don't know him very well.|How did you meet?
朋友家人|我们认识很久了/我们是老朋友|We've known each other for a long time.|That's lovely. How did you first meet?
朋友家人|我很想你/我想你了|I miss you.|That's sweet. Is there someone you'd like to get in touch with?
朋友家人|替我向你家人问好/帮我问候你家人|Please say hello to your family for me.|That's thoughtful of you.
朋友家人|我父母来找我了/爸妈来看我了|My parents have come to visit me.|That's nice. Do you have anything planned together?
朋友家人|我得去接孩子/我要去接孩子|I need to pick up my child.|Hope everything goes smoothly. Is it a busy afternoon?
朋友家人|我家猫生病了/我的猫病了|My cat is sick.|I'm sorry. Have you been able to contact a vet?
朋友家人|我的狗走丢了/狗走丢了|My dog has gone missing.|That sounds really worrying. Have you asked people nearby to keep an eye out?
朋友家人|你辛苦了/辛苦你了|Thanks for all your hard work.|Thank you. That's kind of you to say.
朋友家人|你真贴心/你真好/你太好了|That's really thoughtful of you.|Thank you. I'm glad I could help.
情绪想法|我最近压力真的挺大的/我最近压力很大/最近压力挺大/压力真的挺大|I've been feeling really stressed lately.|What's been putting the most pressure on you?
情绪想法|我有点想家了/有点想家|I'm feeling a little homesick.|What do you miss most about home?
情绪想法|我不是不喜欢只是觉得太贵/不是不喜欢只是太贵|It's not that I dislike it. I just think it's too expensive.|That makes sense. Would you prefer a more affordable option?
情绪想法|我很累但是我不想睡觉/我很累但不想睡/我好累但是不想睡|I'm tired, but I don't want to sleep.|Is something keeping your mind busy?
情绪想法|我最近没什么动力/我没动力/没有动力|I haven't felt very motivated lately.|That's hard. Is there one small thing you'd like to start with?
情绪想法|我有点后悔/我后悔了/有点后悔|I'm having second thoughts.|What is making you reconsider?
情绪想法|我想太多了/想太多/我老是胡思乱想|I'm overthinking things.|What's been going through your mind?
情绪想法|我对自己没信心/我没信心|I don't feel confident.|What would help you feel more prepared?
情绪想法|我感觉很有成就感/很有成就感|I feel a real sense of achievement.|That's a great feeling. What did you accomplish?
情绪想法|我接受不了/我很难接受|I'm finding it hard to accept.|That sounds difficult. What part feels hardest?
情绪想法|我需要冷静一下/我想冷静一下|I need a moment to calm down.|Of course. Take your time.
情绪想法|我不知道说什么/我不知道该说什么|I don't know what to say.|That's okay. You don't have to rush.
情绪想法|我感觉不太对/我觉得有点奇怪|Something doesn't feel right.|What seems different?
情绪想法|这太突然了/太突然了|This is so unexpected.|How are you feeling about it?
情绪想法|我不太在意/我无所谓/随便都行|I don't mind either way.|Got it. Do you have any preference at all?
手机网络|网络突然断了/突然断网了/网络断开了|The internet suddenly disconnected.|That's frustrating. Is it back now?
手机网络|你的声音断断续续的/声音断断续续/你声音一卡一卡|Your voice is breaking up.|That sounds like a connection issue. Can you hear me clearly now?
手机网络|我听不清你说话/我听不清/声音听不清|I can't hear you clearly.|You could try turning up the volume or checking the connection.
手机网络|你把麦克风静音了/你静音了/麦克风关了|Your microphone is muted.|Thanks for letting me know.
手机网络|能把照片发给我吗/照片发给我/发我照片|Could you send me the photo?|Which photo would you like?
手机网络|手机存储空间满了/手机内存满了/存储满了|My phone's storage is full.|Are there any files you no longer need?
手机网络|我忘记密码了/我忘了密码/忘记密码|I forgot my password.|You could use the account's password-reset option.
手机网络|手机卡住了/我手机死机了/手机死机|My phone has frozen.|That's annoying. Has it happened before?
手机网络|应用闪退了/软件闪退/闪退了|The app keeps crashing.|That's frustrating. Does it happen when you do something specific?
手机网络|我收不到验证码/验证码收不到|I'm not receiving the verification code.|Have you checked whether the phone number or email address is correct?
手机网络|我给你发了消息/消息发给你了|I sent you a message.|Thanks. What would you like to talk about?
手机网络|我在等你回复/等你回复|I'm waiting for your reply.|I'm here. What would you like to say?
手机网络|我刚看到你的消息/我才看到消息|I just saw your message.|No problem. How is your day going?
手机网络|我手机屏幕碎了/屏幕摔碎了|My phone screen is cracked.|That's annoying. Are you planning to get it repaired?
手机网络|这里信号不好/我这信号不好/信号差|The signal is weak here.|Would moving somewhere else help?
手机网络|能告诉我无线网密码吗/wifi密码是什么/WiFi密码是什么/无线网密码多少|What's the Wi-Fi password?|You can ask the host or a member of staff for it.
手机网络|我想给手机充电/手机充一下电|I'd like to charge my phone.|Do you have a charger with you?
手机网络|能借我充电器吗/借我充电器/借个充电宝|Could I borrow a charger?|What kind of charger do you need?
酒店住宿|我想订一个双人间/我要订双人间/订一个双人间|I'd like to book a double room.|What dates would you like to book?
酒店住宿|早餐几点开始/几点有早餐/早饭几点开始|What time does breakfast start?|You can check with reception for the breakfast hours.
酒店住宿|我可以晚一点退房吗/可以延迟退房吗/能晚点退房吗|Could I have a late checkout?|You can ask reception whether late checkout is available.
酒店住宿|房间没有热水/房间没热水/没有热水|There's no hot water in the room.|That's inconvenient. You could let reception know.
酒店住宿|附近有便利店吗/这附近有便利店吗|Is there a convenience store nearby?|I don't have local map information. You could check a map or ask at reception.
酒店住宿|洗手间在哪里/卫生间在哪/厕所在哪里/厕所在哪儿|Where is the restroom?|A member of staff nearby should be able to point you in the right direction.
酒店住宿|我需要一张去北京的票/我要一张去北京的票/买张去北京的票|I'd like a ticket to Beijing.|What date would you like to travel?
酒店住宿|我不想去旅行了/我不想旅游了/不想去旅行|I don't want to travel anymore.|Have your plans changed, or would you just prefer to stay home?
酒店住宿|可以帮我叫醒吗/我需要叫醒服务/叫醒服务|Could I have a wake-up call?|What time would you like the call?
酒店住宿|可以寄存行李吗/我想寄存行李/寄存行李|Could I leave my luggage here?|You can ask reception about luggage storage.
酒店住宿|可以换个房间吗/我想换个房间|Could I change rooms?|What's wrong with your current room?
酒店住宿|我订了房间/我有预订/我有预约|I have a reservation.|What name is the reservation under?
酒店住宿|这里可以拍照吗/可以拍照吗|Is photography allowed here?|You can check the signs or ask a staff member.
酒店住宿|我需要一张地图/有地图吗|Could I have a map?|Are you looking for a map of the city or this area?
酒店住宿|我护照丢了/我的护照不见了|I've lost my passport.|That sounds stressful. You may want to contact the local authorities and your embassy or consulate.
居家生活|我忘记把衣服收进来了/我忘收衣服了/忘收衣服|I forgot to bring in the laundry.|Is it still outside?
居家生活|垃圾该倒了/该倒垃圾了|It's time to take out the trash.|One more chore to get done. Is there anything else on your list?
居家生活|牛奶放冰箱里了吗/牛奶放冰箱了吗|Did you put the milk in the fridge?|I can't check, but it's worth having a look.
居家生活|我得去交房租了/我要交房租/该交房租了|I need to pay the rent.|Is it due soon?
居家生活|能帮我拿一下这个吗/帮我拿一下/帮我拿着这个|Could you help me hold this?|You could ask someone nearby to lend a hand.
居家生活|你能小声一点吗/小声一点/小点声/安静一点|Could you be a little quieter, please?|That's a polite way to ask for some quiet.
居家生活|我今晚不在家吃饭/今晚不在家吃饭|I'm not having dinner at home tonight.|Do you have plans to eat out?
居家生活|我刚刚才到家/我刚到家/刚到家/我到家了|I just got home.|Welcome back. How was your day?
居家生活|我家停电了/家里停电了/停电了|There's a power outage at home.|That's inconvenient. Is it affecting the whole neighborhood?
居家生活|我家停水了/停水了|The water is off at home.|That's inconvenient. Do you know when it will be back?
居家生活|水龙头漏水了/水龙头在漏水|The faucet is leaking.|That sounds annoying. Can you arrange to have it repaired?
居家生活|马桶堵了/厕所堵了|The toilet is blocked.|That's inconvenient. Do you need to call someone to fix it?
居家生活|我家冰箱坏了/冰箱坏了|My fridge isn't working.|That's frustrating. Have you checked what the problem might be?
居家生活|我把钥匙锁屋里了/钥匙锁家里了|I locked my keys inside.|Oh no. Is there anyone with a spare key?
居家生活|门打不开了/我打不开门|I can't open the door.|Is it locked, or does it seem stuck?
居家生活|我想换个床单/我要换床单|I need to change the bedsheets.|Sounds like a good time for a fresh start.
居家生活|我在收拾行李/我正在收拾行李|I'm packing my bags.|Where are you heading?
居家生活|我得整理一下桌子/桌子太乱了|I need to tidy up my desk.|Would starting with one small area help?
居家生活|厨房有股怪味/闻起来怪怪的|There's a strange smell in the kitchen.|Can you tell where it's coming from?
居家生活|牛奶过期了/这个过期了|This milk has expired.|That's annoying. Were you about to use it?
居家生活|我忘买洗衣液了/洗衣液用完了|I've run out of laundry detergent.|Will you pick some up on your next shopping trip?
居家生活|我今天做了大扫除/我把家打扫了一遍|I gave the house a thorough clean today.|That must feel satisfying. Was it a lot of work?
银行支付|我想开一个账户/我想开户/开银行账户|I'd like to open a bank account.|You can ask the bank what documents are needed.
银行支付|我想取点现金/我想取钱/取点现金|I'd like to withdraw some cash.|Do you need to find an ATM?
银行支付|我转账转错了/我转错账了|I sent a transfer to the wrong account.|That sounds stressful. You may want to contact your bank promptly.
银行支付|我的卡被拒了/刷卡失败/支付失败|My payment was declined.|That's frustrating. Do you have another payment method?
银行支付|我余额不够了/余额不足|I don't have enough money in my account.|That's frustrating. Do you need to check your recent spending?
银行支付|我想查一下余额/查一下余额|I'd like to check my balance.|You can check it in your banking app or at an ATM.
银行支付|我这个月花太多了/这个月花钱太多|I've spent too much this month.|What would you like to cut back on?
银行支付|我想做个预算/制定预算|I want to make a budget.|What expenses would you like to start with?
银行支付|能开发票吗/我要发票|Could I have an invoice?|You can ask the seller what information they need.
银行支付|我已经付过钱了/我付过钱了|I've already paid.|Do you have a receipt or payment confirmation?
服务办事|我想预约理发/预约剪头发|I'd like to book a haircut.|What day would you like to go?
服务办事|不要剪太短/别剪太短|Please don't cut it too short.|That's a useful detail to tell the hairdresser.
服务办事|我想寄个包裹/我要寄快递/寄个包裹|I'd like to send a package.|Where would you like to send it?
服务办事|我想洗这件外套/这件要干洗|I'd like to have this coat dry-cleaned.|When do you need it back?
服务办事|大概要等多久/要等多久/需要等多久|How long will the wait be?|You can ask the staff for an estimated waiting time.
服务办事|现在营业吗/你们开门了吗|Are you open now?|I don't have live business hours. You could check the store's listing.
服务办事|你们几点关门/几点关门|What time do you close?|You can check the posted opening hours or ask a staff member.
服务办事|我想取消预约/取消预约|I'd like to cancel my appointment.|You can contact the provider to cancel or reschedule.
服务办事|我能预约明天吗/明天能预约吗|Could I make an appointment for tomorrow?|What time would work best for you?
服务办事|这里要排队吗/要排队吗|Do I need to queue here?|You could ask a staff member where the line starts.
安全求助|我找不到我的手机/我手机丢了|I've lost my phone.|That sounds stressful. Where did you last have it?
安全求助|我钱包丢了/钱包不见了|I've lost my wallet.|That's worrying. Where did you last use it?
安全求助|请帮我报警/请叫警察|Please call the police.|If you're in immediate danger, contact local emergency services or someone nearby who can help.
安全求助|请叫救护车/需要救护车|Please call an ambulance.|If this is happening now, ask someone nearby to call local emergency services immediately.
安全求助|我需要帮助/我需要帮忙/救命|I need help.|What's happening? If there's immediate danger, contact local emergency services or someone nearby.
安全求助|有人受伤了/他受伤了|Someone is hurt.|If this is happening now, get help from local emergency services or a nearby person.
安全求助|我被困住了/我出不去了|I'm stuck and can't get out.|If you're in danger, contact local emergency services or someone nearby who can help.
安全求助|我找不到朋友了/我和朋友走散了|I've become separated from my friend.|Do you have a way to contact them or a meeting point?
时间数量|现在几点了/现在几点/几点了|What time is it?|You can check your device for your local time.
时间数量|今天星期几/今天周几|What day is it today?|Your device's calendar can show your local day and date.
时间数量|还有多久/还要多久|How much longer will it take?|What are you waiting for?
时间数量|我还需要一点时间/再给我一点时间|I need a little more time.|Of course. Take the time you need.
时间数量|我没时间了/时间不够了/来不及了|I'm running out of time.|What do you need to finish first?
时间数量|我提前到了/我来早了|I arrived early.|Do you have somewhere comfortable to wait?
时间数量|我晚点再做/我等会再做|I'll do it later.|Is there something more urgent to do first?
时间数量|我刚开始/我才刚开始|I've only just started.|How is it going so far?
时间数量|这个要花很久/这要很长时间|This is going to take a long time.|What part do you expect to take the longest?
沟通请求|你今天忙不忙/你今天忙吗/你忙吗|Are you busy today?|I'm here to practice whenever you're ready.
沟通请求|你能帮我看看吗/帮我看一下/帮我看看|Could you take a look at this for me?|Of course. What would you like me to look at?
沟通请求|你能解释一下吗/解释一下/能解释一下吗|Could you explain that?|Of course. Which part would you like explained?
沟通请求|你能举个例子吗/举个例子|Could you give me an example?|Sure. What would you like an example of?
沟通请求|你明白我的意思吗/你懂我意思吗|Do you see what I mean?|Could you tell me a little more about what you mean?
沟通请求|我不是这个意思/我不是那意思|That's not what I meant.|Thanks for clarifying. What did you mean?
沟通请求|让我想想/让我想一下|Let me think.|Of course. Take your time.
沟通请求|我说错了/我刚才说错了|I misspoke.|That's okay. What did you mean to say?
沟通请求|你说得有道理/你说的有道理/有道理|That's a good point.|I'm glad that makes sense. What do you think?
沟通请求|听起来不错/听着不错/听起来挺好|That sounds good.|Great! What would you like to do next?
沟通请求|我再确认一下/让我确认一下|Let me double-check.|Of course. It's good to be sure.
沟通请求|你能帮我拍张照吗/帮我拍张照/能帮我拍照吗|Could you take a photo of me?|You could ask someone nearby to help.
沟通请求|我可以坐这里吗/这里有人坐吗/这有人吗|Is this seat taken?|You can ask the person next to the seat.
沟通请求|麻烦让一下/借过一下/借过/让一下|Excuse me, could I get past?|Of course. That's a polite way to ask.
沟通请求|我没听清/刚才没听清|I didn't quite catch that.|No problem. Would you like me to repeat it?
沟通请求|这是什么意思/什么意思|What does this mean?|Which word or phrase are you asking about?
沟通请求|用英语怎么说/英文怎么说|How do you say this in English?|Try describing what you mean in a short sentence.
沟通请求|我开玩笑的/我在开玩笑/开玩笑啦|I'm just kidding.|Got it! Thanks for clarifying.
沟通请求|说实话/老实说|Let me be honest with you.|Go ahead. What's on your mind?
沟通请求|看情况吧/要看情况|It depends.|What would it depend on?
沟通请求|你决定吧/你来定/你定吧|It's up to you.|What options are we choosing between?
沟通请求|我都可以/都行/都可以|Either is fine with me.|Got it. That's helpful to know.
沟通请求|不用麻烦了/别麻烦了|Please don't go to any trouble.|That's considerate of you.
沟通请求|抱歉打扰你/不好意思打扰一下/打扰一下|Sorry to bother you.|No problem. How can I help?
沟通请求|祝你好运/加油/祝你顺利|Good luck!|Thank you! I hope things go well for you too.
沟通请求|生日快乐/祝你生日快乐|Happy birthday!|That's a lovely thing to say. Are you celebrating someone's birthday?
沟通请求|新年快乐/过年好|Happy New Year!|Happy New Year to you too!
沟通请求|恭喜你/恭喜恭喜|Congratulations!|Thank you. That's very kind!
沟通请求|没问题/可以的|No problem.|Thanks. I appreciate it.
沟通请求|不用谢/不客气|You're welcome.|Thanks for being so kind.
沟通请求|我赞成/我支持这个想法|I'm in favor of that idea.|What do you like about it?
沟通请求|我得考虑一下/我需要想一想|I need to think about it.|Of course. There's no need to decide immediately.
条件计划|如果明天下雨我就不出门/如果明天下雨我不出门/明天下雨就不出门|If it rains tomorrow, I won't go out.|That makes sense. What would you like to do at home instead?
条件计划|如果明天天气好我们去散步/明天天气好就去散步|If the weather is nice tomorrow, let's go for a walk.|That sounds like a lovely plan.
条件计划|等我忙完再联系你/等我忙完联系你|I'll get in touch when I'm done.|Sure. Take your time.
条件计划|吃完饭再说/饭后再说|Let's talk about it after we eat.|Sure. Enjoy your meal.
条件计划|等雨停了再走/雨停了再出门|Let's wait until the rain stops before leaving.|That sounds sensible.
条件计划|要是有时间我就去/有时间就去|I'll go if I have time.|That sounds flexible. When will you know?
条件计划|我还没决定/我没决定好|I haven't decided yet.|What options are you considering?
条件计划|我改变主意了/我改主意了|I've changed my mind.|What made you reconsider?
个人介绍|我住在北京/我在北京住|I live in Beijing.|What do you like about living there?
个人介绍|我来自中国/我是中国人|I'm from China.|Which part of China are you from?
个人介绍|我是学生/我还在上学|I'm a student.|What are you studying?
个人介绍|我刚毕业/我刚刚毕业|I've just graduated.|Congratulations! What are your plans now?
个人介绍|我是独生子女/我没有兄弟姐妹|I'm an only child.|What was it like growing up as an only child?
个人介绍|我有一个姐姐/我有个姐姐|I have an older sister.|Are you close to each other?
个人介绍|我有一个弟弟/我有个弟弟|I have a younger brother.|Do you spend much time together?
个人介绍|我一个人住/我独居|I live alone.|How do you like living on your own?
个人介绍|我跟室友一起住/我和室友合租|I share a place with roommates.|How is that working out for you?
个人介绍|我在学英语/我正在学英文|I'm learning English.|What would you most like to be able to talk about?`;
export const authored=raw.trim().split('\n').map(line=>{const [category,aliases,en,reply]=line.split('|');return {category,aliases:aliases.split('/'),zh:aliases.split('/')[0],en,reply,source:'authored'};});

// Explicit morphology avoids "I am go" and similar word-by-word translation errors.
// category | Chinese aliases | base | past | participle | -ing | topic-specific reply
const actionRows=`日常作息|洗澡/冲澡/take a shower|take a shower|took a shower|taken a shower|taking a shower|That can be a nice way to freshen up.
日常作息|刷牙/brush my teeth|brush my teeth|brushed my teeth|brushed my teeth|brushing my teeth|Is it part of your usual routine?
日常作息|洗脸|wash my face|washed my face|washed my face|washing my face|A little freshening up can feel nice.
日常作息|洗头|wash my hair|washed my hair|washed my hair|washing my hair|Are you getting ready to go out?
日常作息|睡觉/睡/go to sleep|go to sleep|went to sleep|gone to sleep|sleeping|I hope you get some good rest.
日常作息|起床/get up|get up|got up|gotten up|getting up|How is your morning going?
日常作息|休息/take a break|take a break|took a break|taken a break|taking a break|Have you had a busy day?
日常作息|午睡/睡午觉|take a nap|took a nap|taken a nap|taking a nap|A short rest can be welcome.
日常作息|定闹钟/设闹钟|set my alarm|set my alarm|set my alarm|setting my alarm|What time do you need to get up?
日常作息|换衣服|get changed|got changed|gotten changed|getting changed|Are you getting ready for something?
吃饭饮食|吃饭/吃东西/eat|eat|ate|eaten|eating|What are you having?
吃饭饮食|吃早饭/吃早餐/have breakfast|have breakfast|had breakfast|had breakfast|having breakfast|What do you usually have for breakfast?
吃饭饮食|吃午饭/吃中饭/have lunch|have lunch|had lunch|had lunch|having lunch|What are you having for lunch?
吃饭饮食|吃晚饭/吃晚餐/have dinner|have dinner|had dinner|had dinner|having dinner|What are you having for dinner?
吃饭饮食|做饭/做菜/cook|cook|cooked|cooked|cooking|What would you like to make?
吃饭饮食|点外卖/order takeout|order takeout|ordered takeout|ordered takeout|ordering takeout|What kind of food are you in the mood for?
吃饭饮食|喝咖啡/drink coffee|drink coffee|drank coffee|drunk coffee|drinking coffee|How do you like your coffee?
吃饭饮食|喝水/drink water|drink some water|drank some water|drunk some water|drinking some water|Do you have some water with you?
吃饭饮食|喝茶|drink some tea|drank some tea|drunk some tea|drinking some tea|What kind of tea do you like?
吃饭饮食|吃水果|eat some fruit|ate some fruit|eaten some fruit|eating some fruit|What fruit do you like best?
吃饭饮食|买菜|buy groceries|bought groceries|bought groceries|buying groceries|What do you need to pick up?
吃饭饮食|买咖啡/order a coffee|order a coffee|ordered a coffee|ordered a coffee|ordering a coffee|Would you like it hot or iced?
居家生活|洗衣服/洗衣/do the laundry|do the laundry|did the laundry|done the laundry|doing the laundry|Do you have much laundry to do?
居家生活|洗碗/刷碗|wash the dishes|washed the dishes|washed the dishes|washing the dishes|Have you just finished a meal?
居家生活|打扫房间/收拾房间|clean my room|cleaned my room|cleaned my room|cleaning my room|Will you start with one small area?
居家生活|拖地|mop the floor|mopped the floor|mopped the floor|mopping the floor|Is it part of a bigger cleanup?
居家生活|扫地|sweep the floor|swept the floor|swept the floor|sweeping the floor|Are you doing some cleaning today?
居家生活|倒垃圾|take out the trash|took out the trash|taken out the trash|taking out the trash|One more chore to get done.
居家生活|整理桌子/收拾桌子|tidy my desk|tidied my desk|tidied my desk|tidying my desk|A clear desk can feel refreshing.
居家生活|换床单|change the bedsheets|changed the bedsheets|changed the bedsheets|changing the bedsheets|Fresh sheets can feel lovely.
居家生活|搬家|move to a new place|moved to a new place|moved to a new place|moving to a new place|What kind of place are you looking for?
居家生活|收拾行李/打包行李|pack my bags|packed my bags|packed my bags|packing my bags|Where are you heading?
居家生活|浇花|water the plants|watered the plants|watered the plants|watering the plants|What kind of plants do you have?
居家生活|遛狗|walk my dog|walked my dog|walked my dog|walking my dog|Does your dog have a favorite route?
居家生活|喂猫|feed my cat|fed my cat|fed my cat|feeding my cat|What is your cat like?
居家生活|交房租|pay the rent|paid the rent|paid the rent|paying the rent|Is it due soon?
居家生活|锁门|lock the door|locked the door|locked the door|locking the door|A useful thing to double-check.
居家生活|关灯|turn off the lights|turned off the lights|turned off the lights|turning off the lights|It's easy to overlook sometimes.
工作职场|上班/去上班/go to work|go to work|went to work|gone to work|going to work|How is work going?
工作职场|加班/work overtime|work overtime|worked overtime|worked overtime|working overtime|Have you had a busy week?
工作职场|开会/参加会议|attend a meeting|attended a meeting|attended a meeting|attending a meeting|What is the meeting about?
工作职场|写报告|write a report|wrote a report|written a report|writing a report|What is the report about?
工作职场|发邮件/写邮件|send an email|sent an email|sent an email|sending an email|Who is the email for?
工作职场|出差/去出差|go on a business trip|went on a business trip|gone on a business trip|going on a business trip|Where are you heading?
工作职场|找工作|look for a job|looked for a job|looked for a job|looking for a job|What kind of role interests you?
工作职场|换工作|change jobs|changed jobs|changed jobs|changing jobs|What would you like in your next role?
工作职场|面试/参加面试|attend an interview|attended an interview|attended an interview|attending an interview|What kind of role is it for?
工作职场|请假|take a day off|took a day off|taken a day off|taking a day off|Do you have something planned?
学校学习|上课/去上课|go to class|went to class|gone to class|going to class|What class is it?
学校学习|写作业/做作业|do my homework|did my homework|done my homework|doing my homework|What subject is it for?
学校学习|复习|review my notes|reviewed my notes|reviewed my notes|reviewing my notes|What are you studying?
学校学习|背单词/记单词|learn some vocabulary|learned some vocabulary|learned some vocabulary|learning some vocabulary|Have you learned any useful words?
学校学习|练英语/练习英语/practice English|practice English|practiced English|practiced English|practicing English|What would you like to talk about?
学校学习|学英语/学英文|learn English|learned English|learned English|learning English|What do you most want to be able to say?
学校学习|写论文|write my paper|wrote my paper|written my paper|writing my paper|What is your paper about?
学校学习|去图书馆|go to the library|went to the library|gone to the library|going to the library|Do you have something to study or read?
运动健康|跑步/去跑步/run|go for a run|went for a run|gone for a run|going for a run|Do you have a favorite running route?
运动健康|游泳/去游泳/swim|go swimming|went swimming|gone swimming|going swimming|Do you swim often?
运动健康|爬山/去爬山/hike|go hiking|went hiking|gone hiking|going hiking|Do you have a trail in mind?
运动健康|健身/去健身房/go to the gym|go to the gym|went to the gym|gone to the gym|going to the gym|What kind of workout are you planning?
运动健康|散步/出去走走/去散步/walk|go for a walk|went for a walk|gone for a walk|going for a walk|Do you have a favorite place to walk?
运动健康|去公园走走/去公园散步/到公园散步|go for a walk in the park|went for a walk in the park|gone for a walk in the park|going for a walk in the park|Do you have a favorite park?
运动健康|运动/锻炼/exercise|exercise|exercised|exercised|exercising|What kind of exercise do you enjoy?
运动健康|骑自行车/骑车|ride my bike|rode my bike|ridden my bike|riding my bike|Where do you like to ride?
运动健康|打篮球|play basketball|played basketball|played basketball|playing basketball|Do you usually play with friends?
运动健康|打羽毛球|play badminton|played badminton|played badminton|playing badminton|Do you play regularly?
运动健康|踢足球|play soccer|played soccer|played soccer|playing soccer|Do you have a regular group to play with?
运动健康|练瑜伽/做瑜伽|do yoga|did yoga|done yoga|doing yoga|How are you finding it?
周末娱乐|看电影/去看电影/see a movie|see a movie|saw a movie|seen a movie|seeing a movie|What kind of movie are you interested in?
周末娱乐|看电视|watch TV|watched TV|watched TV|watching TV|What do you enjoy watching?
周末娱乐|追剧|watch a TV series|watched a TV series|watched a TV series|watching a TV series|What series are you watching?
周末娱乐|看书/读书/read|read a book|read a book|read a book|reading a book|What do you enjoy reading?
周末娱乐|听音乐|listen to music|listened to music|listened to music|listening to music|What kind of music do you like?
周末娱乐|打游戏/玩游戏|play video games|played video games|played video games|playing video games|What do you like to play?
周末娱乐|逛街|go shopping|went shopping|gone shopping|going shopping|Are you looking for anything in particular?
周末娱乐|拍照|take photos|took photos|taken photos|taking photos|What do you like to take photos of?
周末娱乐|看演唱会|go to a concert|went to a concert|gone to a concert|going to a concert|Whose concert is it?
周末娱乐|露营/去露营|go camping|went camping|gone camping|going camping|Do you have a campsite in mind?
周末娱乐|野餐/去野餐|go on a picnic|went on a picnic|gone on a picnic|going on a picnic|Where would you like to go?
旅行出行|旅行/旅游/去旅行/去旅游/travel|travel|traveled|traveled|traveling|Where would you like to go?
旅行出行|订酒店|book a hotel|booked a hotel|booked a hotel|booking a hotel|What matters most when you choose a hotel?
旅行出行|订机票|book a flight|booked a flight|booked a flight|booking a flight|Where are you flying to?
旅行出行|坐地铁|take the subway|took the subway|taken the subway|taking the subway|Where are you heading?
旅行出行|坐公交/坐公交车|take the bus|took the bus|taken the bus|taking the bus|Do you have far to go?
旅行出行|打车/坐出租车|take a taxi|took a taxi|taken a taxi|taking a taxi|Where do you need to go?
旅行出行|开车|drive|drove|driven|driving|Do you have a long journey ahead?
旅行出行|回家/go home|go home|went home|gone home|going home|How was your day?
旅行出行|出门/出去|go out|went out|gone out|going out|Do you have anything planned?
朋友家人|给妈妈打电话|call my mom|called my mom|called my mom|calling my mom|Do you talk often?
朋友家人|给朋友打电话|call a friend|called a friend|called a friend|calling a friend|Are you catching up with someone?
朋友家人|和朋友见面/见朋友|meet up with a friend|met up with a friend|met up with a friend|meeting up with a friend|What would you like to do together?
朋友家人|接孩子|pick up my child|picked up my child|picked up my child|picking up my child|Is it a busy afternoon?
身体状态|看医生/去看医生|see a doctor|saw a doctor|seen a doctor|seeing a doctor|Have you made an appointment?
身体状态|看牙医/看牙|see a dentist|saw a dentist|seen a dentist|seeing a dentist|Is it for a checkup?
身体状态|吃药/服药|take my medicine|took my medicine|taken my medicine|taking my medicine|Do you have the instructions for it?
手机网络|给手机充电/充手机|charge my phone|charged my phone|charged my phone|charging my phone|Do you have a charger with you?
银行支付|取钱/取现金|withdraw some cash|withdrew some cash|withdrawn some cash|withdrawing some cash|Do you need to find an ATM?`;
export const actions=actionRows.split('\n').map(line=>{const [category,zh,base,past,part,ing,reply]=line.split('|');return {category,aliases:[...new Set([...zh.split('/'),base])],base,past,part,ing,reply};});

export function generateTemplates(){
 const rows=[];const add=(category,aliases,en,reply)=>rows.push({category,zh:aliases[0],aliases,en,reply,source:'template'});
 for(const a of actions){
  // These are checked grammatical families, not a claim of distinct real-world usage counts.
  const forms=[
   [z=>`我想${z}`,`I want to ${a.base}.`],
   [z=>`我不想${z}`,`I don't want to ${a.base}.`],
   [z=>`我需要${z}`,`I need to ${a.base}.`],
   [z=>`我得${z}`,`I need to ${a.base}.`],
   [z=>`我打算${z}`,`I'm planning to ${a.base}.`],
   [z=>`我准备${z}`,`I'm going to ${a.base}.`],
   [z=>`我正在${z}`,`I'm ${a.ing}.`],
   [z=>`我在${z}`,`I'm ${a.ing}.`],
   [z=>`我还没${z}`,`I haven't ${a.part} yet.`],
   [z=>`我已经${z}了`,`I've already ${a.part}.`],
   [z=>`我刚${z}完`,`I've just ${a.part}.`],
   [z=>`我昨天${z}了`,`I ${a.past} yesterday.`],
   [z=>`我昨晚${z}了`,`I ${a.past} last night.`],
   [z=>`我昨天没${z}`,`I didn't ${a.base} yesterday.`],
   [z=>`昨天我没有${z}`,`I didn't ${a.base} yesterday.`],
   [z=>`我昨天没有${z}`,`I didn't ${a.base} yesterday.`],
   [z=>`我明天要${z}`,`I'm going to ${a.base} tomorrow.`],
   [z=>`我明天想${z}`,`I want to ${a.base} tomorrow.`],
   [z=>`我今天想${z}`,`I want to ${a.base} today.`],
   [z=>`我今晚想${z}`,`I want to ${a.base} tonight.`],
   [z=>`我周末想${z}`,`I want to ${a.base} this weekend.`],
   [z=>`我想周末${z}`,`I want to ${a.base} this weekend.`],
   [z=>`我喜欢${z}`,`I like to ${a.base}.`],
   [z=>`我不喜欢${z}`,`I don't like to ${a.base}.`],
   [z=>`你想${z}吗`,`Do you want to ${a.base.replace(/\bmy\b/g,'your')}?`],
   [z=>`你要不要${z}`,`Would you like to ${a.base.replace(/\bmy\b/g,'your')}?`],
   [z=>`你${z}了吗`,`Have you ${a.part.replace(/\bmy\b/g,'your')} yet?`],
   [z=>`我可以${z}吗`,`Can I ${a.base}?`],
   [z=>`我能${z}吗`,`Can I ${a.base}?`],
   [z=>`我们一起${z}吧`,`Let's ${a.base.replace(/\bmy\b/g,'our')} together.`],
   [z=>`我们${z}吧`,`Let's ${a.base.replace(/\bmy\b/g,'our')}.`],
   [z=>`记得${z}`,`Remember to ${a.base.replace(/\bmy\b/g,'your')}.`],
   [z=>`别忘了${z}`,`Don't forget to ${a.base.replace(/\bmy\b/g,'your')}.`],
   [z=>`不要${z}`,`Don't ${a.base.replace(/\bmy\b/g,'your')}.`],
   [z=>`我忘了${z}`,`I forgot to ${a.base}.`]
  ];
  for(const [pattern,en] of forms){const englishAliases=a.aliases.filter(z=>/^[a-z]/i.test(z));const chinese=a.aliases.filter(z=>/[\u4e00-\u9fff]/.test(z));const aliases=[...chinese,...englishAliases].map(pattern);let reply=a.reply;
   if(en.startsWith('Do you want')||en.startsWith('Would you like'))reply=`I can't join in physically, but I'd be happy to chat about it. ${a.reply}`;
   else if(en.startsWith('Have you'))reply=`I don't have personal daily activities, but I'd like to hear about yours. ${a.reply}`;
   else if(en.startsWith('Remember')||en.startsWith("Don't forget"))reply='Thanks for the reminder. I appreciate you looking out for me.';
   else if(en.startsWith("Don't "))reply='Thanks for letting me know. I understand.';
   add(a.category,aliases,en,reply);
  }
 }
 return rows;
}
