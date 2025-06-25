import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InboxPage.css";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import ComposeWindow from "./composeWindow/ComposeWindow";
import AddLabelWindow from "./addLabelWindow/AddLabelWindow";
import GenericWindow from "./genericWindow/GenericWindow";
import MailCard from './MailCard/MailCard';
import MailDetailView from './mailDetailView/MailDetailView';
import { getUserIdFromToken } from "../utils/utils";
import Toolbar from "./Toolbar/Toolbar";

const InboxPage = () => {
  // States קיימים
  const [isComposing, setIsComposing] = useState(false);
  const navigate = useNavigate();
  const [defaultLabels, setDefaultLabels] = useState([]);
  const [customLabels, setCustomLabels] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isAddLabelOpen, setIsAddLabelOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState(null); 
  const [deletingLabel, setDeletingLabel] = useState(null); 
  const [newLabelName, setNewLabelName] = useState(""); 
  const [mails, setMails] = useState([]); 
  const [selectedMail, setSelectedMail] = useState(null); 
  const [currentLabel, setCurrentLabel] = useState('Inbox');
  const [editingDraft, setEditingDraft] = useState(null); 
  //state for displaying the last 50 mails
  const [offset, setOffset] = useState(0);
  //state for knowing if there are more mails to display(which means you can press the "next" button)
  const [hasMore, setHasMore] = useState(true);
  // Start by showing mails from the "Inbox" label by default
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
    }
  };

//   const fetchMailsForLabel = async (labelName) => {
//   // בפרויקט אמיתי, כאן תהיה בקשת fetch אמיתית עם טוקן
//   // const token = localStorage.getItem('token');
//   // const response = await fetch(`/api/mails?label=${labelName}`, { headers: { ... } });
//   // ...
  
//   // כרגע, נשתמש בנתונים המדומים
//   console.log(`(Pretending to fetch mails for: ${labelName})`);
//   const dummyMails = [
//     { id: 'm1', subject: 'Security Alert', body: '...', time: new Date().toISOString(), isStarred: true, fromName: 'Google', fromUserName: 'google-alerts', labels: ['l-inbox'] },
//     { id: 'm2', subject: 'New connection request', body: '...', time: '2024-06-20T10:00:00Z', isStarred: false, fromName: 'LinkedIn', fromUserName: 'linkedin-noreply', labels: ['l-inbox', 'l-social'] },
//   ];
//   setMails(dummyMails);
// };

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
        setMails(data);
        //checks if there are less than 50 mails(which means we cannot press button "next")
        setHasMore(data.length === 50);

      } catch (err) {
        console.error("Error loading mails:", err);
      }
    };

  // Load 50 mails using label "Inbox" and current offset
  useEffect(() => {
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


   // --- שינוי #3: פונקציה לבחירת מייל ---
const handleCardClick = (mail) => {
  // 1. ניצור את המערך המלא של כל התוויות הזמינות
  const allLabels = [...defaultLabels, ...customLabels];
  
  // 2. נמצא את אובייקט התווית של "Drafts" כדי לקבל את ה-ID שלה
  const draftsLabel = allLabels.find(label => label.name === 'Drafts');
  
  // 3. אם לא מצאנו תווית כזו, נתייחס לכל המיילים כרגילים (מצב הגנה)
  if (!draftsLabel) {
    setSelectedMail(mail);
    return;
  }
  
  const draftsLabelId = draftsLabel.id; // ה-ID האמיתי של תווית הטיוטות

  // 4. נבדוק אם מערך ה-ID-ים של המייל מכיל את ה-ID של תווית הטיוטות
  if (mail.labels && mail.labels.includes(draftsLabelId)) {
    // אם זו טיוטה:
    setEditingDraft(mail);
    setIsComposing(true);
  } else {
    // אם זה מייל רגיל:
    setSelectedMail(mail);
  }
};

  // --- שינוי #4: פונקציה לחזרה לרשימת המיילים ---
  const handleBackToInbox = () => {
    setSelectedMail(null);
  };

//   const handleLabelSelect = (labelName) => {
//     setCurrentLabel(labelName);
//   // בעתיד, כאן תקרא לשרת כדי לקבל את המיילים של התווית הזו חשוב
//   console.log(`Switched to label: ${labelName}`);
// };

   // פונקציה חדשה לטיפול בלחיצה על כוכב
  const handleToggleStar = (mailId) => {
    // עדכון המיילים בצורה בלתי-משתנה (immutable)
    setMails(prevMails => 
      prevMails.map(mail => 
        mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail
      )
    );
    // בפרויקט אמיתי, כאן גם תשלח בקשת PATCH לשרת כדי לעדכן את המצב
  };


  const refreshData = async () => {
  console.log("Refreshing all data...");
  await fetchAndFilterLabels(); // טוען מחדש את התוויות
  // כרגע, אפשר להשאיר את זה ריק או לקרוא ל-fetchMails אם היא מופרדת
  await fetchMails();
  };

   const allLabels = [...defaultLabels, ...customLabels];

  // if (isLoading) {
  //   return <div>Loading your inbox...</div>;
  // }

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
             onLabelSelect={(labelName) => {
                setCurrentLabel(labelName); // Update the label that was clicked
                setOffset(0); // Always reset pagination when label changes
            }}
            currentLabelName={currentLabel}
          />
          <main className="inbox-content-area">
           {selectedMail ? (
              // --- שינוי #2: בצע את התרגום כאן, ישירות לפני העברה ---
              (() => {
                // לוקחים את מערך ה-ID-ים מהמייל שנבחר
                const labelIds = selectedMail.labels || [];
                // מתרגמים אותו למערך של שמות
                const labelNames = labelIds.map(id => {
                  const foundLabel = allLabels.find(l => l.id === id);
                  return foundLabel ? foundLabel.name : null;
                }).filter(Boolean);
                
                // יוצרים עותק של המייל עם התוויות המתורגמות
                const mailForView = { ...selectedMail, labels: labelNames };

                return (
                  <MailDetailView 
                    mail={mailForView} 
                    onClose={handleBackToInbox}
                    sourceLabel={currentLabel}
                  />
                );
              })()
            ) : (
              // ... החלק של רשימת המיילים, ללא שינוי ...
              <>
                 {/* Display 50 mails */}
                  {mails.length === 0 ? (
                  <div className="empty-message">No mails to show</div>
                    ) : (
                <div className="mail-list">
                  {mails.map(mail => (
                    // שיניתי את sender ל-fromName כדי להתאים למבנה החדש
                    <MailCard
                      key={mail.id}
                      sender={mail.fromName} // שימוש ב-fromName
                      subject={mail.subject}
                      body={mail.body}
                      date={mail.time} // שימוש ב-time
                      isStarred={mail.isStarred}
                      onClick={() => handleCardClick(mail)}
                      onStar={() => handleToggleStar(mail.id)}
                      onDelete={() => console.log('Delete clicked on mail:', mail.id)}
                    />
                  ))}
                </div>
                )}
                </>  
            )}            
          </main>
        </div>
      </div>

      {/* מודאל לכתיבת מייל חדש */}
      {isComposing && (
        <ComposeWindow
    // מעבירים את נתוני הטיוטה (או אובייקט ריק אם זו הודעה חדשה)
         draftData={editingDraft} 
         onClose={() => {
         setIsComposing(false);
         setEditingDraft(null); // מאפסים את הטיוטה הנבחרת
    }}
      onDraftSaved={refreshData}
  />
)}
      
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