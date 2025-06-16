import React from 'react';
import './ComposeWindow.css'; 
import deleteIcon from '../labelButton/icons/spam.svg';

function ComposeWindow({ onClose }) {
  return (
    <div className="compose-window">
      <div className="compose-header">
        <h5>New Message</h5>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="compose-body">
        <input type="text" placeholder="Recipients" />
        <input type="text" placeholder="Subject" />
        <textarea className="message-area" placeholder=""></textarea>
      </div>

      <div className="compose-footer">
        <button className="send-btn">Send</button>
        <button className="delete-btn" onClick={onClose}>
            <img src={deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
  );
}

export default ComposeWindow;