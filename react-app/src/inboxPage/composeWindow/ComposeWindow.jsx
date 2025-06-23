import React, { useState } from 'react';
import './ComposeWindow.css'; 
import deleteIcon from '../labelButton/icons/spam.svg';

function ComposeWindow({ onClose }) {
  // 1. ניהול מצב (State) עבור כל אחד משדות הקלט
  const [to, setTo] = useState(''); // ישמור את כתובת המייל של הנמען
  const [subject, setSubject] = useState(''); // ישמור את נושא המייל
  const [body, setBody] = useState(''); // ישמור את גוף המייל
  const [errorMessage, setErrorMessage] = useState('');
  

    const handleCloseAndCreateDraft = async () => {
    // if all the fields are empty, close the window
    if (!to.trim() && !subject.trim() && !body.trim()) {
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

    const draftData = {
      to: username,
      subject: subject,
      body: body,
    };

    try {
      await fetch('/api/mails/drafts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(draftData),
      });
    } catch (error) {
      console.error('Failed to save draft:', error);
      // לא מציגים הודעת שגיאה למשתמש כי החלון נסגר בכל מקרה
    } finally {
      onClose();
    }
  };

  // 2. פונקציה אסינכרונית שתטפל בלוגיקת השליחה
  const handleSend = async () => {
    setErrorMessage('');
    // קריאת טוקן האימות מהאחסון המקומי
    const token = localStorage.getItem('token');
    
    // בדיקה אם המשתמש מחובר. אם אין טוקן, אין אפשרות לשלוח.
    if (!token) {
      alert('יש להתחבר למערכת כדי לשלוח מייל.');
      return;
    }

    // ולידציה בסיסית: לוודא שהמשתמש הכניס כתובת נמען
    // if (!to.trim()) {
    //     alert('יש להזין כתובת מייל של הנמען.');
    //     return;
    // }

    let username = to.trim();
    if (username.endsWith('@sayhi.com')) {
       username = username.split('@sayhi.com')[0];
    }
    
    
    // const username = to.trim().split('@sayhi.com')[0];

    // הרכבת אובייקט הנתונים שיישלח לשרת
    const emailData = {
      to: username,       // כתובת המייל שהמשתמש הקליד
      subject: subject,
      body: body,
    };

    try {
      // 3. שליחת בקשת POST לשרת
      // ודא שהנתיב '/api/mails' הוא הנתיב הנכון בקונטרולר שלך
      const response = await fetch('/api/mails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // הוספת הטוקן לאימות
        },
        body: JSON.stringify(emailData), // הפיכת האובייקט למחרוזת JSON
      });

      // 4. טיפול בתגובת השרת
      if (response.ok) {
        onClose(); // סגירת החלון לאחר שליחה מוצלחת
      } else {
        // אם השרת החזיר שגיאה, נציג אותה למשתמש
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to send email.');
      }
    } catch (error) {
      // טיפול בשגיאות רשת (למשל, אין אינטרנט)
      console.error('Error sending email:', error);
      setErrorMessage('An error occurred.');
    }
  };

  // החלק הויזואלי של הקומפוננטה
  return (
    <div className="compose-window">
      <div className="compose-header">
        <h5>New Message</h5>
        <button className="close-btn" onClick={handleCloseAndCreateDraft}>×</button>
      </div>

      <div className="compose-body">
        {/* 5. קישור שדות הקלט למצב (State) שלהם */}
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
        {/* 6. קישור כפתור השליחה לפונקציית handleSend */}
        <button className="send-btn" onClick={handleSend}>Send</button>
        <button className="delete-btn" onClick={onClose}>
            <img src={deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
  );
}

export default ComposeWindow;