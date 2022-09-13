import React, { useState, useContext, useRef, useCallback } from 'react';

import iconSearch from '../assets/media/icon-search.svg';
import iconClear from '../assets/media/icon-clear.svg';
import { Context } from '../App';
import debounce from 'lodash.debounce';

export default function Search() {

  let [localValue, setLocalValue] = useState('');

  const {search} = useContext(Context);
  let {searchValue, setSearchValue} = search;

  const searchInput = useRef(null);

  const handleSearchIcon = () => {
    setLocalValue('');
    delayCallUpdateSearch('');
    searchInput.current.focus();
  }

  
  const delayCallUpdateSearch = useCallback(
    debounce((value) => {
      setSearchValue(value);
      console.log(value);
    }, 600),
  []);

  const handleSearchInput = e => {
    setLocalValue(e.target.value);
    delayCallUpdateSearch(e.target.value);
  };

  return (
    <div className="search">
      <input
        value={localValue}
        onChange={e => handleSearchInput(e)}
        ref={searchInput}
        className="search__input" 
        type="text" 
        placeholder="Поиск..."
      />
      <div className="search__icon">
        {
          !localValue ? 
          <img src={iconSearch} alt="Поиск" /> :
          <img 
            onClick={handleSearchIcon}
            className="close" 
            src={iconClear} 
            alt="Поиск" 
          />
        }
      </div>
    </div>
  )
}
