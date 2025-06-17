import React, { useState } from 'react';
import './AddLabelwindow.css';  

function AddLabelwindow({ onClose, onLabelAdded }) {
  const [labelName, setLabelName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!labelName.trim()) {
    //   alert('Please enter a label name.');
    //   return;
    // }
    setErrorMessage('');
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/labels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: labelName }),
      });

      if (response.ok) {
        onLabelAdded(); // קוראים לפונקציה כדי לרענן את הרשימה ב-InboxPage
        onClose();      // סוגרים את החלונית
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to create label.');
      }
    } catch (error) {
      console.error('Error creating label:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    // הרקע השקוף שלוחצים עליו כדי לסגור
    <div className="modal-backdrop" onClick={onClose}>
      {/* החלונית עצמה. e.stopPropagation() מונע מהקליק לסגור אותה */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>New label</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label htmlFor="label-name">Please enter a new label name</label>
            <input
              id="label-name"
              type="text"
              value={labelName}
              onChange={(e) => setLabelName(e.target.value)}
              autoFocus
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-confirm">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLabelwindow;