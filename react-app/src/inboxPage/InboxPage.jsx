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
import LabelPopup from './LabelPopup/LabelPopup';

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
   const [modalError, setModalError] = useState("");
  //state for displaying the last 50 mails
  const [offset, setOffset] = useState(0);
  //state for knowing if there are more mails to display(which means you can press the "next" button)
  const [hasMore, setHasMore] = useState(true);
  // Start by showing mails from the "Inbox" label by default
  const currentPage = offset === 0 ? 1 : Math.floor(offset / 50) + 1;
    const [showLabelPopup, setShowLabelPopup] = useState(false);
  const [labelPopupMailId, setLabelPopupMailId] = useState(null);
   // state for the search bar
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

//refresh the labels
  const fetchAndFilterLabels = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('/api/labels', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch labels');
      }

      const allLabels = await response.json();

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
  
  //delete specific label
   const handleDeleteLabel = async () => {
    setModalError("");
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/labels/${deletingLabel.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        fetchAndFilterLabels();
        setDeletingLabel(null);
      } else { 
        const errorData = await response.json();
        setModalError(errorData.error || 'Failed to delete label.');
       }
    } catch (error) { 
      console.error("Error deleting label:", error); 
      setModalError("An error occurred.");
    }
  };

  useEffect(() => {
    fetchAndFilterLabels();
  }, []);


  //refresh the mails
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


  //handle change in the name of label
  const handleUpdateLabel = async () => {
      setModalError("");
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`/api/labels/${editingLabel.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
          body: JSON.stringify({ name: newLabelName }),
        });
        if (response.ok) {
          fetchAndFilterLabels();
          setEditingLabel(null);
        } else { 
          const errorData = await response.json();
          setModalError(errorData.error || 'Failed to update label.');
         }
      } catch (error) { 
         console.error("Error updating label:", error);
          setModalError("An error occurred.");
       }
    };


    //close the window of edit or delete label
    const closeModal = () => {
    setEditingLabel(null);
    setDeletingLabel(null);
    setModalError("");
  };

  //handle logout functionallity
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


   // handle clicking on a specific mail and handles the case where the mail is a draft or a sent mail
const handleCardClick = (mail) => {
  const allLabels = [...defaultLabels, ...customLabels];
  
  const draftsLabel = allLabels.find(label => label.name === 'Drafts');
  
  if (!draftsLabel) {
    setSelectedMail(mail);
    return;
  }
  
  const draftsLabelId = draftsLabel.id;

  if (mail.labels && mail.labels.includes(draftsLabelId)) {
    // if it is a draft
    setEditingDraft(mail);
    setIsComposing(true);
  } else {
    //if it a sent mail
    setSelectedMail(mail);
  }
};

  //function that take us back to the list of emails associated with that label
  const handleBackToInbox = () => {
    setSelectedMail(null);
  };

   //handle clicking on a star
  const handleToggleStar = async (mailId, currentlyStarred) => {
    try {
      const token = localStorage.getItem("token");
      const endpoint = currentlyStarred ? '/remove-label' : '/add-label';
      const labelName = 'starred';

      const res = await fetch(`/api/mails/${mailId}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ labelName })
    });

    if (!res.ok) {
      console.error(`Failed to ${currentlyStarred ? 'remove' : 'add'} label to mail:`, await res.json());
    }
  } catch (err) {
    console.error("Error toggle star:", err);
    }

    setMails(prevMails => 
      prevMails.map(mail => 
        mail.id === mailId ? { ...mail, isStarred: !currentlyStarred } : mail
      )
    );

  };

  const handleDeleteMail = async (mailId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/mails/${mailId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to delete mail", await res.json());
      return;
    }

    // עדכון רשימת המיילים – מסיר את המייל מהרשימה הנוכחית
    setMails(prevMails => prevMails.filter(mail => mail.id !== mailId));

  } catch (err) {
    console.error("Error deleting mail:", err);
  }
};

const handleToggleLabel = async (mailId, labelName, isCurrentlyInLabel) => {
  try {
    const token = localStorage.getItem("token");
    const endpoint = isCurrentlyInLabel ? "/remove-label" : "/add-label";
    const allLabels = [...defaultLabels, ...customLabels];

    const res = await fetch(`/api/mails/${mailId}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ labelName }) // השרת מקבל שם
    });

    if (!res.ok) {
      console.error(`Failed to ${endpoint}:`, await res.json());
    }

    // עידכון הסטייט לפי השם → צריך לתרגם לשמירה של id
    const updatedLabelId = allLabels.find(l => l.name === labelName)?.id;
    if (!updatedLabelId) return;

    setMails(prevMails =>
      prevMails.map(mail =>
        mail.id === mailId
          ? {
              ...mail,
              labels: isCurrentlyInLabel
                ? mail.labels.filter(id => id !== updatedLabelId)
                : [...mail.labels, updatedLabelId]
            }
          : mail
      )
    );

  } catch (err) {
    console.error("Toggle label error:", err);
  }
};

  //function to refresh mails and labels
  const refreshData = async () => {
  console.log("Refreshing all data...");
  await fetchAndFilterLabels();
  await fetchMails();
  };

  //function to handle the functionallity of search bar
  const handleFullSearch = async (query) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery === '') {
      setSearchResults(null);
      setSearchError(null);
      return;
    }
    setIsSearching(true);
    setSearchError(null);
    setSelectedMail(null);
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/mails/search/${encodeURIComponent(trimmedQuery)}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Search failed`);
      }
      const results = await response.json();
      setSearchResults(results);
    } catch (err) {
      setSearchError(err.message);
      setSearchResults([]);
      console.error("Error during full search:", err);
    } finally {
      setIsSearching(false);
    }
  };


    useEffect(() => {
    if (searchResults === null) {
      fetchMails();
    }
  }, [offset, currentLabel, searchResults]);


  const allLabels = [...defaultLabels, ...customLabels];

  const isSearchActive = searchResults !== null;
  const mailsToDisplay = isSearchActive ? searchResults : mails;



  return (
    <>
      <div className="inbox-page-layout">
         <TopBar onLogout={handleLogout} onFullSearch={handleFullSearch} onPreviewItemClick={handleCardClick} />
        <Toolbar 
          showBackArrow={!!selectedMail}
          onBackClick={handleBackToInbox}
          onPrevClick={() => setOffset(Math.max(0, offset - 50))}
          onNextClick={() => {if (hasMore) setOffset(offset + 50);}}
          currentPage={currentPage}
          paginationDisabled={isSearchActive}
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
                setSelectedMail(null);   
                setSearchResults(null); 
                setSearchError(null);
            }}
            currentLabelName={currentLabel}
          />
          <main className="inbox-content-area">
           {selectedMail ? (
              (() => {
                const labelIds = selectedMail.labels || [];
                const labelNames = labelIds.map(id => {
                  const foundLabel = allLabels.find(l => l.id === id);
                  return foundLabel ? foundLabel.name : null;
                }).filter(Boolean);
                
                // saves the display of the list of mails or the specific mail, dependes on what the user clicked on
                const mailForView = { ...selectedMail, labels: labelNames };

                return (
                  <MailDetailView 
                    mail={mailForView} 
                    onClose={handleBackToInbox}
                    sourceLabel={currentLabel}
                  />
                );
              })()
            ) : isSearching ? (
    <div className="empty-message">Searching...</div>
  ) : searchError ? (
    <div className="error-message">Error: {searchError}</div>
  ) : mails.length === 0 ? (
    <div className="empty-message">
      {isSearchActive ? "No mails found matching your search." : "No mails to show."}
    </div>
  ) : (
    <div className="mail-list">
      {mailsToDisplay.map(mail => (
        <MailCard
          key={mail.id}
          sender={mail.fromName}
          subject={mail.subject}
          body={mail.body}
          date={mail.time}
          isStarred={mail.isStarred}
          onClick={() => handleCardClick(mail)}
          onStar={() => handleToggleStar(mail.id, mail.isStarred)}
          onDelete={() => handleDeleteMail(mail.id)}
          onLabel={() => {
                        setLabelPopupMailId(mail.id); 
                        setShowLabelPopup(true);
              }}
        />
      ))}
    </div>
  )}
</main>
        </div>
      </div>

      {isComposing && (
        <ComposeWindow
         draftData={editingDraft} 
         onClose={() => {
         setIsComposing(false);
         setEditingDraft(null);
    }}
      onDraftSaved={refreshData}
  />
)}
      
      {isAddLabelOpen && (
        <AddLabelWindow 
          onClose={() => setIsAddLabelOpen(false)}
          onLabelAdded={fetchAndFilterLabels}
        />
      )}

      {editingLabel && (
        <GenericWindow
          title="Edit label"
          onClose={closeModal}
          onConfirm={handleUpdateLabel}
          confirmText="Save"
          errorMessage={modalError}
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

      {deletingLabel && (
        <GenericWindow
          title="Delete label"
          onClose={closeModal}
          onConfirm={handleDeleteLabel}
          confirmText="Delete"
          errorMessage={modalError}
        >
          <p>Are you sure you want to delete the label "<strong>{deletingLabel.name}</strong>"?</p>
          <p>This will not delete any messages.</p>
        </GenericWindow>
      )}

      {showLabelPopup && labelPopupMailId && (() => {
        const mailForPopup = mails.find(m => m.id === labelPopupMailId);
        return (
          <LabelPopup
            key={labelPopupMailId + (mailForPopup?.labels?.join(',') || '')} 
            mail={mailForPopup}
            allLabels={[...defaultLabels, ...customLabels]}
            onToggleLabel={handleToggleLabel}
            onClose={() => {
              setShowLabelPopup(false);
              setLabelPopupMailId(null);
            }}
          />
        );
      })()}
    </>
  );
};

export default InboxPage;