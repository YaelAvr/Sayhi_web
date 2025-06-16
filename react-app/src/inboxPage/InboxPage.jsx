import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. מייבאים את useNavigate
import TopBar from './TopBar';
import SideBar from './SideBar';
import ComposeWindow from './composeWindow/ComposeWindow';

const InboxPage = () => {
  const [isComposing, setIsComposing] = useState(false);
  const navigate = useNavigate(); // 2. מפעילים את ה-hook כדי לקבל את פונקציית הניווט

  // 3. יוצרים את פונקציית ההתנתקות כאן
  const handleLogout = () => {
    // מנקים את הטוקן מהאחסון המקומי
    localStorage.removeItem('token');
    // משתמשים ב-navigate כדי לעבור לעמוד ההתחברות בלי לרענן את הדף
    navigate('/login');
  };

  return (
    <div className="inbox-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 4. מעבירים את הפונקציה handleLogout כ-prop ל-TopBar */}
      <TopBar onLogout={handleLogout} />

      <div style={{ display: 'flex', flex: 1 }}>
        <SideBar onComposeClick={() => setIsComposing(true)} />
        <main style={{ flex: 1, padding: '16px' }}>
          <h2>Welcome to your inbox!</h2>
        </main>
      </div>

      {isComposing && <ComposeWindow onClose={() => setIsComposing(false)} />}
    </div>
  );
};

export default InboxPage;