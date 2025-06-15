import React, { useState } from 'react'; // 1. ייבאנו את useState
import TopBar from './TopBar';
import SideBar from './SideBar';
import ComposeWindow from './composeWindow/ComposeWindow'; // 2. ייבאנו את החלונית החדשה

const InboxPage = () => {
  // 3. הוספנו state כדי לנהל את מצב החלונית
  const [isComposing, setIsComposing] = useState(false);

  return (
    <>
      <div className="inbox-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <TopBar />
        <div style={{ display: 'flex', flex: 1 }}>
          {/* 4. העברנו את הפונקציה ל-SideBar */}
          <SideBar onComposeClick={() => setIsComposing(true)} />
          <main style={{ flex: 1, padding: '16px' }}>
            {/* כאן תבוא רשימת המיילים וכו' */}
            <h2>Welcome to your inbox!</h2>
          </main>
        </div>
      </div>

      {/* 5. הצגה מותנית של החלונית מחוץ ל-div הראשי */}
      {/* זה יבטיח שהיא 'צפה' מעל הכל */}
      {isComposing && <ComposeWindow onClose={() => setIsComposing(false)} />}
    </>
  );
};

export default InboxPage;