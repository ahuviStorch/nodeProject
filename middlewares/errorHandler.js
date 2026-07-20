// src/middlewares/errorHandler.js
import chalk from 'chalk';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'שגיאת שרת פנימית';

  console.error(chalk.red(`[Error ${statusCode}]: ${message}`));
  if (err.stack) {
    console.error(chalk.gray(err.stack));
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
};