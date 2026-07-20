// src/routes/enrollmentRoutes.js
import express from 'express';
import * as enrollmentController from '../controllers/enrollmentController.js';
import { validateFields } from '../middlewares/validation.js';

const router = express.Router();

// הגדרת הנתיבים והצמדת פונקציות הבקר בעלות השמות האחידים
router.get('/', enrollmentController.getEnrollmentsHandler);
router.get('/:id', enrollmentController.getEnrollmentByIdHandler);
router.post('/', validateFields(['studentId', 'courseId']), enrollmentController.createEnrollmentHandler);
router.put('/:id', enrollmentController.updateEnrollmentHandler);
router.delete('/:id', enrollmentController.deleteEnrollmentHandler);

export default router;