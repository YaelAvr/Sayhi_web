import React from 'react';
import './MailDetailView.css';
import BackArrowIcon from './back_arrow.svg';

// הקומפוננטה מקבלת את הנתונים הנכונים ולא צריכה את allUserLabels
function MailDetailView({ mail, onClose, sourceLabel }) {
  // אם במקרה אין מייל, לא נציג כלום
  if (!mail) return null;

  return (
    <div className="mail-detail-view">
      <div className="mail-detail-toolbar">
        <button 
          className="icon-button" 
          onClick={onClose} 
          title={`Back to ${sourceLabel || 'Inbox'}`}
        >
          <img src={BackArrowIcon} alt="Back" />
        </button>
      </div>

      <header className="mail-detail-header">
        <h2 className="mail-detail-subject">{mail.subject}</h2>
        <div className="mail-detail-labels">
          {/* 
            הלולאה הזו עוברת על מערך שמות התוויות (שכבר נמצא ב-mail.labels)
            ויוצרת 'chip' לכל אחד מהם.
          */}
          {mail.labels && mail.labels.map(labelName => (
            <span key={labelName} className="label-chip">
              {labelName}
            </span>
          ))}
        </div>
      </header>

      {/* החלק של פרטי השולח והגוף נשארים זהים ותקינים */}
      <div className="mail-detail-sender-info">
        <div className="sender-avatar">{(mail.fromName || ' ').charAt(0).toUpperCase()}</div>
        <div className="sender-details">
          <span className="sender-name">{mail.fromName}</span>
          <span className="sender-email">{`<${mail.fromUserName}@sayhi.com>`}</span>
        </div>
        <div className="mail-detail-date">{new Date(mail.time).toLocaleString()}</div>
      </div>

      <main className="mail-detail-body">
        <p>{mail.body}</p>
      </main>
    </div>
  );
}

export default MailDetailView;