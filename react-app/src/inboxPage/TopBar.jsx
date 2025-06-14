import React from 'react';
import './TopBar.css';
import Logo from './gmailLogo/Logo';
import SearchBar from './searchBar/SearchBar';

const TopBar = () => {
  const handleLogout = () => {
    // delete the token from localStorage
    localStorage.removeItem('token');
    alert("Logged out."); // ניתוב לעמוד כניסה
    // window.location.href = '/login'; // Redirect to login page
  }
  return (
       <div className="topbar-container">
      <div className="topbar">
        <Logo />
        <SearchBar />
      </div>
      {/* כאן יהיו כפתורי theme, תמונה, התנתקות וכו' */}

      {/* צריך לבדוק שאכן מתנתק אחרי שיש ניטוב טוב */}
      <button onClick={handleLogout}/>
    </div>
  );
};

export default TopBar;
