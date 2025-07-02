import React, { useState, useEffect, useRef } from 'react';
import  {API_STATUS_URL} from "../../config"
import './SearchBar.css';
import searchIcon from './search.svg'; 

const SearchBar = ({ onFullSearch, onPreviewItemClick  }) => {
  const [query, setQuery] = useState('');
  const [previewResults, setPreviewResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setPreviewResults([]);
      setIsDropdownVisible(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      const fetchPreview = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${API_STATUS_URL}/mails/search/${encodeURIComponent(query)}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Preview search failed');
          const data = await response.json();
          setPreviewResults(data.slice(0, 5)); 
        } catch (error) {
          console.error("Error fetching preview:", error);
          setPreviewResults([]);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPreview();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleTriggerFullSearch = () => {
    if (query.trim()) {
    onFullSearch(query);
    setIsDropdownVisible(false);
    setQuery('');
  }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() !== '') {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTriggerFullSearch();
    }
  };

   const handlePreviewItemClick = (mail) => {
    onPreviewItemClick(mail);
    setIsDropdownVisible(false);
    setQuery('');
  };

  return (
    <div className="searchbar-wrapper" ref={searchBarRef}>
      <div className={`search-container ${isDropdownVisible ? 'focused' : ''}`}>
        <button className="search-button" onClick={handleTriggerFullSearch} type="button">
          <img src={searchIcon} alt="search icon" className="search-icon" />
        </button>
        <input
          type="text"
          className="search-input"
          placeholder="Search mail"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setIsDropdownVisible(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <button className="clear-button" onClick={() => setQuery('')}>
            ×
          </button>
        )}
      </div>

      {isDropdownVisible && (
        <div className="search-dropdown">
          {isLoading ? (
            <div className="dropdown-item">Loading...</div>
          ) : previewResults.length > 0 ? (
            previewResults.map(mail => (
              <div
                key={mail.id}
                className="dropdown-item mail-preview"
                onClick={() => handlePreviewItemClick(mail)}
              >
                <span className="mail-preview-sender">{mail.fromName}</span>
                <span className="mail-preview-subject">{mail.subject}</span>
              </div>
            ))
          ) : (
            <div className="dropdown-item">No results found for "{query}"</div>
          )}

          <div
            className="dropdown-item full-search-trigger"
            onMouseDown={() => {
           handleTriggerFullSearch(); 
             }}
          >
            <img src={searchIcon} alt="search" className="search-icon-small" />
            <span>All search results for "{query}"</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;