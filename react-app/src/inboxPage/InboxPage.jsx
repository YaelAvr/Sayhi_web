import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';

const InboxPage = () => {
  return (
    <div className="inbox-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar />
      <div style={{ display: 'flex', flex: 1 }}>
        <SideBar />
        <div style={{ flex: 1, padding: '16px' }}>
          {/* כאן תבוא רשימת המיילים וכו' */}
          <h2>Welcome to your inbox!</h2>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
