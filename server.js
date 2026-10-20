// server.js
// [שינוי בשלב ה-env] טעינת משתני הסביבה מקובץ .env אל process.env.
// חייב להיות המיובא הראשון, לפני כל קוד שקורא process.env.
import 'dotenv/config';
import app from './app.js';
import chalk from 'chalk';

// [שינוי בשלב ה-env] הפורט מגיע ממשתני הסביבה.
// process.env.PORT הוא תמיד מחרוזת; Number מבטיח מספר, ו-|| 3000 מטפל
// במקרה שהמשתנה חסר, ריק או לא תקין (NaN הוא falsy).
const PORT = Number(process.env.PORT) || 3000;

// הפעלת האזנה של השרת לפורט המוגדר
app.listen(PORT, () => {
  console.log(chalk.green(`✓ השרת רץ וזמין בכתובת: http://localhost:${PORT}`));
});
