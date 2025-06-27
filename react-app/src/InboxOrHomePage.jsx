import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import { verifyToken } from "./utils/utils"; 

const InboxOrHomePage = () => {
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
    return <Navigate to="/inbox" replace />;
  }

  // => authStatus === 'unauthenticated'
  return <HomePage />;
};

export default InboxOrHomePage;