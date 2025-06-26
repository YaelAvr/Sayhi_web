import React, { useState, useEffect } from 'react';
import './MailDetailView.css';

function MailDetailView({ mail }) {
  // אם במקרה אין מייל, לא נציג כלום
  console.log("Mail object received:", mail);
  if (!mail) return null;

  return (
    <div className="mail-detail-view">
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
        <div className="sender-avatar">
           {mail.fromPicture ? (
            <img
              src={mail.fromPicture}
              alt={`${mail.fromName}'s profile`}
              className="sender-profile-pic"
            />
          ) : (
            <div className="avatar-placeholder">
              {(mail.fromName || ' ').charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="sender-details">
          <span className="sender-name">{mail.fromName}</span>
          <span className="sender-email">{`<${mail.fromUserName}@sayhi.com>`}</span>
        </div>
        <div className="mail-detail-date">
             {new Date(mail.time).toLocaleString('en-US', {
                month: 'short', day: 'numeric',
                 hour: 'numeric', minute: '2-digit',
                 hour12: false
                 })}
           </div>
      </div>

      <main className="mail-detail-body">
        <p>{mail.body}</p>
      </main>
    </div>
  );
}

export default MailDetailView;