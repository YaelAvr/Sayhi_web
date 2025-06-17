import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar'; 
import SideBar from './SideBar';
import ComposeWindow from './composeWindow/ComposeWindow';
import AddLabelWindow from './labelTitle/AddLabelWindow';

const InboxPage = () => {
  // States קיימים
  const [isComposing, setIsComposing] = useState(false);
  const navigate = useNavigate();
  const [defaultLabels, setDefaultLabels] = useState([]);
  const [customLabels, setCustomLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddLabelOpen, setIsAddLabelOpen] = useState(false);

  // פונקציה לטעינת וסינון התוויות, נוכל לקרוא לה שוב לרענון
  const fetchAndFilterLabels = async () => {
    // לא משנה את isloading ל-true כאן כדי שהרענון יהיה שקט
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // שימוש בנתיב יחסי בזכות ה-proxy
      const response = await fetch('/api/labels', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch labels');
      }

      const allLabels = await response.json();
      const defaults = allLabels.filter(label => label.isDefault === true);
      const customs = allLabels.filter(label => label.isDefault === false);
      
      setDefaultLabels(defaults);
      setCustomLabels(customs);

    } catch (error) {
      console.error("Error fetching labels:", error);
    } finally {
      // נוריד את ה-loading רק בטעינה הראשונית
      if (isLoading) {
        setIsLoading(false);
      }
    }
  };

  // useEffect יקרא לפונקציה הזו רק פעם אחת כשהעמוד עולה
  useEffect(() => {
    fetchAndFilterLabels();
  }, []); // המערך הריק מבטיח ריצה חד-פעמית

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isLoading) {
    return <div>Loading your inbox...</div>;
  }

  return (
    <>
      <div className="inbox-page" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <TopBar onLogout={handleLogout} />
        <div style={{ display: 'flex', flex: 1 }}>
          <SideBar 
            onComposeClick={() => setIsComposing(true)} 
            defaultLabels={defaultLabels}
            customLabels={customLabels}
            onAddLabelClick={() => setIsAddLabelOpen(true)} // פונקציה לפתיחת החלונית
          />
          <main style={{ flex: 1, padding: '16px' }}>
            <h2>Welcome to your inbox!</h2>
            {/* כאן תבוא רשימת המיילים בעתיד */}
          </main>
        </div>
      </div>

      {isComposing && <ComposeWindow onClose={() => setIsComposing(false)} />}
      
      {/* הצגה מותנית של חלונית יצירת התווית */}
      {isAddLabelOpen && (
        <AddLabelWindow 
          onClose={() => setIsAddLabelOpen(false)}
          onLabelAdded={fetchAndFilterLabels} // מעבירים את הפונקציה לרענון
        />
      )}
    </>
  );
};

export default InboxPage;