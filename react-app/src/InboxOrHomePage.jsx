import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import { verifyToken } from "./utils/utils"; 

const InboxOrHomePage = () => {
  // שלב 1: ניהול מצב
  // 'pending' - still checking the token
  // 'authenticated' - the token is valid
  // 'unauthenticated' - the token id invalid or not present
  const [authStatus, setAuthStatus] = useState("pending");

// check once when the component mounts
  useEffect(() => {
    verifyToken({setAuthStatus});
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