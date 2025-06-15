import React from 'react';
import './LabelButton.css';

function LabelButton({ label, onClick, selected, iconSrc }) {
  return (
    <button 
      className={`LabelButton${selected ? ' selected' : ''}`} 
      onClick={onClick}
    >
      {iconSrc && <img className="label-icon" src={iconSrc} alt={`${label} icon`} />}
      <span className="label">{label}</span>
    </button>
  );
}

export default LabelButton;
