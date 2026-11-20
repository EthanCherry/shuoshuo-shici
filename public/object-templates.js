// Closed object sets: generated only for sensible verb/object combinations.
const foods=`米饭/rice|rice;面条/noodles|noodles;饺子/dumplings|dumplings;包子|steamed buns;面包/bread|bread;鸡蛋/eggs|eggs;鸡肉/chicken|chicken;牛肉/beef|beef;猪肉/pork|pork;鱼/fish|fish;海鲜/seafood|seafood;蔬菜/vegetables|vegetables;水果/fruit|fruit;苹果/apples|apples;香蕉/bananas|bananas;橙子|oranges;沙拉/salad|salad;汤/soup|soup;披萨/pizza|pizza;汉堡/burgers|burgers;三明治/sandwiches|sandwiches;蛋糕/cake|cake;冰淇淋/ice cream|ice cream;巧克力/chocolate|chocolate;火锅/hot pot|hot pot;烧烤|barbecue;寿司/sushi|sushi;意大利面/pasta|pasta;炒饭|fried rice;薯条/fries|fries;饼干/cookies|cookies;酸奶/yogurt|yogurt;奶酪/cheese|cheese;坚果/nuts|nuts;花生/peanuts|peanuts;虾/shrimp|shrimp;豆腐/tofu|tofu;蘑菇/mushrooms|mushrooms;土豆/potatoes|potatoes;番茄/西红柿|tomatoes;黄瓜|cucumbers;草莓/strawberries|strawberries;西瓜/watermelon|watermelon;葡萄/grapes|grapes;零食/snacks|snacks`;
const drinks=`咖啡/coffee|coffee;茶/tea|tea;水/water|water;牛奶/milk|milk;豆奶/soy milk|soy milk;燕麦奶/oat milk|oat milk;奶茶/milk tea|milk tea;果汁/juice|juice;橙汁/orange juice|orange juice;可乐/cola|cola;啤酒/beer|beer;红酒/red wine|red wine;热水|warm water;冰水|cold water;气泡水/sparkling water|sparkling water`;
const things=`衣服/clothes|some clothes;外套/jacket|a jacket;毛衣/sweater|a sweater;衬衫/shirt|a shirt;裤子/pants|a pair of pants;鞋子/shoes|a pair of shoes;运动鞋/sneakers|a pair of sneakers;袜子/socks|some socks;帽子/hat|a hat;围巾/scarf|a scarf;手套/gloves|a pair of gloves;雨伞/umbrella|an umbrella;书/book|a book;笔/pen|a pen;笔记本/notebook|a notebook;手机/phone|a phone;电脑/computer|a computer;耳机/headphones|a pair of headphones;充电器/charger|a charger;充电宝/power bank|a power bank;牙刷/toothbrush|a toothbrush;牙膏/toothpaste|some toothpaste;洗发水/shampoo|some shampoo;洗衣液/detergent|some laundry detergent;纸巾/tissues|some tissues;背包/backpack|a backpack;行李箱/suitcase|a suitcase;眼镜/glasses|a pair of glasses;礼物/gift|a gift;花/flowers|some flowers`;
const places=`北京/Beijing|Beijing;上海/Shanghai|Shanghai;广州/Guangzhou|Guangzhou;深圳/Shenzhen|Shenzhen;杭州/Hangzhou|Hangzhou;成都/Chengdu|Chengdu;南京/Nanjing|Nanjing;西安/Xi'an|Xi'an;东京/Tokyo|Tokyo;伦敦/London|London;纽约/New York|New York;巴黎/Paris|Paris;新加坡/Singapore|Singapore;香港/Hong Kong|Hong Kong`;
const venues=`公园/park|the park;超市/supermarket|the supermarket;商场/mall|the mall;医院/hospital|the hospital;药店/pharmacy|the pharmacy;便利店/convenience store|a convenience store;书店/bookstore|a bookstore;银行/bank|the bank;机场/airport|the airport;车站/station|the station;地铁站/subway station|the subway station;餐厅/restaurant|a restaurant;咖啡店/咖啡馆/coffee shop|a coffee shop;电影院/cinema|the cinema;健身房/gym|the gym;游泳馆/pool|the pool;学校/school|school;办公室/office|the office;博物馆/museum|the museum;图书馆/library|the library;邮局/post office|the post office;酒店/hotel|the hotel;警察局/police station|the police station;海边/beach|the beach`;
const measureMap={'外套':'件','毛衣':'件','衬衫':'件','裤子':'条','鞋子':'双','运动鞋':'双','袜子':'双','帽子':'顶','围巾':'条','手套':'双','雨伞':'把','书':'本','笔':'支','笔记本':'本','手机':'部','电脑':'台','耳机':'副','充电器':'个','充电宝':'个','牙刷':'支','牙膏':'支','洗发水':'瓶','洗衣液':'瓶','纸巾':'包','背包':'个','行李箱':'个','眼镜':'副','礼物':'份','花':'束'};
const parse=txt=>txt.split(';').map(s=>{const [aliases,en]=s.split('|');const variants=aliases.split('/');for(const a of [...variants])if(measureMap[a])variants.push('一'+measureMap[a]+a);return {aliases:variants,en};});
export function generateObjects(){const rows=[];const add=(category,obj,forms)=>{for(const [patterns,en,reply] of forms){const aliases=obj.aliases.flatMap(z=>patterns.map(p=>p(z)));rows.push({category,zh:aliases[0],aliases,en,reply,source:'template'});}};
 const quantified=[['一件衣服','an item of clothing'],['两件衣服','two items of clothing'],['一双鞋','a pair of shoes'],['一副耳机','a pair of headphones'],['一本书','a book'],['一瓶牛奶','a bottle of milk'],['两瓶牛奶','two bottles of milk'],['一杯咖啡','a cup of coffee'],['一杯拿铁','a latte'],['一杯水','a glass of water'],['一瓶水','a bottle of water'],['两瓶水','two bottles of water'],['一杯奶茶','a cup of milk tea'],['一杯茶','a cup of tea'],['一碗面条','a bowl of noodles'],['一碗米饭','a bowl of rice'],['一份沙拉','a salad'],['一个汉堡','a burger'],['一个三明治','a sandwich'],['一块蛋糕','a slice of cake']];
 for(const [zh,en] of quantified)add('数量点单',{aliases:[zh],en},[
 [[z=>`我想要${z}`,z=>`我要${z}`,z=>`来${z}`],`I'd like ${en}, please.`,'Got it. Anything else?'],
 [[z=>`我想买${z}`,z=>`我要买${z}`],`I'd like to buy ${en}.`,'Do you have any particular preferences?'],
 [[z=>`我不想买${z}`],`I don't want to buy ${en}.`,'What would you prefer instead?']
 ]);
 for(const o of parse(foods))add('吃饭饮食',o,[
 [[z=>`我想吃${z}`,z=>`我想要吃${z}`,z=>`想吃${z}`],`I'd like some ${o.en}.`,'What kind of meal are you in the mood for?'],
 [[z=>`我不想吃${z}`,z=>`不想吃${z}`],`I don't want to eat ${o.en}.`,'What would you prefer instead?'],
 [[z=>`我不吃${z}`,z=>`不吃${z}`],`I don't eat ${o.en}.`,'Got it. What would you like instead?'],
 [[z=>`我喜欢吃${z}`,z=>`我喜欢${z}`],`I like ${o.en}.`,'What do you like about it?'],
 [[z=>`我不喜欢吃${z}`,z=>`我不喜欢${z}`],`I don't like ${o.en}.`,'What do you prefer instead?'],
 [[z=>`我对${z}过敏`],`I'm allergic to ${o.en}.`,'Thanks for letting me know. Make sure the staff know too.'],
 [[z=>`你喜欢吃${z}吗`,z=>`你喜欢${z}吗`],`Do you like ${o.en}?`,"I don't eat, but I'd enjoy hearing what you like about it."],
 [[z=>`我昨天吃了${z}`],`I had ${o.en} yesterday.`,'How was it?'],
 [[z=>`我今天吃了${z}`],`I had ${o.en} today.`,'Did you enjoy it?']
 ]);
 for(const o of parse(drinks))add('饮品偏好',o,[
 [[z=>`我想喝${z}`,z=>`我想要${z}`,z=>`我要喝${z}`],`I'd like some ${o.en}.`,'How would you like it?'],
 [[z=>`我不喝${z}`,z=>`不喝${z}`],`I don't drink ${o.en}.`,'What would you prefer instead?'],
 [[z=>`我不想喝${z}`],`I don't want any ${o.en}.`,'What would you like instead?'],
 [[z=>`我喜欢喝${z}`,z=>`我喜欢${z}`],`I like ${o.en}.`,'How do you usually have it?'],
 [[z=>`我不喜欢喝${z}`,z=>`我不喜欢${z}`],`I don't like ${o.en}.`,'What do you usually drink instead?'],
 [[z=>`你想喝${z}吗`],`Would you like some ${o.en}?`,"That's kind of you. I don't drink, but thanks for offering."],
 [[z=>`我昨天喝了${z}`],`I had some ${o.en} yesterday.`,'Did you enjoy it?']
 ]);
 for(const o of parse(things))add('购物物品',o,[
 [[z=>`我想买${z}`,z=>`我要买${z}`],`I'd like to buy ${o.en}.`,'What are you looking for in particular?'],
 [[z=>`我不想买${z}`],`I don't want to buy ${o.en}.`,'Would you prefer something else?'],
 [[z=>`我需要${z}`],`I need ${o.en}.`,'Do you have a particular one in mind?'],
 [[z=>`我不需要${z}`],`I don't need ${o.en}.`,'No problem. What else are you looking for?'],
 [[z=>`我忘带${z}了`,z=>`我忘了带${z}`],`I forgot to bring ${o.en}.`,"That's annoying. Is there a way to get what you need?"],
 [[z=>`我买了${z}`],`I bought ${o.en}.`,'Nice! How do you like it?'],
 [[z=>`我昨天买了${z}`],`I bought ${o.en} yesterday.`,'Are you happy with it?']
 ]);
 for(const o of parse(places))add('城市出行',o,[
 [[z=>`我想去${z}`,z=>`我打算去${z}`],`I'd like to go to ${o.en}.`,'What would you like to do there?'],
 [[z=>`我住在${z}`],`I live in ${o.en}.`,'What do you like about living there?'],
 [[z=>`我来自${z}`],`I'm from ${o.en}.`,'What is it like there?'],
 [[z=>`我需要一张去${z}的票`,z=>`我要一张去${z}的票`],`I'd like a ticket to ${o.en}.`,'What date would you like to travel?'],
 [[z=>`我明天去${z}`],`I'm going to ${o.en} tomorrow.`,'What are you planning to do there?'],
 [[z=>`我不想去${z}`],`I don't want to go to ${o.en}.`,'Where would you prefer to go?']
 ]);
 for(const o of parse(venues))add('地点问路',o,[
 [[z=>`我想去${z}`,z=>`我要去${z}`,z=>`我打算去${z}`],`I want to go to ${o.en}.`,'What would you like to do there?'],
 [[z=>`我不想去${z}`],`I don't want to go to ${o.en}.`,'Where would you prefer to go?'],
 [[z=>`我明天去${z}`],`I'm going to ${o.en} tomorrow.`,'What are you planning to do there?'],
 [[z=>`我昨天去了${z}`],`I went to ${o.en} yesterday.`,'How was it?'],
 [[z=>`我在${z}`],`I'm at ${o.en}.`,'How is it there?'],
 [[z=>`怎么去${z}`,z=>`去${z}怎么走`,z=>`${z}怎么走`],`How do I get to ${o.en}?`,"I don't have live map access. A map app or someone nearby can help with directions."],
 [[z=>`你想去${z}吗`],`Would you like to go to ${o.en}?`,"I can't go places, but I'd be happy to chat about your plans."],
 [[z=>`我刚从${z}回来`],`I just got back from ${o.en}.`,'How was your visit?']
 ]);
 return rows;
}
