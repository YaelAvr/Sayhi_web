import React, { useState, useRef, useEffect } from "react";
import Logo from "../gmailLogo/Logo";
import { ReactComponent as DarkModeLogo } from "./mode-icons/dark_mode.svg";
import { ReactComponent as Light_Mode_Logo } from "./mode-icons/light_mode.svg";
import SearchBar from "./searchBar/SearchBar";
import "./TopBar.css";
import UserDetails from "./userDetails/userDetails";
import { getUserIdFromToken } from "../utils/utils";

const TopBar = ({ onLogout, isDarkMode, toggleDarkMode }) => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const userDetailsRef = useRef(null);

  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    picture: "",
  });

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

  const handleOutsideClick = (event) => {
    if (
      userDetailsRef.current &&
      !userDetailsRef.current.contains(event.target)
    ) {
      setShowUserDetails(false);
    }
  };

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
      <Logo containerClass="topbar-logo-container" />
      <SearchBar />
      <div className="topbar-btns">
        {isDarkMode ? (
          <Light_Mode_Logo className="mode-pic" onClick={toggleDarkMode} />
        ) : (
          <DarkModeLogo className="mode-pic" onClick={toggleDarkMode} />
        )}
        <div className="topbar-profile">
          <img
            className="topbar-profile-pic"
            src={userData.picture}
            alt="User profile"
            onClick={() => setShowUserDetails((prev) => !prev)}
          />

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
