import React, { useState, useEffect } from 'react'; 
import './LabelButton.css';

function LabelButton({ label, onClick, selected, iconSrc, onEditClick, onDeleteClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteClick();
    setIsMenuOpen(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEditClick();
    setIsMenuOpen(false);
  };


  useEffect(() => {
    const closeMenu = () => {
      setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      window.addEventListener('click', closeMenu);
    }

    return () => {
      window.removeEventListener('click', closeMenu);
    };
  }, [isMenuOpen]);



  const isCustomLabel = onEditClick && onDeleteClick;

  return (
    <div className={`LabelButton ${selected ? ' selected' : ''}`}>
      <button className="label-main-btn" onClick={onClick}>
        {iconSrc && <img className="label-icon" src={iconSrc} alt={`${label.name} icon`} />}
        <span className="label-name">{label.name}</span>
      </button>

      {isCustomLabel && (
        <div className="label-actions">
         <button className="dots-btn" onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(prev => !prev);
          }}>
            ⋮
          </button>
          
           {isMenuOpen && (
            <div className="label-menu" onClick={(e) => e.stopPropagation()}>
              <div className="menu-item" onClick={handleEdit}>Edit label</div>
              <div className="menu-item" onClick={handleDelete}>Delete label</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LabelButton;