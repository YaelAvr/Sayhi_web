import React from 'react';
import './LabelsTitle.css';

function LabelsTitle({ onAddClick }) {
  return (
    <div className="labels-title dark-white-text">
      <span className="title-text">Labels</span>
      <button className="add-button" onClick={onAddClick}>+</button>
    </div>
  );
}

export default LabelsTitle;
