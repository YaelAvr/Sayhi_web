import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import searchIcon from './search.svg'; 

// שינינו את שם ה-prop ל-onFullSearch כדי שיהיה ברור
const SearchBar = ({ onFullSearch, onPreviewItemClick  }) => {
  const [query, setQuery] = useState('');
  const [previewResults, setPreviewResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchBarRef = useRef(null);

  // Hook לזיהוי לחיצה מחוץ לרכיב כדי לסגור את החלונית
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

  // Hook לביצוע חיפוש מקדים עם השהיה (Debounce)
  useEffect(() => {
    // אם אין שאילתה, נקה הכל
    if (query.trim() === '') {
      setPreviewResults([]);
      setIsDropdownVisible(false);
      return;
    }

    // הפעל את החיפוש המקדים רק אחרי שהמשתמש הפסיק להקליד ל-300ms
    const debounceTimer = setTimeout(() => {
      const fetchPreview = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`/api/mails/search/${encodeURIComponent(query)}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          if (!response.ok) throw new Error('Preview search failed');
          const data = await response.json();
          // לוקחים רק את 5 התוצאות הראשונות לתצוגה המקדימה
          setPreviewResults(data.slice(0, 5)); 
        } catch (error) {
          console.error("Error fetching preview:", error);
          setPreviewResults([]); // במקרה של שגיאה, נקה תוצאות
        } finally {
          setIsLoading(false);
        }
      };

      fetchPreview();
    }, 300);

    // ניקוי הטיימר בכל הקלדה חדשה
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // פונקציה שמפעילה את החיפוש המלא
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
      e.preventDefault(); // מונע התנהגות דיפולטיבית של טפסים
      handleTriggerFullSearch();
    }
  };

   const handlePreviewItemClick = (mail) => {
    // 1. קוראים לפונקציה מההורה (InboxPage) כדי לפתוח את המייל
    onPreviewItemClick(mail);

    // 2. מנקים את ממשק החיפוש
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
                onClick={() => handlePreviewItemClick(mail)} // הפעלת הפונקציה החדשה
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
    // מונעים את התנהגות ברירת המחדל כדי שה-input לא יאבד פוקוס
    // (למרות שכאן זה פחות קריטי כי אנחנו מיד סוגרים את החלונית)
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