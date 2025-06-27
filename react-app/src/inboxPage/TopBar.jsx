import React, { useState, useRef, useEffect } from "react";
import Logo from "../gmailLogo/Logo";
import { ReactComponent as DarkModeLogo } from "./mode-icons/dark_mode.svg";
import { ReactComponent as LightModeLogo } from "./mode-icons/light_mode.svg";
import SearchBar from "./searchBar/SearchBar";
import "./TopBar.css";
import UserDetails from "./userDetails/userDetails";
import { getUserIdFromToken } from "../utils/utils";

const TopBar = ({ onLogout, onFullSearch, onPreviewItemClick, isDarkMode, toggleDarkMode }) => { 
  const [showUserDetails, setShowUserDetails] = useState(false);
  const userDetailsRef = useRef(null);

  // State to hold user data (name, email, picture)
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    picture: "",
  });

  // Fetch user data from the backend on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = getUserIdFromToken();
        const token = localStorage.getItem("token");

        const res = await fetch(`/api/users/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          const data = await res.json();
          setUserData({
            displayName: data.displayName,
            email: `${data.username}@sayhi.com`,
            picture: data.picture,
          });
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
  }, []);

  // Close the user details popup when clicking outside of it
  const handleOutsideClick = (event) => {
    if (
      userDetailsRef.current &&
      !userDetailsRef.current.contains(event.target)
    ) {
      setShowUserDetails(false);
    }
  };

  // Attach/remove event listener based on popup state
  useEffect(() => {
    if (showUserDetails) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showUserDetails]);

  return (
    <div className="topbar-container">
        {/* App logo */}
      <Logo containerClass="topbar-logo-container" />
        {/* Search bar component */}
      <SearchBar onFullSearch={onFullSearch} onPreviewItemClick={onPreviewItemClick} />
      <div className="topbar-btns">
        {isDarkMode ? (
          <LightModeLogo className="mode-pic" onClick={toggleDarkMode} />
        ) : (
          <DarkModeLogo className="mode-pic" onClick={toggleDarkMode} />
        )}        {/* User profile section */}
        <div className="topbar-profile">
          <img
            className="topbar-profile-pic"
            src={userData.picture}
            alt="User profile"
            onClick={() => setShowUserDetails((prev) => !prev)}
          />

          {/* User details popup */}
          {showUserDetails && (
            <div ref={userDetailsRef}>
              <UserDetails
                displayName={userData.displayName}
                email={userData.email}
                imageUrl={userData.picture}
                onClose={() => setShowUserDetails(false)}
                onLogout={onLogout}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
