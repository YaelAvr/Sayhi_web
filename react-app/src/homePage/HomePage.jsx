import React from "react";
import "./HomePage.css";
import Logo from "../gmailLogo/Logo";
import { Link } from 'react-router-dom'; // 1. מייבאים את Link

const HomePage = () => {
  // 2. אין צורך ב-useNavigate או בפונקציה נוספת כאן

  return (
    <div className="home-page-container">
      <Logo />
      {/* 3. משתמשים ב-Link עם אותו className של הכפתור */}
      <Link to="/login" className="Home-page-btn btn-border-radius">
        Log in
      </Link>
    </div>
  );
};

export default HomePage;