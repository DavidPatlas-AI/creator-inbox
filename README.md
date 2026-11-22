# תיבת התגובות של היוצר (דמו)

**עברית** · [English](#english)

![Status](https://img.shields.io/badge/status-demo-d4a843) ![Data](https://img.shields.io/badge/data-fictional-14213d)

> כל השמות, ההודעות והמספרים בדמו הזה בדויים. אין כאן חשבונות, כתובות דוא״ל, תמונות של אנשים, או מפתחות. הדמו לא מתחבר לרשת חברתית ולא שולח שום דבר.

הדף נפתח בעברית, מימין לשמאל. אפשר לעבור לרוסית בכפתור למעלה.

## מה התיבה עושה היום

### איסוף
התגובות נאספות מהרשתות של היוצר **פעמיים ביום, בימים ראשון עד חמישי, בשעה 09:22 ובשעה 19:22**.

כרגע **רק יוטיוב נאסף אוטומטית**. שאר הרשתות ממתינות למפתחות API. בדמו אין מפתחות: פס האיסוף מראה את המצב, בלי להתחבר לשום מקום.

### כל תגובה
לכל תגובה רואים שלושה דברים:

1. את **הטקסט המקורי**, לרוב ברוסית ולפעמים באנגלית.
2. **תרגום לעברית** מתחת למקור.
3. **טיוטת תשובה** שאפשר לערוך.

### אישור בשני שלבים
שום פעולה לא מתבצעת לבד.

1. בודק אחד בוחר **באייפון**: תשובה, לייק, מחיקה או דילוג. הבחירה נשמרת, ועדיין לא מתבצעת.
2. בודק שני מאשר **במחשב**. רק אחרי האישור הזה הפעולה מתבצעת.

בדמו שני השלבים נמצאים באותו דף. המתג למעלה עובר בין «בחירה בטלפון» ל«אישור במחשב». «אשר ובצע» פעיל רק בשלב המחשב, והביצוע הוא סימון בתוך הדמו בלבד.

### גיליון וסטטיסטיקה
יש **גיליון יומי** ו**גיליון שבועי**, ומסך **סטטיסטיקה של הערוץ**. המספרים בדמו בדויים, והם לא מתעדכנים מאיסוף.

## בקרוב

הפריטים האלה מסומנים במסך **בקרוב**. הם לא פועלים בדמו.

1. **מילון ביטויים מובנה**, בלי תשלום ובלי שירות חיצוני. בזמן האיסוף הוא מתרגם ביטויים נפוצים מרוסית ומאנגלית לעברית.
2. **סיווג אוטומטי**: תודה, ברכה, שאלה, ביקורת, רגיש, עם תשובות מוכנות. בתשובות האלה משתמשים ב-❤️.
3. **מצב «מוחזק»** לפריט, כדי שהפעולה שנבחרה לא תבוצע.
4. **מספרי הערוץ מתעדכנים אוטומטית** בכל איסוף.
5. **סטטוס איסוף לכל רשת**, כולל המצב **«חלקי»** כשנאספו רק חלק מהרשתות.

## איך הדמו עובד

- `index.html` הוא דף התיבה.
- `demo-api.js` עונה ל-`/api/*` מתוך `localStorage`, עם תגובות בדויות. כל לחיצה נשמרת בדפדפן. **איפוס** בפינה מחזיר את המצב ההתחלתי.
- `collection.json` הוא צילום בדוי של לוח האיסוף. `digest.json` הוא הגיליון היומי, ו-`editions/2026-11-01.json` הוא הגיליון השבועי. `stats.json` הוא סטטיסטיקת ערוץ בדויה.
- במסך נשארו גם פריסות לדוגמה, עם נתונים בדויים: הודעות פרטיות, מועדון, ונושאים לשיעור. האיסוף האוטומטי, כמו בתיבה עצמה, הוא תגובות יוטיוב בלבד.

להרצה מקומית:

```
python -m http.server 8080
```

ואז לפתוח את `http://localhost:8080`.

---

## English

Public demo of a creator comment inbox. Every name, message, and number is fictional. The page does not connect to a social network and does not send anything.

**Today:** comments are collected twice a day, Sunday–Thursday, at 09:22 and 19:22. Only YouTube is collected automatically; the other networks are waiting on API keys. Each comment shows the original text (often Russian), a Hebrew translation below it, and an editable draft reply. One reviewer chooses on an iPhone — reply, like, delete, or skip — and a second reviewer approves on a desktop. The action runs only after that second approval. There is a daily sheet, a weekly sheet, and channel statistics.

**Coming soon:** a free built-in phrase dictionary (no external service), auto-classification with ready replies marked ❤️, a held state that blocks execution, channel numbers refreshed on every collection, and per-network status including “partial”.

Hebrew is the default, right to left. Use the phone / desktop switch to walk both approval steps, and **איפוס** to reset. Run `python -m http.server 8080` and open `http://localhost:8080`.
