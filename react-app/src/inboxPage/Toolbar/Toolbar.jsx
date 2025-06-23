import React from "react";
import "./Toolbar.css";

const Toolbar = ({ onPrevClick, onNextClick, currentPage }) => {
  return (
    <div className="toolbar-container">
      <div className="toolbar">
        <button onClick={onPrevClick}>{'<'}</button>
        <span className="page-number">Page {currentPage}</span>
        <button onClick={onNextClick}>{'>'}</button>
      </div>
    </div>
  );
};

export default Toolbar;
