import React from 'react';
import './CreateMailButton.css';
import { ReactComponent as ComposeIcon } from './compose.svg';


function CreateMailButton({ onClick }) {
  return (
    <button className="CreateMailButton" onClick={onClick}>
      <ComposeIcon className="compose-icon"  alt="Compose icon" />
    {/* <img src={composeIcon} alt="Compose icon" className="compose-icon" /> */}
      Compose
    </button>
  );
}

export default CreateMailButton;
