import express from 'express';
import { checkAuthKey, requireAdmin } from '../middlewares/authMiddleware.js';
import * as courseController from '../controllers/courseController.js';

const router = express.Router();

// 🔓 נתיבים ציבוריים
router.get('/', courseController.getCoursesHandler);

// 👥 נתיבי סטודנטים (דורשים אימות מפתח)
router.post('/:id/enroll', checkAuthKey, courseController.enrollStudentHandler);
router.delete('/:id/unenroll', checkAuthKey, courseController.unenrollStudentHandler);

// 🛡️ נתיבי מנהל (דורשים אימות מפתח + הרשאת מנהל)
router.post('/create', checkAuthKey, requireAdmin, courseController.createCourseHandler);
router.delete('/:id', checkAuthKey, requireAdmin, courseController.deleteCourseHandler);

export default router;