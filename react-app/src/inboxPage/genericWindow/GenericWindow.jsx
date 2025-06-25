import React from 'react';
import './GenericWindow.css';

function GenericWindow({ 
  title,         // כותרת המודאל
  children,      // התוכן המרכזי (הגוף)
  onClose,       // פונקציה לסגירה (ביטול)
  onConfirm,     // פונקציה לאישור
  confirmText,   // טקסט לכפתור האישור
  errorMessage 
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        {/* הגוף של המודאל מגיע מה-children */}
        <div className="modal-body">
          {children}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        
        {/* החלק התחתון עם הכפתורים, מובנה בתוך המודאל */}
        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-confirm" 
            onClick={onConfirm}
          >
            {confirmText || 'OK'} {/* אם לא נתנו טקסט, ברירת המחדל היא OK */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GenericWindow;