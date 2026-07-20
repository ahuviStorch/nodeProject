// src/routes/index.js
import express from 'express';
import courseRoutes from './courseRoutes.js';
import studentRoutes from './studentRoutes.js';
import enrollmentRoutes from './enrollmentRoutes.js';

const mainRouter = express.Router();

// מיפוי נתיבי המשנה לפי ישויות
mainRouter.use('/courses', courseRoutes);
mainRouter.use('/students', studentRoutes);
mainRouter.use('/enrollments', enrollmentRoutes);

export default mainRouter;