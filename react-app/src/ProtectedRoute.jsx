import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "./utils/utils"; 


const ProtectedRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState("pending");

  // check once when the component mounts
  useEffect(() => {
    verifyToken({ setAuthStatus });
  }, []);

  if (authStatus === "pending") {
    return <div>Loading...</div>;
  }

  if (authStatus === "authenticated") {
    // אם יש טוקן, מציגים את הקומפוננטה שהגנה עליה (למשל, InboxPage)
    return children;
  }

  // authStatus === 'unauthenticated'
  return <Navigate to="/login" replace />;
  // בודקים אם יש טוקן שמור (ההנחה היא שהוא נשמר בלוגין)
  // const token = localStorage.getItem("token");

  // if (!token) {
  //   // אם אין טוקן, מעבירים (redirect) את המשתמש לעמוד ההתחברות
  //   return <Navigate to="/login" replace />;
  // }

  // // אם יש טוקן, מציגים את הקומפוננטה שהגנה עליה (למשל, InboxPage)
  // return children;
};

export default ProtectedRoute;
