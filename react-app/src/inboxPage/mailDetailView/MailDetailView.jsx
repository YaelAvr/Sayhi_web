import React, { useState, useEffect } from 'react';
import './MailDetailView.css';

function MailDetailView({ mail }) {
  console.log("Mail object received:", mail);
  if (!mail) return null;

  return (
    <div className="mail-detail-view">
      <header className="mail-detail-header">
        <h2 className="mail-detail-subject dark-white-text">{mail.subject}</h2>
        <div className="mail-detail-labels">
          {mail.labels && mail.labels.map(labelName => (
            <span key={labelName} className="label-chip">
              {labelName}
            </span>
          ))}
        </div>
      </header>

      <div className="mail-detail-sender-info">
        <div className="sender-avatar">
           {mail.fromPicture ? (
            <img
              src={mail.fromPicture}
              alt={`${mail.fromName}'s profile`}
              className="sender-profile-pic"
            />
          ) : (
            <div className="avatar-placeholder dark-white-text">
              {(mail.fromName || ' ').charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="sender-details">
          <span className="sender-name dark-white-text">{mail.fromName}</span>
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
        <p className='dark-white-text'>{mail.body}</p>
      </main>
    </div>
  );
}

export default MailDetailView;