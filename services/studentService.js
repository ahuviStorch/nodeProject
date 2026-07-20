// src/services/studentService.js
import { getStudentsState, getEnrollmentsState, saveStudent, updateStudentState, deleteStudentFromState, deleteEnrollmentFromState } from '../data/db.js';
import { getNextId } from '../utils/idGenerator.js';

// שליפת כל התלמידים
export const fetchAllStudents = () => getStudentsState();

// שליפת תלמיד לפי מזהה
export const fetchStudentById = (id) => {
  const students = getStudentsState();
  const student = students.find(s => s.id === id);
  if (!student) {
    const err = new Error(`תלמיד עם מזהה ${id} לא נמצא`);
    err.status = 404;
    throw err;
  }
  return student;
};

// הוספת תלמיד חדש לסטייט
export const addStudent = (name, age) => {
  const students = getStudentsState();
  const newId = getNextId(students);
  const newStudent = { id: newId, name, age: age ?? null };
  saveStudent(newStudent);
  return newStudent;
};

// עדכון נתוני תלמיד קיים
export const editStudent = (id, name, age) => {
  const students = getStudentsState();
  const index = students.findIndex(s => s.id === id);
  if (index === -1) {
    const err = new Error(`תלמיד עם מזהה ${id} לא נמצא לעדכון`);
    err.status = 404;
    throw err;
  }

  const updatedStudent = {
    ...students[index],
    name: name || students[index].name,
    age: age ?? students[index].age // הגנה מפני באג הערך 0
  };
  
  updateStudentState(index, updatedStudent);
  return updatedStudent;
};

// מחיקת תלמיד ומחיקה משורשרת של כל הרישומים שלו
export const removeStudent = (id) => {
  const students = getStudentsState();
  const index = students.findIndex(s => s.id === id);
  if (index === -1) {
    const err = new Error(`תלמיד עם מזהה ${id} לא נמצא למחיקה`);
    err.status = 404;
    throw err;
  }
  
  deleteStudentFromState(index);
  
  // ניקוי משורשר של רישומי התלמיד מהסוף להתחלה
  const enrollments = getEnrollmentsState();
  let i = enrollments.length;
  while (i--) {
    if (enrollments[i].studentId === id) {
      deleteEnrollmentFromState(i);
    }
  }
  
  return { message: 'התלמיד והרישומים המשויכים אליו נמחקו בהצלחה' };
};