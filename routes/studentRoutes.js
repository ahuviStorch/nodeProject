// src/routes/studentRoutes.js
import express from 'express';
import * as studentController from '../controllers/studentController.js';
import { validateFields } from '../middlewares/validation.js';

const router = express.Router();

// הגדרת הנתיבים והצמדת פונקציות הבקר בעלות השמות האחידים
router.get('/', studentController.getStudentsHandler);
router.get('/:id', studentController.getStudentByIdHandler);
router.post('/', validateFields(['name']), studentController.createStudentHandler);
router.put('/:id', studentController.updateStudentHandler);
router.delete('/:id', studentController.deleteStudentHandler);

export default router;