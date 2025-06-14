import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

import { useState } from "react";

const InboxPage = () => {
  const [labelName, setLabelName] = useState("");

  const createLabel = async () => {
    const token = localStorage.getItem("token"); //יבוא של התוקן של המשתמש הזה

    const res = await fetch("/api/labels/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ⬅️ שליחה ב־header
      },
      body: JSON.stringify({ name: labelName }),
    });

    if (res.status === 201) {
      const data = await res.json?.(); // אם מחזיר גוף
      console.log("Label created:", data);
    } else {
      const error = await res.json();
      console.error("Error:", error.error);
    }
  };

  return (
    <div
      className="inbox-page"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <TopBar />
      <div style={{ display: "flex", flex: 1 }}>
        <SideBar />
        <div style={{ flex: 1, padding: "16px" }}>
          {/* כאן תבוא רשימת המיילים וכו' */}
          <h2>Welcome to your inbox!</h2>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
