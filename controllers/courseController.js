import * as courseService from '../services/courseService.js';
import { ApiResponse } from '../utils/apiResponse.js';

// לקבלת כל הקורסים
export const getCoursesHandler = (req, res, next) => {
  try {
    const data = courseService.fetchAllCourses();
    res.json(ApiResponse.success(data));
  } catch (err) {
    next(err);
  }
};

// ליצירת קורס חדש
export const createCourseHandler = (req, res, next) => {
  try {
    const { name, description } = req.body;
    const data = courseService.addCourse(name, description);
    res.status(201).json(ApiResponse.success(data, 'הקורס נוצר בהצלחה'));
  } catch (err) {
    next(err);
  }
};

// למחיקת קורס קיים
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

// הרשמת סטודנט לקורס (הפונקציה שהייתה חסרה)
export const enrollStudentHandler = (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id);
    const { studentId } = req.body;

    if (Number.isNaN(courseId) || !studentId) {
      const err = new Error('מזהה קורס או סטודנט לא תקינים');
      err.status = 400;
      throw err;
    }

    const data = courseService.enrollStudentToCourse(courseId, studentId);
    res.json(ApiResponse.success(data, 'הסטודנט נרשם לקורס בהצלחה'));
  } catch (err) {
    next(err);
  }
};

// ביטול הרשמת סטודנט מקורס (הפונקציה שהייתה חסרה)
export const unenrollStudentHandler = (req, res, next) => {
  try {
    const courseId = parseInt(req.params.id);
    const { studentId } = req.body;

    if (Number.isNaN(courseId) || !studentId) {
      const err = new Error('מזהה קורס או סטודנט לא תקינים');
      err.status = 400;
      throw err;
    }

    const data = courseService.removeStudentFromCourse(courseId, studentId);
    res.json(ApiResponse.success(data, 'הסטודנט הוסר מהקורס בהצלחה'));
  } catch (err) {
    next(err);
  }
};