import React from "react";
import "./HomePage.css";
import Logo from "../gmailLogo/Logo";
import { Link } from 'react-router-dom'; // 1. מייבאים את Link

const HomePage = () => {
  return (
    <div className="home-page-container">
      <Link to="/login" className="Home-page-btn btn-border-radius">
        Log in
      </Link>
      <Logo />
    </div>
  );
};

export default HomePage;