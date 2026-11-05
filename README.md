# Creator Inbox: תיבת ההודעות של היוצר (דמו)

**עברית** · [English](#english)

![Status](https://img.shields.io/badge/status-demo-d4a843) ![Data](https://img.shields.io/badge/data-fictional-14213d)

> כל השמות, ההודעות והמספרים בדמו הזה בדויים. הכלי נבנה במקור לרב שמלמד תורה ברוסית, עם יותר מ-20 אלף עוקבים. הגרסה האמיתית שלו לא נמצאת בריפו הזה.

## הבעיה
יוצר תוכן, למשל רב שמלמד ביוטיוב, בטיקטוק, באינסטגרם, בטלגרם ובפייסבוק מקבל כל יום עשרות תגובות והודעות פרטיות, ברוסית ובעברית. חלקן שאלות אישיות שמחכות לתשובה, חלקן תודות, וחלקן תגובות שנאה. הוא אינו אדם טכני, ולפתוח חמש אפליקציות כל יום זה לא מעשי.

## הפתרון
דף אחד בטלפון שבו היוצר **רק מחליט**:
- כל ההודעות מכל הרשתות במקום אחד, ממוינות: הודעות פרטיות, שאלות אישיות, שאלות, "רוצה ללמוד", תודות, ותגובות עוינות בנפרד.
- לכל הודעה יש **תשובה מוצעת** שאפשר לערוך, וכפתור אחד: לענות, לייק, אחר כך, לדלג או למחוק.
- הודעה פרטית שמחכה יותר משלושה ימים מסומנת **🔥 דחוף**.
- תיוג **💡 נושא לשיעור** ו-**🎓 מועמד למועדון**, ומעקב אחרי מועמדים עד שהם מצטרפים.
- **📰 עיתון ערב**: כרוניקה קצרה ומשעשעת של היום, עם מצב רוח, ענן מילים ומכתבים נבחרים.
- **📊 הערוץ**: עוקבים בכל רשת, מה עלה היום, רעיונות לסרטונים מהשאלות שחוזרות, והכנסות המועדון.
- ברוסית כברירת מחדל, עם כפתור לעברית. כל ההודעות מתורגמות.
- כפתור **"סיימתי"** שולח לעוזר רשימה של מה לבצע. העוזר (אדם או AI) שולח את התשובות.

## איך הדמו עובד
- `index.html`: אותו דף בדיוק כמו בגרסה האמיתית.
- `demo-api.js` מחליף את השרת: הוא עונה ל-`/api/*` מתוך `localStorage`, עם 22 הודעות בדויות. כל לחיצה נשמרת בדפדפן, ו**איפוס** בפינה מחזיר את המצב ההתחלתי.
- קובצי ה-JSON (`stats`, `digest`, `editions`, `history`) מכילים נתונים בדויים.
- התמונות הן אווטרים עם אות ראשונה, וסמל מעטפה במקום תמונה של הרב.

להרצה מקומית:
```
python -m http.server 8080
```
ואז לפתוח את `http://localhost:8080`.

## בגרסה האמיתית
- Netlify Functions ו-Netlify Blobs: כל המידע ב-blob אחד, כדי שהדף ייטען בקריאה אחת.
- כניסה בקישור אישי חד-פעמי, שמוחלף בעוגייה מסוג HttpOnly/Secure/SameSite=Strict, והגנת CSRF על כל פעולה.
- איסוף תגובות מהרשתות, תרגום וניסוח תשובות מוצעות בעזרת AI, ושום דבר לא נשלח בלי אישור.

---

## English

**One phone page where a non-technical creator decides what to do with every comment, and an assistant does the rest.**

> Every name, message and number in this demo is invented. The tool was first built for a rabbi who teaches in Russian and has over 20,000 followers; his live inbox is not part of this repo.

**The problem:** dozens of comments and DMs a day, in Russian and Hebrew, across YouTube, TikTok, Instagram, Telegram and Facebook. Some are personal questions waiting for an answer, some are thanks, some are hate.

**The solution:** a single mobile page. Messages are grouped (DMs, personal questions, questions, "wants to learn", thanks, hostile). Each one comes with an editable suggested reply and one-tap actions: reply, like, later, skip, delete. Old DMs are flagged urgent. Lesson ideas and club candidates are tagged and tracked. An evening "newspaper" sums up the day, and a channel screen shows followers, today's posts, recurring questions and club income. Russian first, with a Hebrew toggle.

**The demo:** the real `index.html`, plus `demo-api.js`, which answers `/api/*` from `localStorage` with 22 invented messages. Use **reset** in the corner to start over. Run `python -m http.server 8080` and open `http://localhost:8080`.

**In production:** Netlify Functions and Netlify Blobs, a one-time personal link exchanged for an HttpOnly/Secure/SameSite=Strict cookie, CSRF checks, and AI translation and reply drafts. Nothing is sent without approval.
