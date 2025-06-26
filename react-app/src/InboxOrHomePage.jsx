import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import HomePage from "./homePage/HomePage";

const InboxOrHomePage = () => {
  // שלב 1: ניהול מצב
  // 'pending' - still checking the token
  // 'authenticated' - the token is valid
  // 'unauthenticated' - the token id invalid or not present
  const [authStatus, setAuthStatus] = useState("pending");

// check once when the component mounts
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      // there is no token in localStorage
      if (!token) {
        setAuthStatus("unauthenticated");
        return;
      }

      // check if the token is valid
      try {
        const res = await fetch("/api/tokens/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          // the token is valid
          setAuthStatus("authenticated");
        } else {
          throw new Error("Token verification failed");
        }
      } catch (error) {
        //Token is invalid- removing from storage.
        localStorage.removeItem("token");
        setAuthStatus("unauthenticated");
      }
    };

    verifyToken();
  }, []); 
  
  if (authStatus === "pending") {
    return <div>Loading...</div>;
  }

  if (authStatus === "authenticated") {
    // אם האימות הצליח, נעביר את המשתמש ל-inbox
    return <Navigate to="/inbox" replace />;
  }

  // authStatus === 'unauthenticated'
  return <HomePage />;
};

export default InboxOrHomePage;