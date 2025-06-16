import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // בודקים אם יש טוקן שמור (ההנחה היא שהוא נשמר בלוגין)
  const token = localStorage.getItem('token'); 

  if (!token) {
    // אם אין טוקן, מעבירים (redirect) את המשתמש לעמוד ההתחברות
    return <Navigate to="/login" replace />;
  }

  // אם יש טוקן, מציגים את הקומפוננטה שהגנה עליה (למשל, InboxPage)
  return children;
};

export default ProtectedRoute;