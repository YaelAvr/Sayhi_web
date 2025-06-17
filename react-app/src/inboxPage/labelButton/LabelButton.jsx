import React, { useState } from 'react'; 
import './LabelButton.css';

function LabelButton({ label, onClick, selected, iconSrc, onDelete, onUpdate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // מפעילה את פונקציית המחיקה שקיבלנו וסוגרת את התפריט
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // מונע מהקליק להפעיל את ה-onClick הראשי של הכפתור
    onDelete(label.id);
    setIsMenuOpen(false);
  };

  // מפעילה את פונקציית העריכה שקיבלנו וסוגרת את התפריט
  const handleEditClick = (e) => {
    e.stopPropagation();
    const newName = prompt("Enter new label name:", label.name);
    if (newName && newName.trim() !== "" && newName !== label.name) {
      onUpdate(label.id, newName);
    }
    setIsMenuOpen(false);
  };

  // תנאי: האם להציג את תפריט הפעולות?
  // נציג אותו רק אם הקומפוננטה קיבלה את הפונקציות onUpdate ו-onDelete.
  const isCustomLabel = onUpdate && onDelete;
  return (
   // עטפנו הכל ב-div כדי שהתפריט והכפתור יהיו יחד
    <div className={`LabelButton-wrapper ${selected ? ' selected' : ''}`}>
      
      {/* הכפתור הראשי נשאר דומה, אבל עכשיו הוא חלק מה-wrapper */}
      <button className="label-main-btn" onClick={onClick}>
        {iconSrc && <img className="label-icon" src={iconSrc} alt={`${label.name} icon`} />}
        <span className="label-name">{label.name}</span>
      </button>

      {/* החלק החדש: יוצג רק עבור תוויות מותאמות אישית */}
      {isCustomLabel && (
        <div className="label-actions">
          {/* כפתור שלוש הנקודות שפותח/סוגר את התפריט */}
          <button className="dots-btn" onClick={(e) => {
            e.stopPropagation(); // מונע הפעלת ה-onClick הראשי
            setIsMenuOpen(!isMenuOpen);
          }}>
            ⋮ {/* קוד HTML לשלוש נקודות אנכיות */}
          </button>
          
          {/* התפריט עצמו: יוצג רק אם isMenuOpen הוא true */}
          {isMenuOpen && (
            <div className="label-menu">
              <div className="menu-item" onClick={handleEditClick}>Edit</div>
              <div className="menu-item" onClick={handleDeleteClick}>Delete</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LabelButton;
