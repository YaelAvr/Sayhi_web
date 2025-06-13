import React from 'react';

const TopBar = () => {
  const handleLogout = () => {
    // delete the token from localStorage
    localStorage.removeItem('token');
    alert("Logged out."); // ניתוב לעמוד כניסה
    // window.location.href = '/login'; // Redirect to login page
  }
  return (
    <div style={{
      height: '60px',
      backgroundColor: '#f1f3f4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1>My Gmail</h1>
      {/* כאן יהיו כפתורי theme, תמונה, התנתקות וכו' */}

      {/* צריך לבדוק שאכן מתנתק אחרי שיש ניטוב טוב */}
      <button onClick={handleLogout}/>
    </div>
  );
};

export default TopBar;
