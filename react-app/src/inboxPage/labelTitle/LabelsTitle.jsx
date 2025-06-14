// LabelsTitle.jsx
import React from 'react';
import './LabelsTitle.css';

function LabelsTitle() {
  return (
    <div className="labels-title">
      <span className="title-text">Labels</span>
      <button className="add-button" onClick={() => console.log('Add label clicked')}>+</button>
    </div>
  );
}

export default LabelsTitle;
