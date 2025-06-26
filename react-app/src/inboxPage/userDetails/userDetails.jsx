import React from "react";
import "./userDetails.css";
import signoutIcon from "./icons/signout.svg"; // Import the SVG icon

// This component displays the user details popup
const UserDetails = ({ displayName, email, imageUrl, onClose, onLogout }) => {
  return (
    <div className="user-details-popup">
      {/* Close (X) button */}
      <button className="close-btn dark-white-text" onClick={onClose}>✕</button>

      {/* User email address */}
      <p className="user-email dark-white-text">{email}</p>

      <div className="profile-picture-wrapper">
        <img className="user-profile-pic" src={imageUrl} alt="User profile" />
      </div>

      <p className="user-greeting dark-white-text">SayHi, {displayName}!</p>
    
      <button className="signout-btn" onClick={onLogout}>
        <img src={signoutIcon} alt="Sign out" className="signout-icon" />
        Sign out
      </button>
    </div>
  );
};

export default UserDetails;
