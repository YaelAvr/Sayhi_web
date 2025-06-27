import React from "react";
import "./Toolbar.css";

const Toolbar = ({ 
  showBackArrow,       // whether to show the back arrow (true in mail view)
  onBackClick,         // callback for back arrow click
  onPrevClick,         // callback for previous page button
  onNextClick,         // callback for next page button
  currentPage          // current page number to display
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