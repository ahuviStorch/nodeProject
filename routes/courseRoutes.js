// src/routes/courseRoutes.js
import express from 'express';
import * as courseController from '../controllers/courseController.js';
import { validateFields } from '../middlewares/validation.js';

const router = express.Router();

// הגדרת הנתיבים והצמדת פונקציות הבקר בעלות השמות האחידים
router.get('/', courseController.getCoursesHandler);
router.get('/:id', courseController.getCourseByIdHandler);
router.post('/', validateFields(['name']), courseController.createCourseHandler);
router.put('/:id', courseController.updateCourseHandler);
router.delete('/:id', courseController.deleteCourseHandler);

export default router;