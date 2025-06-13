import React from 'react';
import InboxPage from './inboxPage/InboxPage';
import LoginPage from './loginPage/LoginPage';
import { useEffect, useState } from "react";
import './App.css';
function App() {
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [protectedData, setProtectedData] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   fetch("http://localhost:4000/protected", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   })
  //     .then(res => {
  //       if (res.ok) return res.json();
  //       else throw new Error("Unauthorized");
  //     })
  //     .then(data => {
  //       setProtectedData(data);
  //       setIsLoggedIn(true);
  //     })
  //     .catch(() => setIsLoggedIn(false));
  // }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   setProtectedData(null);
  // };
  return (
    // <InboxPage />
    <LoginPage />
  );
}

export default App;