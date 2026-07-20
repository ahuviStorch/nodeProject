// src/controllers/courseController.js
import * as courseService from '../services/courseService.js';

import { ApiResponse } from '../utils/apiResponse.js';

// בקר לקבלת כל הקורסים
export const getCoursesHandler = (req, res, next) => {
  try {
    const data = courseService.fetchAllCourses();
    res.json(ApiResponse.success(data));
  } catch (err) {
    next(err);
  }
};

// בקר לקבלת קורס בודד לפי מזהה עם אימות טיפוס לנתיב
export const getCourseByIdHandler = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('מזהה הנתב חייב להיות מספר שלם תקין');
      err.status = 400;
      throw err;
    }
    const data = courseService.fetchCourseById(id);
    res.json(ApiResponse.success(data));
  } catch (err) {
    next(err);
  }
};

// בקר ליצירת קורס חדש
export const createCourseHandler = (req, res, next) => {
  try {
    const { name, description } = req.body;
    const data = courseService.addCourse(name, description);
    res.status(201).json(ApiResponse.success(data, 'הקורס נוצר בהצלחה'));
  } catch (err) {
    next(err);
  }
};

// בקר לעדכון קורס קיים
export const updateCourseHandler = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('מזהה הנתב חייב להיות מספר שלם תקין');
      err.status = 400;
      throw err;
    }
    const { name, description } = req.body;
    const data = courseService.editCourse(id, name, description);
    res.json(ApiResponse.success(data, 'הקורס עודכן בהצלחה'));
  } catch (err) {
    next(err);
  }
};

// בקר למחיקת קורס קיים
export const deleteCourseHandler = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('מזהה הנתב חייב להיות מספר שלם תקין');
      err.status = 400;
      throw err;
    }
    const result = courseService.removeCourse(id);
    res.json(ApiResponse.success(null, result.message));
  } catch (err) {
    next(err);
  }
};