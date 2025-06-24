import React from 'react';
import './MailCard.css';
import StarOutline from './icons/star.svg';
import StarFilled from './icons/yellow_star.svg';
import TrashIcon from './icons/delete.svg';
import LabelIcon from './icons/add_to_lable.svg';

// Character limit for displaying subject + body preview
const PREVIEW_LIMIT = 80;

const MailCard = ({ sender, subject, body, date, onStar, onDelete, onLabel, isStarred, onClick }) => {

  // Toggle star status on click
   const handleStarClick = (event) => {
    event.stopPropagation(); // עוצר את התפשטות האירוע
    if (onStar) onStar();
  };


   const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (onDelete) onDelete();
  };
  
  const handleLabelClick = (event) => {
    event.stopPropagation();
    if (onLabel) onLabel();
  };

  // Format date:
  // - If the mail was sent today → show only time
  // - Otherwise → show short date (e.g., Jun 20)
  const formatDateDisplay = (dateInput) => {
    const emailDate = new Date(dateInput);
    const now = new Date();

    const isToday =
      emailDate.getDate() === now.getDate() &&
      emailDate.getMonth() === now.getMonth() &&
      emailDate.getFullYear() === now.getFullYear();

    if (isToday) {
      return emailDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } else {
      return emailDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  // Display the subject first, and add part of the body if space allows
  const subjectPreview = subject.slice(0, PREVIEW_LIMIT);
  const remaining = PREVIEW_LIMIT - subjectPreview.length;
  const bodyPreview = remaining > 0 ? body.slice(0, remaining) : '';

  return (
    <div className="mail-card" onClick={onClick}>
      <div className="mail-main">
        {/* Left side icons (visually, right in RTL) */}
        <div className="mail-icons">
          <button className="icon-button" onClick={handleStarClick} title="Star">
            <img src={isStarred ? StarFilled : StarOutline} alt="star" className="icon-img" />
          </button>
          <button className="icon-button" onClick={handleDeleteClick} title="Delete">
            <img src={TrashIcon} alt="delete" className="icon-img" />
          </button>
          <button className="icon-button" onClick={handleLabelClick} title="Add Label">
            <img src={LabelIcon} alt="label" className="icon-img" />
          </button>
        </div>

        {/* Sender's name */}
        <div className="mail-sender">{sender}</div>

        {/* Preview line with subject + body */}
        <div className="mail-preview-line">
          <strong>{subjectPreview}</strong>
          {bodyPreview && <span> – {bodyPreview}</span>}
        </div>

        {/* Formatted date */}
        <div className="mail-date">{formatDateDisplay(date)}</div>
      </div>
    </div>
  );
};

export default MailCard;