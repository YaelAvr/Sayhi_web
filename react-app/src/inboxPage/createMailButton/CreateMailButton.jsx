import React from 'react';
import './CreateMailButton.css';
import composeIcon from './compose.svg';

function CreateMailButton({ onClick }) {
  return (
    <button className="CreateMailButton" onClick={onClick}>
    <img src={composeIcon} alt="Compose icon" className="compose-icon" />
      Compose
    </button>
  );
}

export default CreateMailButton;
