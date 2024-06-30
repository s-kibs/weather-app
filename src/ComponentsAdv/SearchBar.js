import React, { useState, useRef } from 'react';
import axios from 'axios';
import './SearchBar.css';

function SearchBar({ onSelectCity }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false); 
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${apiKey}`);
        setSuggestions(response.data.list);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectCity = (city) => {
    console.log('City selected:', city);
    onSelectCity(city);
    setQuery(city.name);
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleBlur = (e) => {
    if (suggestionsRef.current && suggestionsRef.current.contains(e.relatedTarget)) {
      return;
    }
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query.length > 2) {
      handleInputChange({ target: { value: query } });
    }
  };

  return (
      <div className="search-box">
        <button className="btn-search"><i className="fas fa-search"></i></button>
        <input
          type="text"
          className="input-search"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for a city..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
        {isFocused && suggestions.length > 0 && (
          <ul className="suggestions-list" ref={suggestionsRef}>
            {suggestions.map((city) => (
              <li key={city.id} tabIndex={0} onClick={() => handleSelectCity(city)}>
                {city.name}, {city.sys.country}
              </li>
            ))}
          </ul>
        )}
      </div>
  );
}

export default SearchBar;
