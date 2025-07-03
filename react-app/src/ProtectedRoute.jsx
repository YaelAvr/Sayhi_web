import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "./utils/utils"; 


const ProtectedRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState("pending");

  // check once when the component mounts
  useEffect(() => {
    try{
    verifyToken({ setAuthStatus });

    } catch(e){
      console.error("Fetch failed:", e);

    }
  }, []);

  if (authStatus === "pending") {
    return <div>Loading...</div>;
  }

  if (authStatus === "authenticated") {
    return children;
  }

  // => authStatus === 'unauthenticated'
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
