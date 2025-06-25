import React, { useState } from 'react';
import GenericWindow from '../genericWindow/GenericWindow';
import '../genericWindow/GenericWindow.css';  

function AddLabelWindow({ onClose, onLabelAdded }) {
  const [labelName, setLabelName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateLabel = async () => {
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
        onLabelAdded();
        onClose();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Failed to create label.');
      }
    } catch (error) {
      console.error('Error creating label:', error);
      setErrorMessage('An error occurred.');
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleCreateLabel();
  };

  return (
    <GenericWindow
      title="New label"
      onClose={onClose}
      onConfirm={handleCreateLabel}
      confirmText="Create"
    >
      <form onSubmit={onFormSubmit}>
        <label htmlFor="label-name">Please enter a new label name</label>
        <input
          id="label-name"
          type="text"
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          autoFocus
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </GenericWindow>
  );
}

export default AddLabelWindow;