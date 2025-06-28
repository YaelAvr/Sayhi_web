import React, { useState, useEffect } from "react";
import "./LabelButton.css";

function LabelButton({
  label,
  index,
  onClick,
  selected,
  iconSrc,
  onEditClick,
  onDeleteClick,
}) {
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
      window.addEventListener("click", closeMenu);
    }

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [isMenuOpen]);

  const isCustomLabel = onEditClick && onDeleteClick;

  return (
    <div
      className={`LabelButton ${selected ? "selected" : ""} ${
        isMenuOpen ? "menu-open" : ""
      }`}
    >
      <button className="label-main-btn" onClick={onClick}>
        {iconSrc && iconSrc}

        <p className="label-name">{label.name}</p>
      </button>

      {isCustomLabel && (
        <>
        <div className="label-actions">
          <button
            className="dots-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
          >
            ⋮
          </button>
        </div>
         {isMenuOpen && (
            <div className={`label-menu ${index <= 3 ?'open-below' : 'open-above'}`} onClick={(e) => e.stopPropagation()}>
              <div className="menu-item" onClick={handleEdit}>
                Edit label
              </div>
              <div className="menu-item" onClick={handleDelete}>
                Delete label
              </div>
            </div>
          )}
          </>
      )}
    </div>
  );
}

export default LabelButton;
