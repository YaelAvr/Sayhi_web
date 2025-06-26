import React from "react";
import "./Toolbar.css";

const Toolbar = ({ 
  showBackArrow, 
  onBackClick, 
  onPrevClick, 
  onNextClick, 
  currentPage 
}) => {
  return (
    <div className="toolbar-container">
      <div className="toolbar">
        {showBackArrow ? ( //if the mail view is open, so the back arrow will appear
          <button className="back-arrow-btn" onClick={onBackClick}>
            →
          </button>
        ) : ( //otherwise, it will shoe the other buttons without the arrow
          <> 
            <button onClick={onPrevClick}>{'<'}</button>
            <span className="page-number">Page {currentPage}</span>
            <button onClick={onNextClick}>{'>'}</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Toolbar;