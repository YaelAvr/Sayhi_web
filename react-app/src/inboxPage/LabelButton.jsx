import React from 'react';
import './LabelButton.css';

function LabelButton({ label, onClick, selected }) {
  return (
    <button 
      className={`LabelButton${selected ? ' selected' : ''}`} 
      onClick={onClick}
    >
      <span className="label">{label}</span>
    </button>
  );
}

export default LabelButton;
