import React, { useState } from 'react';
import './ComposeWindow.css'; 
import deleteIcon from '../labelButton/icons/delete.svg';

function ComposeWindow({ onClose, draftData = null, onDraftSaved }) {
  const [to, setTo] = useState(draftData?.toUserName || '');
  const [subject, setSubject] = useState(draftData?.subject || '');
  const [body, setBody] = useState(draftData?.body || '');
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleCloseAndCreateDraft = async () => {
  if (draftData && (draftData.toUserName || '') === to && (draftData.subject || '') === subject && (draftData.body || '') === body) {
    onClose();
    return;
  }
  
  if (!draftData && !to.trim() && !subject.trim() && !body.trim()) {
    onClose();
    return;
  }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found, cannot save draft.");
      onClose();
      return;
    }

    let username = to.trim();
    if (username.endsWith('@sayhi.com')) {
       username = username.split('@sayhi.com')[0];
    }

    const draftDataToFetch = {
      to: username,
      subject: subject,
      body: body,
    };

     if (draftData && draftData.id) {
      draftDataToFetch.originalDraftId = draftData.id;
    }

    try {
      const response = await fetch('/api/mails/drafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(draftDataToFetch),
      });
      if (response.ok && onDraftSaved) {
        onDraftSaved();
      }
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      onClose();
    }
  };

  const handleSend = async () => {
    setErrorMessage('');
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('יש להתחבר למערכת כדי לשלוח מייל.');
      return;
    }

    let username = to.trim();
    if (username.endsWith('@sayhi.com')) {
       username = username.split('@sayhi.com')[0];
    }
    
    

    const emailData = {
      to: username,       
      subject: subject,
      body: body,
    };

    if (draftData?.id) {
      emailData.originalDraftId = draftData.id;
      console.log("originalDraftId:", draftData.id);

    }

    try {
      const response = await fetch('/api/mails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        onClose();
        onDraftSaved();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMessage('An error occurred.');
    }
  };

  return (
    <div className="compose-window">
      <div className="compose-header">
        <h5>New Message</h5>
        <button className="close-btn" onClick={handleCloseAndCreateDraft}>×</button>
      </div>

      <div className="compose-body">
        <input 
          type="email" 
          placeholder="Recipients" 
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Subject" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea 
          className="message-area" 
          placeholder=""
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>

      <div className="compose-footer">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="send-btn" onClick={handleSend}>Send</button>
        <button className="delete-btn" onClick={onClose}>
            <img src={deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
  );
}

export default ComposeWindow;