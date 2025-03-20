import React, { useState, } from 'react';

import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      console.log(`Searching for: ${query}`);
      // Placeholder: simulate fake results
      setResults([
        { id: 1, title: `Result for "${query}" 1` },
        { id: 2, title: `Result for "${query}" 2` },
      ]);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSubmit} aria-label="Search QDeep">
        <input 
          id="search-input"
          type="text" 
          placeholder="Search QDeep..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        {query && (
          <button 
            type="button" 
            className="clear-btn" 
            onClick={clearSearch}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button type="submit">Search</button>
      </form>

      {/* Placeholder Search Results */}
      {results.length > 0 && (
        <div className="search-results">
          {results.map(result => (
            <div key={result.id} className="search-result-item">
              {result.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
