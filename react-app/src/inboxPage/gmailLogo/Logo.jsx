import React from 'react';
import '../TopBar.css';
import gmailIcon from './gmail.png';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={gmailIcon} alt="Gmail logo" className="gmail-icon" />
      <span className="gmail-text">Gmail</span>
    </div>
  );
};

export default Logo;
