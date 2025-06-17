// LabelsTitle.jsx
import React from 'react';
import './LabelsTitle.css';

function LabelsTitle({ onAddClick }) {
  return (
    <div className="labels-title">
      <span className="title-text">Labels</span>
      <button className="add-button" onClick={onAddClick}>+</button>
    </div>
  );
}

export default LabelsTitle;
