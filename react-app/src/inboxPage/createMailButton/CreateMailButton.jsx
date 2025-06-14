import React from 'react';
import './CreateMailButton.css';

function CreateMailButton({ onClick }) {
  return (
    <button className="CreateMailButton" onClick={onClick}>
      Compose
    </button>
  );
}

export default CreateMailButton;
