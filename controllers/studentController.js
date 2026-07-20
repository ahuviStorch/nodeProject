// src/controllers/studentController.js
import * as studentService from '../services/studentService.js';
import { ApiResponse } from '../utils/apiResponse.js';

// בקר לקבלת כל התלמידים
export const getStudentsHandler = (req, res, next) => {
  try {
    const data = studentService.fetchAllStudents();
    res.json(ApiResponse.success(data));
  } catch (err) {
    next(err);
  }
};

// בקר לקבלת תלמיד בודד לפי מזהה
export const getStudentByIdHandler = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('מזהה הנתב חייב להיות מספר שלם תקין');
      err.status = 400;
      throw err;
    }
    const data = studentService.fetchStudentById(id);
    res.json(ApiResponse.success(data));
  } catch (err) {
    next(err);
  }
};

// בקר ליצירת תלמיד חדש
export const createStudentHandler = (req, res, next) => {
  try {
    const { name, age } = req.body;
    const data = studentService.addStudent(name, age);
    res.status(201).json(ApiResponse.success(data, 'התלמיד נוצר בהצלחה'));
  } catch (err) {
    next(err);
  }
};

// בקר לעדכון תלמיד קיים
export const updateStudentHandler = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('מזהה הנתב חייב להיות מספר שלם תקין');
      err.status = 400;
      throw err;
    }
    const { name, age } = req.body;
    const data = studentService.editStudent(id, name, age);
    res.json(ApiResponse.success(data, 'נתוני התלמיד עודכנו בהצלחה'));
  } catch (err) {
    next(err);
  }
};

// בקר למחיקת תלמיד קיים
export const deleteStudentHandler = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) {
      const err = new Error('מזהה הנתב חייב להיות מספר שלם תקין');
      err.status = 400;
      throw err;
    }
    const result = studentService.removeStudent(id);
    res.json(ApiResponse.success(null, result.message));
  } catch (err) {
    next(err);
  }
};