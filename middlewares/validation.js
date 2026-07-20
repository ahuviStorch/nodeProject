// src/middlewares/validation.js

export const validateFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    const typeMismatches = [];

    for (const field of requiredFields) {
      const value = req.body[field];

      if (value === undefined || value === null || value === '') {
        missingFields.push(field);
        continue;
      }

      if (field.endsWith('Id') || field === 'age') {
        if (typeof value !== 'number' || Number.isNaN(value)) {
          typeMismatches.push(`${field} חייב להיות מספר תקין`);
        }
      }
    }

    if (missingFields.length > 0 || typeMismatches.length > 0) {
      const errorMessages = [];
      if (missingFields.length > 0) errorMessages.push(`שדות חסרים: ${missingFields.join(', ')}`);
      if (typeMismatches.length > 0) errorMessages.push(`שגיאות טיפוס: ${typeMismatches.join('; ')}`);
      
      const error = new Error(errorMessages.join(' | '));
      error.status = 400;
      return next(error);
    }

    next();
  };
};