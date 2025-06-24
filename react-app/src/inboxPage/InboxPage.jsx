import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InboxPage.css";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import ComposeWindow from "./composeWindow/ComposeWindow";
import AddLabelWindow from "./addLabelWindow/AddLabelWindow";
import GenericWindow from "./genericWindow/GenericWindow";
import MailCard from './MailCard/MailCard';
import { getUserIdFromToken } from "../utils/utils";
import Toolbar from "./Toolbar/Toolbar";


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
  //state for displaying the last 50 mails
  const [emails, setEmails] = useState([]);
  const [offset, setOffset] = useState(0);
  //state for knowing if there are more mails to display(which means you can press the "next" button)
  const [hasMore, setHasMore] = useState(true);

  const [currentLabel, setCurrentLabel] = useState('Inbox'); //   לתקן ברירת מחדל
  const currentPage = offset === 0 ? 1 : Math.floor(offset / 50) + 1;

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

  // איפוס האופסט בכל שינוי תווית עדן
  useEffect(() => {
    fetchAndFilterLabels();
  }, []);

  // Load 50 mails using label "Inbox" and current offset
  useEffect(() => {
    const fetchMails = async () => {
      const token = localStorage.getItem("token");
      const userId = getUserIdFromToken();

      try {
        const res = await fetch(`/api/mails/label-mails?label=${currentLabel}&offset=${offset}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch mails");
        }

        const data = await res.json();
        setEmails(data);
        //checks if there are less than 50 mails(which means we cannot press button "next")
        setHasMore(data.length === 50);

      } catch (err) {
        console.error("Error loading mails:", err);
      }
    };

    fetchMails();
  }, [offset, currentLabel]);



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
        <Toolbar 
          onPrevClick={() => setOffset(Math.max(0, offset - 50))}
          onNextClick={() => {if (hasMore) setOffset(offset + 50);}}
          currentPage={currentPage}
        />
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
            {/* Display 50 mails */}
            {emails.length === 0 ? (
              <div className="empty-message">No mails to show</div>
            ) : (
              emails.map((mail) => (
                <MailCard
                  id={mail.id}
                  sender={mail.fromName}
                  subject={mail.subject}
                  body={mail.body}
                  date={mail.time}
                  isStarred={mail.labels.includes("starred")}
                  onStar={() => console.log("Toggle star")}
                  onDelete={() => console.log("Delete mail")}
                  onLabel={() => console.log("Add label")}
                />
              ))
            )}
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