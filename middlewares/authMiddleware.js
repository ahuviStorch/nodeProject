// בדיקת כותרת אבטחה כללית
export const checkAuthKey = (req, res, next) => {
  const authKey = req.get('auth-key');
  // [שינוי בשלב ה-env] המפתח הסודי נקרא ממשתני הסביבה במקום להיות כתוב בקוד
  const secretValue = process.env.AUTH_SECRET;

  // [שינוי בשלב ה-env] עצירה בשגיאת שרת אם המפתח לא הוגדר כלל —
  // עדיף להיכשל בקול רם מאשר להשוות מול undefined בשקט
  if (!secretValue) {
    return res.status(500).json({
      success: false,
      message: 'Server misconfiguration: AUTH_SECRET is not set.'
    });
  }

  if (!authKey || authKey !== secretValue) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Missing or invalid auth-key header.'
    });
  }
  next();
};

// בדיקת הרשאות מנהל
export const requireAdmin = (req, res, next) => {
  const userId = parseInt(req.get('x-user-id')); 

  // סימולציית משתמשים (עד שיהיה בסיס נתונים מלא)
  const users = [
    { id: 1, username: "student", role: "user" },
    { id: 2, username: "admin", role: "admin" }
  ];

  const user = users.find(u => u.id === userId);

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Forbidden: Admin privileges required.' 
    });
  }

  next();
};