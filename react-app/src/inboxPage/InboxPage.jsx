import React from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const InboxPage = () => {

  const createLabel = async () => {
    const token = localStorage.getItem("token"); //יבוא של התוקן של המשתמש הזה

    const res = await fetch("/api/labels/", {
      headers: {
        Authorization: `Bearer ${token}`, // ⬅️ שליחה ב־header
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Label:", data); // לא בטוחה שזה מראה מה שרוצים
    } else {
      console.error("Unauthorized");
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
