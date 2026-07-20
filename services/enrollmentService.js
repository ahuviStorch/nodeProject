// src/services/enrollmentService.js
import { getEnrollmentsState, getStudentsState, getCoursesState, saveEnrollment, updateEnrollmentState, deleteEnrollmentFromState } from '../data/db.js';
import { getNextId } from '../utils/idGenerator.js';

export const fetchAllEnrollments = () => getEnrollmentsState();

export const fetchEnrollmentById = (id) => {
  const enrollments = getEnrollmentsState();
  const enrollment = enrollments.find(e => e.id === id);
  if (!enrollment) {
    const err = new Error(`רישום עם מזהה ${id} לא נמצא`);
    err.status = 404;
    throw err;
  }
  return enrollment;
};

export const addEnrollment = (studentId, courseId) => {
  const students = getStudentsState();
  const courses = getCoursesState();
  const enrollments = getEnrollmentsState();

  // בדיקת שלמות נתונים: האם הישויות קיימות במערכת
  const studentExists = students.some(s => s.id === studentId);
  const courseExists = courses.some(c => c.id === courseId);

  if (!studentExists || !courseExists) {
    const err = new Error('התלמיד או הקורס שצוינו אינם קיימים במערכת');
    err.status = 400;
    throw err;
  }

  // מניעת כפל רישומים
  const alreadyEnrolled = enrollments.some(e => e.studentId === studentId && e.courseId === courseId);
  if (alreadyEnrolled) {
    const err = new Error('התלמיד כבר רשום לקורס זה');
    err.status = 400;
    throw err;
  }

  const newId = getNextId(enrollments);
  const newEnrollment = { id: newId, studentId, courseId };
  saveEnrollment(newEnrollment);
  return newEnrollment;
};

export const editEnrollment = (id, studentId, courseId) => {
  const enrollments = getEnrollmentsState();
  const index = enrollments.findIndex(e => e.id === id);
  if (index === -1) {
    const err = new Error(`רישום עם מזהה ${id} לא נמצא לעדכון`);
    err.status = 404;
    throw err;
  }

  // ולידציה על מזהה תלמיד חדש אם נשלח
  if (studentId && !getStudentsState().some(s => s.id === studentId)) {
    const err = new Error('התלמיד המעודכן אינו קיים במערכת');
    err.status = 400;
    throw err;
  }

  // ולידציה על מזהה קורס חדש אם נשלח
  if (courseId && !getCoursesState().some(c => c.id === courseId)) {
    const err = new Error('הקורס המעודכן אינו קיים במערכת');
    err.status = 400;
    throw err;
  }

  const updatedEnrollment = {
    ...enrollments[index],
    studentId: studentId ?? enrollments[index].studentId,
    courseId: courseId ?? enrollments[index].courseId
  };
  
  updateEnrollmentState(index, updatedEnrollment);
  return updatedEnrollment;
};

export const removeEnrollment = (id) => {
  const enrollments = getEnrollmentsState();
  const index = enrollments.findIndex(e => e.id === id);
  if (index === -1) {
    const err = new Error(`רישום עם מזהה ${id} לא נמצא למחיקה`);
    err.status = 404;
    throw err;
  }
  deleteEnrollmentFromState(index);
  return { message: 'הרישום בוטל ונמחק בהצלחה' };
};