// src/services/courseService.js
import { getCoursesState, getEnrollmentsState, saveCourse, updateCourseState, deleteCourseFromState, deleteEnrollmentFromState } from '../data/db.js';
import { getNextId } from '../utils/idGenerator.js';

// שליפת כל הקורסים
export const fetchAllCourses = () => getCoursesState();

// שליפת קורס לפי מזהה ייחודי
export const fetchCourseById = (id) => {
  const courses = getCoursesState();
  const course = courses.find(c => c.id === id);
  if (!course) {
    const err = new Error(`קורס עם מזהה ${id} לא נמצא`);
    err.status = 404;
    throw err;
  }
  return course;
};

// הוספת קורס חדש לסטייט
export const addCourse = (name, description) => {
  const courses = getCoursesState();
  const newId = getNextId(courses);
  const newCourse = { id: newId, name, description: description || '' };
  saveCourse(newCourse);
  return newCourse;
};

// עדכון קורס קיים תוך נעילת מזהה מקורי
export const editCourse = (id, name, description) => {
  const courses = getCoursesState();
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) {
    const err = new Error(`קורס עם מזהה ${id} לא נמצא לעדכון`);
    err.status = 404;
    throw err;
  }

  const updatedCourse = {
    ...courses[index],
    name: name || courses[index].name,
    description: description !== undefined ? description : courses[index].description
  };
  
  updateCourseState(index, updatedCourse);
  return updatedCourse;
};

// מחיקת קורס ומחיקה משורשרת (Cascading) של הרישומים אליו באופן בטוח
export const removeCourse = (id) => {
  const courses = getCoursesState();
  const index = courses.findIndex(c => c.id === id);
  if (index === -1) {
    const err = new Error(`קורס עם מזהה ${id} לא נמצא למחיקה`);
    err.status = 404;
    throw err;
  }
  
  deleteCourseFromState(index);
  
  // מחיקה משורשרת בטוחה של רישומים מהסוף להתחלה לשמירה על אינדקסים תקינים
  const enrollments = getEnrollmentsState();
  let i = enrollments.length;
  while (i--) {
    if (enrollments[i].courseId === id) {
      deleteEnrollmentFromState(i);
    }
  }
  
  return { message: 'הקורס והרישומים המשויכים אליו נמחקו בהצלחה' };
};