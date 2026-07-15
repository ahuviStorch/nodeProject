const express = require('express');
const chalk = require('chalk');

const app = express();
const port = 3000;

app.use(express.json());

// קובצי הנתונים (מיוצגים כאן כמערכים מקומיים בזיכרון)
let courses = [
  { id: 1, name: 'פיתוח אפליקציות', description: 'קורס פיתוח ב-React Native' },
  { id: 2, name: 'בניית אתרים', description: 'קורס Fullstack ב-Node.js ו-React' }
];

let students = [
  { id: 1, name: 'ישראל ישראלי', age: 25 },
  { id: 2, name: 'שרה לוי', age: 22 }
];

let enrollments = [
  { id: 1, studentId: 1, courseId: 1 }
];

// ==========================================
// ייעול מס' 2: פונקציה גנרית ליצירת מזהה ייחודי (DRY)
// ==========================================
const getNextId = (array) => {
  return array.length > 0 ? Math.max(...array.map(item => item.id)) + 1 : 1;
};

// ==========================================
// ייעול מס' 4: Middleware גנרי לוולידציה של שדות חובה
// ==========================================
const validateFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      const error = new Error(`השדות הבאים חסרים בגוף הבקשה: ${missingFields.join(', ')}`);
      error.status = 400;
      return next(error); // שולח ישירות לטיפול השגיאות המרכזי
    }

    next(); // הכל תקין, ממשיכים לנתיב
  };
};

// ==========================================
// נתיב ראשי
// ==========================================
app.get('/', (req, res) => {
  res.json({ status: 'working', message: 'השרת פועל בהצלחה!' });
});

// ==========================================
// נתיבי קורסים (Courses)
// ==========================================
app.get('/courses', (req, res) => {
  res.json(courses);
});

app.get('/courses/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);
    if (!course) {
      const err = new Error(`קורס עם מזהה ${id} לא נמצא`);
      err.status = 404;
      throw err;
    }
    res.json(course);
  } catch (err) {
    next(err);
  }
});

// שימוש ב-Middleware לוולידציה של שדה חובה 'name'
app.post('/courses', validateFields(['name']), (req, res, next) => {
  try {
    const { name, description } = req.body;
    
    // שימוש בפונקציית העזר ליצירת מזהה
    const newId = getNextId(courses);
    const newCourse = { id: newId, name, description: description || '' };
    
    courses.push(newCourse);
    res.status(201).json(newCourse);
  } catch (err) {
    next(err);
  }
});

app.put('/courses/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    const index = courses.findIndex(c => c.id === id);
    
    if (index === -1) {
      const err = new Error(`קורס עם מזהה ${id} לא נמצא לעדכון`);
      err.status = 404;
      throw err;
    }

    courses[index] = {
      id,
      name: name || courses[index].name,
      description: description !== undefined ? description : courses[index].description
    };

    res.json(courses[index]);
  } catch (err) {
    next(err);
  }
});

app.delete('/courses/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = courses.findIndex(c => c.id === id);
    
    if (index === -1) {
      const err = new Error(`קורס עם מזהה ${id} לא נמצא למחיקה`);
      err.status = 404;
      throw err;
    }

    courses.splice(index, 1);
    enrollments = enrollments.filter(e => e.courseId !== id); // מחיקת רישומים משויכים
    
    res.json({ message: 'הקורס והרישומים המשויכים אליו נמחקו בהצלחה' });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// נתיבי תלמידים (Students)
// ==========================================
app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) {
      const err = new Error(`תלמיד עם מזהה ${id} לא נמצא`);
      err.status = 404;
      throw err;
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// שימוש ב-Middleware לוולידציה של שדה חובה 'name'
app.post('/students', validateFields(['name']), (req, res, next) => {
  try {
    const { name, age } = req.body;
    
    // שימוש בפונקציית העזר ליצירת מזהה
    const newId = getNextId(students);
    const newStudent = { id: newId, name, age: age || null };
    
    students.push(newStudent);
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
});

app.put('/students/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, age } = req.body;
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
      const err = new Error(`תלמיד עם מזהה ${id} לא נמצא לעדכון`);
      err.status = 404;
      throw err;
    }

    students[index] = {
      id,
      name: name || students[index].name,
      age: age !== undefined ? age : students[index].age
    };

    res.json(students[index]);
  } catch (err) {
    next(err);
  }
});

app.delete('/students/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
      const err = new Error(`תלמיד עם מזהה ${id} לא נמצא למחיקה`);
      err.status = 404;
      throw err;
    }

    students.splice(index, 1);
    enrollments = enrollments.filter(e => e.studentId !== id); // מחיקת רישומים משויכים
    
    res.json({ message: 'התלמיד והרישומים המשויכים אליו נמחקו בהצלחה' });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// נתיבי רישומים (Enrollments)
// ==========================================
app.get('/enrollments', (req, res) => {
  res.json(enrollments);
});

app.get('/enrollments/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const enrollment = enrollments.find(e => e.id === id);
    if (!enrollment) {
      const err = new Error(`רישום עם מזהה ${id} לא נמצא`);
      err.status = 404;
      throw err;
    }
    res.json(enrollment);
  } catch (err) {
    next(err);
  }
});

// שימוש ב-Middleware לוולידציה של השדות 'studentId' ו-'courseId'
app.post('/enrollments', validateFields(['studentId', 'courseId']), (req, res, next) => {
  try {
    const { studentId, courseId } = req.body;

    const studentExists = students.some(s => s.id === studentId);
    const courseExists = courses.some(c => c.id === courseId);

    if (!studentExists || !courseExists) {
      const err = new Error('התלמיד או הקורס שצוינו אינם קיימים במערכת');
      err.status = 400;
      throw err;
    }

    const alreadyEnrolled = enrollments.some(e => e.studentId === studentId && e.courseId === courseId);
    if (alreadyEnrolled) {
      const err = new Error('התלמיד כבר רשום לקורס זה');
      err.status = 400;
      throw err;
    }

    // שימוש בפונקציית העזר ליצירת מזהה
    const newId = getNextId(enrollments);
    const newEnrollment = { id: newId, studentId, courseId };
    
    enrollments.push(newEnrollment);
    res.status(201).json(newEnrollment);
  } catch (err) {
    next(err);
  }
});

app.put('/enrollments/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { studentId, courseId } = req.body;
    const index = enrollments.findIndex(e => e.id === id);

    if (index === -1) {
      const err = new Error(`רישום עם מזהה ${id} לא נמצא לעדכון`);
      err.status = 404;
      throw err;
    }

    if (studentId && !students.some(s => s.id === studentId)) {
      const err = new Error('התלמיד המעודכן אינו קיים במערכת');
      err.status = 400;
      throw err;
    }

    if (courseId && !courses.some(c => c.id === courseId)) {
      const err = new Error('הקורס המעודכן אינו קיים במערכת');
      err.status = 400;
      throw err;
    }

    enrollments[index] = {
      id,
      studentId: studentId || enrollments[index].studentId,
      courseId: courseId || enrollments[index].courseId
    };

    res.json(enrollments[index]);
  } catch (err) {
    next(err);
  }
});

app.delete('/enrollments/:id', (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = enrollments.findIndex(e => e.id === id);

    if (index === -1) {
      const err = new Error(`רישום עם מזהה ${id} לא נמצא למחיקה`);
      err.status = 404;
      throw err;
    }

    enrollments.splice(index, 1);
    res.json({ message: 'הרישום בוטל ונמחק בהצלחה' });
  } catch (err) {
    next(err);
  }
});

// ==========================================
// ה-Middleware המרכזי לטיפול בשגיאות
// ==========================================
app.use((err, req, res, next) => {
  console.error(chalk.red(`[Error Handler] שגיאה: ${err.message}`));

  const status = err.status || 500;
  const message = err.message || 'שגיאת שרת פנימית';

  res.status(status).json({
    error: {
      status,
      message
    }
  });
});

// ==========================================
// הפעלת השרת
// ==========================================
app.listen(port, () => {
  console.log(chalk.green(`✓ השרת רץ בהצלחה על http://localhost:${port}`));
});