import React, { useState } from 'react'; 
import './LabelButton.css';

// 1. מעדכנים את רשימת ה-props שהקומפוננטה מקבלת
function LabelButton({ label, onClick, selected, iconSrc, onEditClick, onDeleteClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 2. הפונקציות הפנימיות האלה צריכות לקרוא ל-props הנכונים
  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteClick(); // קוראים ל-onDeleteClick שקיבלנו
    setIsMenuOpen(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEditClick(); // קוראים ל-onEditClick שקיבלנו
    setIsMenuOpen(false);
  };

  // 3. התנאי בודק עכשיו את ה-props הנכונים
  const isCustomLabel = onEditClick && onDeleteClick;

  return (
    <div className={`LabelButton ${selected ? ' selected' : ''}`}>
      <button className="label-main-btn" onClick={onClick}>
        {/* {iconSrc && <img className="label-icon" src={iconSrc} alt={`${label.name} icon`} />} */}
        {iconSrc && iconSrc}

        <span className="label-name">{label.name}</span>
      </button>

      {isCustomLabel && (
        <div className="label-actions">
          <button className="dots-btn" onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}>
            ⋮
          </button>
          
          {isMenuOpen && (
            <div className="label-menu">
              {/* 4. הכפתורים בתפריט קוראים לפונקציות הפנימיות הנכונות */}
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