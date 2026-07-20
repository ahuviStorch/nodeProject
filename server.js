// server.js
import app from './app.js';
import chalk from 'chalk';

const PORT = 3000;

// הפעלת האזנה של השרת לפורט המוגדר
app.listen(PORT, () => {
  console.log(chalk.green(`✓ השרת רץ וזמין בכתובת: http://localhost:${PORT}`));
});