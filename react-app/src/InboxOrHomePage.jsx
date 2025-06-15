import React from 'react';
import { Navigate } from 'react-router-dom';
import HomePage from './homePage/HomePage';

const HomeLayout = () => {
  // בודקים אם קיים טוקן ב-localStorage
  const token = localStorage.getItem('token'); 

  if (token) {
    // אם יש טוקן, בצע ניווט (redirect) ל- /inbox
    return <Navigate to="/inbox" replace />;
  }

  // אם אין טוקן, הצג את עמוד הבית הרגיל
  return <HomePage />;
};

export default HomeLayout;