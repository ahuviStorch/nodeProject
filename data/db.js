// src/data/db.js

// מערכי המקור הסגורים לגישה ישירה מחוץ לקובץ
const courses = [
  { id: 1, name: 'פיתוח אפליקציות', description: 'קורס פיתוח ב-React Native' },
  { id: 2, name: 'בניית אתרים', description: 'קורס Fullstack ב-Node.js ו-React' }
];

const students = [
  { id: 1, name: 'ישראל ישראלי', age: 25 },
  { id: 2, name: 'שרה לוי', age: 22 }
];

const enrollments = [
  { id: 1, studentId: 1, courseId: 1 }
];

// פונקציות גישה מבוקרות (Getters) המחזירות העתק של המידע למניעת מוטציות בטעות
export const getCoursesState = () => [...courses];
export const getStudentsState = () => [...students];
export const getEnrollmentsState = () => [...enrollments];

// מתודות מבוקרות לשינוי מצב הסטייט (Setters / Mutators)
export const saveCourse = (course) => courses.push(course);
export const saveStudent = (student) => students.push(student);
export const saveEnrollment = (enrollment) => enrollments.push(enrollment);

export const updateCourseState = (index, updatedCourse) => { courses[index] = updatedCourse; };
export const updateStudentState = (index, updatedStudent) => { students[index] = updatedStudent; };
export const updateEnrollmentState = (index, updatedEnrollment) => { enrollments[index] = updatedEnrollment; };

export const deleteCourseFromState = (index) => courses.splice(index, 1);
export const deleteStudentFromState = (index) => students.splice(index, 1);
export const deleteEnrollmentFromState = (index) => enrollments.splice(index, 1);