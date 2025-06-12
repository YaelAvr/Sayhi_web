import React from 'react';

const TopBar = () => {
  return (
    <div style={{
      height: '60px',
      backgroundColor: '#f1f3f4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h1>My Gmail</h1>
      {/* כאן יהיו כפתורי theme, תמונה, התנתקות וכו' */}
    </div>
  );
};

export default TopBar;
