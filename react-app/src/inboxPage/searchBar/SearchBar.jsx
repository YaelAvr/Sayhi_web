import React, { useState } from 'react';
import searchIcon from './search.svg';

const SearchBar = ({ onSearchClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className={`search-container ${isClicked ? 'focused' : ''}`}>
      <button 
        className="search-button" 
        onClick={onSearchClick} 
        aria-label="Search"
        type="button"
      >
        <img src={searchIcon} alt="search icon" className="search-icon" />
      </button>
      <input
        type="text"
        className="search-input"
        placeholder="Search mail"
        onFocus={() => setIsClicked(true)}
        onBlur={() => setIsClicked(false)}
      />
    </div>
  );
};

export default SearchBar;
