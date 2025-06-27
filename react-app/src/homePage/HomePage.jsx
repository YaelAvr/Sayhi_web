import React from "react";
import "./HomePage.css";
import Logo from "../gmailLogo/Logo";
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <Logo />
      <Link to="/login" className="Home-page-btn btn-border-radius">
        Log in
      </Link>
    </div>
  );
};

export default HomePage;