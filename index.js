const express = require('express');
const chalk = require('chalk');

const app = express();
const port = 3000;

// ייבוא הנתונים מהקבצים השונים
const courses = require('./courses');
const students = require('./students');

// נתיב ראשי (http://localhost:3000)
app.get('/', (req, res) => {
  res.json({
    status: 'working',
    message: 'השרת עובד בהצלחה!'
  });
});

// נתיב קורסים (http://localhost:3000/courses)
app.get('/courses', (req, res) => {
  res.json(courses);
});

// נתיב תלמידים (http://localhost:3000/students)
app.get('/students', (req, res) => {
  res.json(students);
});

// הפעלת השרת והדפסה צבעונית בטרמינל
app.listen(port, () => {
  console.log(chalk.green(`✓ השרת רץ בהצלחה על http://localhost:${port}`));
  
  console.log(chalk.yellow('רשימת הקורסים שנטענו לפרויקט:'));
  for (const course of courses) {
    console.log(chalk.blue(`[${course.id}]`) + ` ${course.name} - ` + chalk.cyan(course.description));
  }
});