// src/controllers/enrollmentController.js
import * as enrollmentService from '../services/enrollmentService.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getEnrollmentsHandler = (req, res, next) => {
  try {
    const data = enrollmentService.fetchAllEnrollments();
    res.json(ApiResponse.success(data));
  } catch (err) {
    next(err);
  }
};

export const getEnrollmentByIdHandler = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('מזהה הנתב חייב להיות מספר שלם תקין');
      err.status = 400;
      throw err;
    }
    const data = enrollmentService.fetchEnrollmentById(id);
    res.json(ApiResponse.success(data));
  } catch (err) {
    next(err);
  }
};

export const createEnrollmentHandler = (req, res, next) => {
  try {
    const { studentId, courseId } = req.body;
    const data = enrollmentService.addEnrollment(studentId, courseId);
    res.status(201).json(ApiResponse.success(data, 'הרישום לקורס בוצע בהצלחה'));
  } catch (err) {
    next(err);
  }
};

export const updateEnrollmentHandler = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('מזהה הנתב חייב להיות מספר שלם תקין');
      err.status = 400;
      throw err;
    }
    const { studentId, courseId } = req.body;
    const data = enrollmentService.editEnrollment(id, studentId, courseId);
    res.json(ApiResponse.success(data, 'הרישום עודכן בהצלחה'));
  } catch (err) {
    next(err);
  }
};

export const deleteEnrollmentHandler = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('מזהה הנתב חייב להיות מספר שלם תקין');
      err.status = 400;
      throw err;
    }
    const result = enrollmentService.removeEnrollment(id);
    res.json(ApiResponse.success(null, result.message));
  } catch (err) {
    next(err);
  }
};