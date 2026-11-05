/* Demo mode for the creator inbox: a fake /api/* backed by localStorage, seeded with invented comments.
   Nothing here is real: every name, message and number is made up for the demo. */
(function(){
  const KEY="inboxDemoDb", H=3600e3;
  const ago=h=>new Date(Date.now()-h*H).toISOString();
  // [hoursAgo, platform, kind, source, cat, author, avatar, text ru, text he, where ru, where he, suggested ru, suggested he, extra]
  const SEED=[
    [5,"youtube","comment","video","R","Михаил Р.","m1","Рав, мой сын хочет начать соблюдать шаббат, а жена против. С чего нам начать, чтобы дома не было ссор?","רב, הבן שלי רוצה להתחיל לשמור שבת ואשתי מתנגדת. במה כדאי להתחיל כדי שלא יהיו מריבות בבית?","Урок: Шаббат — подарок, а не нагрузка","שיעור: השבת היא מתנה, לא עול","Михаил, начните с одного тёплого шаббатнего ужина вместе, без требований. Мир в доме важнее всего. Напишите мне в личку — поговорим подробнее.","מיכאל, התחילו מארוחת שבת אחת חמה ביחד, בלי דרישות. שלום בית חשוב מכול. כתוב לי בפרטי ונדבר יותר.",{urgent:true}],
    [9,"tiktok","comment","short","Q","olga_s","o1","А почему нельзя смешивать мясное и молочное, если в Торе написано только про козлёнка?","למה אסור לערבב בשר וחלב, אם בתורה כתוב רק על הגדי?","Шорт: Три слова, которые изменили кухню","שורט: שלוש מילים ששינו את המטבח","Отличный вопрос! Тора повторяет это трижды, и мудрецы видят в этом три запрета. Подробно разберём в ближайшем уроке.","שאלה מצוינת! התורה חוזרת על זה שלוש פעמים, וחז\"ל רואים בזה שלושה איסורים. נרחיב בשיעור הקרוב.",{idea:true,ideaAt:ago(8)}],
    [30,"instagram","dm","","M","dmitry.k","d1","Здравствуйте! Хочу учиться регулярно, но живу в Германии. Есть ли у вас онлайн-уроки?","שלום! אני רוצה ללמוד באופן קבוע, אבל אני גר בגרמניה. יש לכם שיעורים אונליין?","","","Здравствуйте, Дмитрий! Да — раз в месяц у нас закрытый онлайн-урок для клуба канала. Буду рад видеть вас.","שלום דמיטרי! כן, פעם בחודש יש שיעור אונליין סגור לחברי מועדון הערוץ. אשמח לראות אותך.",{lead:"new",leadAt:ago(29)}],
    [3,"youtube","comment","video","T","Анна Л.","a1","Спасибо за урок! Слушаю каждое утро по дороге на работу. Здоровья вам!","תודה על השיעור! אני מקשיבה כל בוקר בדרך לעבודה. בריאות!","Урок: Сила утренней молитвы","שיעור: הכוח של תפילת הבוקר","Спасибо, Анна! Пусть каждое утро будет добрым.","תודה, אנה! שכל בוקר יהיה טוב."],
    [20,"facebook","comment","video","T","Борис Ш.","b1","Ваши слова о благодарности очень помогли мне после тяжёлой недели.","הדברים שלך על הכרת הטוב מאוד עזרו לי אחרי שבוע קשה.","Урок: Говорить «спасибо» — это искусство","שיעור: לומר תודה זו אומנות","Борис, рад, что слова пришли вовремя. Сил вам и хорошей недели!","בוריס, שמח שהמילים הגיעו בזמן. כוח ושבוע טוב!"],
    [80,"telegram","dm","","Q","Яков","y1","Можно ли читать Теилим за выздоровление друга, если он не еврей?","מותר לקרוא תהילים לרפואת חבר שאינו יהודי?","","","Конечно можно. Молитва за любого человека — это доброе дело. Пусть ваш друг скорее поправится.","בוודאי. תפילה על כל אדם היא מעשה טוב. שחברך יחלים במהרה."],
    [12,"tiktok","comment","short","","user48213","u1","Опять религиозная пропаганда. Лучше бы занимались чем-то полезным.","שוב תעמולה דתית. עדיף שתעסקו במשהו מועיל.","Шорт: Зачем человеку суббота","שורט: למה לאדם שבת","","",{flag:"hostile"}],
    [15,"youtube","comment","video","","anon_critic","x1","Всё это сказки, в это уже никто не верит.","כל זה אגדות, אף אחד כבר לא מאמין בזה.","Урок: Вера и сомнение","שיעור: אמונה וספק","","",{flag:"hostile"}],
    [6,"instagram","dm","story","T","lena.m","l1","❤️ Очень красивые слова в сторис, переслала маме.","❤️ מילים מאוד יפות בסטורי, העברתי לאמא.","","","Спасибо, Лена! Привет маме ❤️","תודה, לנה! ד\"ש לאמא ❤️"],
    [26,"youtube","comment","short","Q","Сергей В.","s1","Рав, а как правильно делать кидуш, если нет вина?","רב, איך עושים קידוש כמו שצריך אם אין יין?","Шорт: Кидуш за одну минуту","שורט: קידוש בדקה אחת","Можно сделать кидуш на халу. Покажу, как именно, в следующем шорте.","אפשר לקדש על החלה. אראה בדיוק איך בשורט הבא.",{idea:true,ideaAt:ago(25)}],
    [40,"email","email","","R","Наталья К.","n1","Добрый день, рав. Хотела бы посвятить урок памяти моего отца. Как это можно сделать?","שלום הרב. הייתי רוצה להקדיש שיעור לעילוי נשמת אבי. איך אפשר לעשות את זה?","","","Наталья, это очень достойное желание. Напишите имя отца и имя его матери — мы посвятим ближайший урок его памяти.","נטליה, זו בקשה מכובדת מאוד. כתבי את שם אביך ואת שם אמו, ונקדיש את השיעור הקרוב לעילוי נשמתו.",{urgent:true}],
    [50,"tiktok","comment","short","M","avi_ru","v1","Как я могу учиться у вас лично?","איך אני יכול ללמוד אצלך אישית?","Шорт: Один вопрос к мудрецу","שורט: שאלה אחת לחכם","","",{lead:"invited",leadAt:ago(30)}],
    [2,"youtube","comment","video","T","Галина","g1","Смотрю из Новосибирска, спасибо за ваш труд!","צופה מנובוסיבירסק, תודה על העבודה שלך!","Урок: Сила утренней молитвы","שיעור: הכוח של תפילת הבוקר","Галина, привет Новосибирску! Спасибо, что вы с нами.","גלינה, ד\"ש לנובוסיבירסק! תודה שאת איתנו."],
    [7,"instagram","comment","reel","Q","mark_levin","k1","Где найти полный урок про Авраама и ангелов?","איפה אפשר למצוא את השיעור המלא על אברהם והמלאכים?","Рилс: Авраам у входа в шатёр","רילס: אברהם בפתח האוהל","Полный урок — на YouTube-канале, ссылка в шапке профиля.","השיעור המלא ביוטיוב, הקישור בביו."],
    [60,"youtube","comment","video","M","Илья П.","i1","Вступил в клуб канала! Что меня там ждёт?","הצטרפתי למועדון הערוץ! מה מחכה לי שם?","Урок: Как учиться каждый день","שיעור: איך ללמוד כל יום","","",{lead:"joined",leadAt:ago(20)}],
    [18,"facebook","comment","video","","Виктор","w1","Слишком длинно, никто не досмотрит до конца.","ארוך מדי, אף אחד לא יראה עד הסוף.","Урок: Вера и сомнение","שיעור: אמונה וספק","Спасибо за честность! Для тех, у кого мало времени, есть короткие шорты на канале.","תודה על הכנות! למי שאין זמן יש שורטים קצרים בערוץ."],
    [48,"youtube","comment","video","Q","Рахель","r1","Какую книгу посоветуете начать читать?","איזה ספר תמליץ להתחיל לקרוא?","Урок: Мудрость отцов","שיעור: חכמת האבות","Начните с «Пиркей Авот» — короткие главы и глубокие мысли.","התחילי מ\"פרקי אבות\": פרקים קצרים ומחשבות עמוקות.",{decision:"reply",decidedAt:ago(46),replyText:"Начните с «Пиркей Авот» — короткие главы и глубокие мысли. Удачи!"}],
    [45,"tiktok","comment","short","T","moshe_kz","z1","Шалом из Алматы!","שלום מאלמטי!","Шорт: Зачем человеку суббота","שורט: למה לאדם שבת","","",{decision:"like",decidedAt:ago(44)}],
    [70,"instagram","dm","","R","tamar.b","t1","Рав, можно задать вопрос о свадьбе дочери? Это долгий разговор.","רב, אפשר לשאול שאלה על החתונה של הבת שלי? זו שיחה ארוכה.","","","Мазаль тов! Конечно, давайте созвонимся на неделе.","מזל טוב! בוודאי, בואי נדבר בטלפון במהלך השבוע.",{decision:"later",decidedAt:ago(60),replyText:""}],
    [100,"youtube","comment","video","T","Ефим","e1","Спасибо, теперь всё понятно!","תודה, עכשיו הכול ברור!","Урок: Мудрость отцов","שיעור: חכמת האבות","","",{decision:"reply",decidedAt:ago(95),replyText:"Рад помочь, Ефим!",status:"done",doneNote:"נשלח ע\"י דוד"}],
    [4,"telegram","comment","video","Q","Лиора","q1","Когда следующий урок в прямом эфире?","מתי השיעור הבא בשידור חי?","Пост: Расписание уроков","פוסט: לוח השיעורים","В четверг в 20:00 по Израилю. Ждём вас!","ביום חמישי ב-20:00 שעון ישראל. מחכים לך!"],
    [18,"youtube","comment","video","Q","Олег","h1","Почему евреи так много спорят?","למה יהודים מתווכחים כל כך הרבה?","Урок: Спор ради Небес","שיעור: מחלוקת לשם שמיים","Потому что спор ради истины — часть учёбы. Об этом будет целый урок!","כי ויכוח לשם האמת הוא חלק מהלימוד. יהיה על זה שיעור שלם!",{idea:true,ideaAt:ago(17)}],
  ];
  function seed(){
    const items={};
    SEED.forEach((r,n)=>{const [h,platform,kind,source,cat,author,ava,text,text_he,where,where_he,suggested,suggested_he,extra]=r;
      items["demo"+(n+1)]={platform,kind,source:source||undefined,cat,author,ava:"ava/"+ava+".jpg",date:ago(h),text,text_he,where:where||undefined,where_he:where_he||undefined,
        url:"#",suggested,suggested_he,status:"new",decision:null,...(extra||{})}});
    const club={total:5,new30:2,cancel30:0,revenue30:180,updated:ago(6),members:[
      {name:"Шломо бен Хана",level:"Друг канала",event:"день рождения 12.11"},{name:"Мирьям бат Эстер",level:"Ученица",event:""},
      {name:"Йосеф бен Лея",level:"Ученик",event:"годовщина свадьбы"},{name:"Рут бат Наоми",level:"Друг канала",event:""},{name:"Эли бен Двора",level:"Ученик",event:"новый участник"}]};
    return {items,club};
  }
  const load=()=>{try{const d=JSON.parse(localStorage.getItem(KEY)||"null");if(d&&d.items)return d}catch(e){}const d=seed();save(d);return d};
  const save=d=>{try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}};
  const ok=b=>new Response(JSON.stringify(b),{status:200,headers:{"content-type":"application/json"}});
  const real=window.fetch.bind(window);
  window.fetch=async(input,init={})=>{
    const url=new URL(typeof input==="string"?input:input.url,location.href);
    if(url.origin!==location.origin||!url.pathname.startsWith("/api/"))return real(input,init);
    const path=url.pathname.slice(5),db=load(),body=init.body?JSON.parse(init.body):{},it=db.items[body.id];
    if(path==="items")return ok({items:Object.entries(db.items).map(([id,v])=>({...v,id})),club:db.club});
    if(path==="login"||path==="logout")return ok({ok:true});
    if(path==="decide"&&it){it.decision=body.decision??null;it.decidedAt=body.decision?new Date().toISOString():null;if(body.decision==="reply"||body.decision==="later")it.replyText=body.replyText||null}
    else if(path==="mark"&&it){it[body.field]=body.value??null;it[body.field+"At"]=body.value?new Date().toISOString():null}
    else if(path==="sent"&&it){if(body.sent===false){it.status="new";it.doneNote=null}else{it.status="done";it.doneNote="נשלח ע\"י דוד"}}
    else if(path==="done"){const c={reply:0,like:0,delete:0,skip:0};Object.values(db.items).forEach(i=>{if(i.decision in c&&i.status!=="done")c[i.decision]++});save(db);return ok({ok:true,notified:false,counts:c})}
    else return new Response('{"error":"unknown"}',{status:404});
    save(db);return ok({ok:true});
  };
  // a small ribbon so nobody mistakes the demo for the real inbox, with a reset
  addEventListener("DOMContentLoaded",()=>{
    const b=document.createElement("div");b.className="demo-ribbon";b.setAttribute("dir","rtl");
    b.innerHTML='<span>דמו · כל השמות וההודעות בדויים · Демо: данные вымышлены</span><button type="button">איפוס</button>';
    b.querySelector("button").onclick=()=>{try{localStorage.removeItem(KEY);localStorage.removeItem("inboxCache")}catch(e){}location.reload()};
    document.body.append(b);
  });
})();
