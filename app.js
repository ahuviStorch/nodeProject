// app.js
import express from 'express';
import mainRouter from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Middleware גלובלי לפענוח גוף בקשה בפורמט JSON
app.use(express.json());

// רישום הנתב המרכזי המאחד את כל הישויות תחת נתיב העל /api
app.use('/api', mainRouter);

// טיפול בנתיבים שאינם קיימים בשרת - 404 Not Found
app.use((req, res, next) => {
  const error = new Error(`הנתיב המבוקש ${req.originalUrl} לא נמצא בשרת`);
  error.status = 404;
  next(error);
});

// החלת רכיב הטיפול המרכזי בשגיאות בסוף צינור העיבוד
app.use(errorHandler);

export default app;