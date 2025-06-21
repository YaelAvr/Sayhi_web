import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InboxPage.css';
import TopBar from './TopBar'; 
import SideBar from './SideBar';
import ComposeWindow from './composeWindow/ComposeWindow';
import AddLabelWindow from './labelTitle/AddLabelWindow';
import GenericWindow from './genericWindow/GenericWindow';

const InboxPage = () => {
  // States קיימים
  const [isComposing, setIsComposing] = useState(false);
  const navigate = useNavigate();
  const [defaultLabels, setDefaultLabels] = useState([]);
  const [customLabels, setCustomLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddLabelOpen, setIsAddLabelOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState(null); // יחזיק את אובייקט התווית לעריכה
  const [deletingLabel, setDeletingLabel] = useState(null); // יחזיק את אובייקט התווית למחיקה
  const [newLabelName, setNewLabelName] = useState(""); // state זמני לשם החדש בעריכה

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
      // const defaults = allLabels.filter(label => label.isDefault === true);
      // const customs = allLabels.filter(label => label.isDefault === false);

       const defaults = allLabels
        .filter(label => label.isDefault === true)
        .map(label => ({
            id: label.id,
            name: label.name,
            isDefault: label.isDefault
        }));

      const customs = allLabels
        .filter(label => label.isDefault === false)
        .map(label => ({
            id: label.id,
            name: label.name,
            isDefault: label.isDefault
        }));
      
      
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

   const handleDeleteLabel = async () => {
    if (!deletingLabel) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/labels/${deletingLabel.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        fetchAndFilterLabels();
      } else { alert('Failed to delete label.'); }
    } catch (error) { console.error("Error deleting label:", error); }
    setDeletingLabel(null); // סוגרים את מודאל המחיקה בכל מקרה
  };


const handleUpdateLabel = async () => {
    if (!editingLabel || !newLabelName.trim()) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/labels/${editingLabel.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        body: JSON.stringify({ name: newLabelName }),
      });
      if (response.ok) {
        fetchAndFilterLabels();
      } else { alert('Failed to update label.'); }
    } catch (error) { console.error("Error updating label:", error); }
    setEditingLabel(null); // סוגרים את מודאל העריכה
    setNewLabelName("");   // מאפסים את השם
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (isLoading) {
    return <div>Loading your inbox...</div>;
  }

  return (
    <>
      <div className="inbox-page-layout">
        <TopBar onLogout={handleLogout} />
        <div className="inbox-main-content">
          <SideBar 
            onComposeClick={() => setIsComposing(true)} 
            defaultLabels={defaultLabels}
            customLabels={customLabels}
            onAddLabelClick={() => setIsAddLabelOpen(true)}
             onOpenEditLabel={(label) => { 
              setEditingLabel(label); 
              setNewLabelName(label.name); 
                }}
              onOpenDeleteLabel={(label) => setDeletingLabel(label)}
          />
          <main className="inbox-content-area">
            <h2>Welcome to your inbox!</h2>
            {/* כאן תבוא רשימת המיילים בעתיד */}
          </main>
        </div>
      </div>

      {/* מודאל לכתיבת מייל חדש */}
      {isComposing && <ComposeWindow onClose={() => setIsComposing(false)} />}
      
      {/* מודאל להוספת תווית חדשה */}
      {isAddLabelOpen && (
        <AddLabelWindow 
          onClose={() => setIsAddLabelOpen(false)}
          onLabelAdded={fetchAndFilterLabels}
        />
      )}

      {/* מודאל לעריכת תווית */}
      {editingLabel && (
        <GenericWindow
          title="Edit label"
          onClose={() => setEditingLabel(null)}
          onConfirm={handleUpdateLabel}
          confirmText="Save"
        >
          <label htmlFor="edit-label-name">New label name:</label>
          <input
            id="edit-label-name"
            type="text"
            value={newLabelName}
            onChange={(e) => setNewLabelName(e.target.value)}
            autoFocus
          />
        </GenericWindow>
      )}

      {/* מודאל לאישור מחיקה */}
      {deletingLabel && (
        <GenericWindow
          title="Delete label"
          onClose={() => setDeletingLabel(null)}
          onConfirm={handleDeleteLabel}
          confirmText="Delete"
        >
          <p>Are you sure you want to delete the label "<strong>{deletingLabel.name}</strong>"?</p>
          <p>This will not delete any messages.</p>
        </GenericWindow>
      )}
    </>
  );
};

export default InboxPage;