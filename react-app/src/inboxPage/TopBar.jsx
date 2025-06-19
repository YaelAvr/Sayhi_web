// src/components/TopBar.jsx

import React from 'react';
import Logo from '../gmailLogo/Logo';
import SearchBar from './searchBar/SearchBar';
import './TopBar.css';


// 1. הקומפוננטה מקבלת את onLogout כ-prop
const TopBar = ({ onLogout }) => {

  // 2. אין צורך בפונקציה handleLogout כאן יותר, מחקנו אותה.
  // הלוגיקה עברה לקומפוננטת האב (InboxPage).

  return (
    <div className="topbar-container">
      <div className="topbar">
        <Logo containerClass="topbar-logo-container"/>
        <SearchBar />

        {/* 3. הכפתור עכשיו קורא לפונקציית ה-onLogout שקיבלנו */}
        <button onClick={onLogout}>התנתקות</button>
      </div>
    </div>
  );
};

export default TopBar;