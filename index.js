const http = require('http');
const chalk = require('chalk');

// מערך של אובייקטי קורסים
const courses = [
  { id: 1, name: 'Node.js למתחילים', description: 'יסודות Node.js, מודולים, שרת HTTP' },
  { id: 2, name: 'Express - מסגרת עבודה', description: 'ניתוב, middleware, ניהול בקשות' },
  { id: 3, name: 'עבודה עם קבצים', description: 'קריאה וכתיבה קבצים, Streams, File System' }
];

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  // בניית רשימת קורסים כ-HTML
  let html = '<h1>רשימת קורסים</h1><ul>';
  for (const course of courses) {
    html += `<li><strong>[${course.id}] ${course.name}</strong>: ${course.description}</li>`;
  }
  html += '</ul>';

  res.end(html);
});

const port = 3000;
server.listen(port, () => {
  console.log(chalk.green('✓ השרת רץ על http://localhost:3000'));
  console.log(chalk.yellow('רשימת הקורסים:'));

  // הדפסת הקורסים בטרמינל בצבעים
  for (const course of courses) {
    console.log(chalk.blue(`[${course.id}]`) + ` ${course.name} - ` + chalk.cyan(course.description));
  }
});

