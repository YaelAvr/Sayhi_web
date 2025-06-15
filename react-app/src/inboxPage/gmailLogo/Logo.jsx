import React from 'react';
import '../TopBar.css';
import gmailIcon from './sayHiLogo.svg';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={gmailIcon} alt="Gmail logo" className="gmail-icon" />
    </div>
  );
};

export default Logo;
