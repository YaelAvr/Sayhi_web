import React from 'react';
import './GenericWindow.css';

function GenericWindow({ 
  title,        
  children,     
  onClose,       
  onConfirm,     
  confirmText,   
  errorMessage 
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {children}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        
        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-confirm" 
            onClick={onConfirm}
          >
            {confirmText || 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GenericWindow;