// src/utils/apiResponse.js

export class ApiResponse {
  /**
   * מייצר אובייקט תגובה אחיד להצלחה
   * @param {any} data - המידע המוחזר מהשירות
   * @param {string} message - הודעה נלווית אופציונלית
   */
  static success(data = null, message = 'הפעולה בוצעה בהצלחה') {
    return {
      success: true,
      message,
      data
    };
  }
}