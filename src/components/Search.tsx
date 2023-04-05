import React, { useState, useRef, useCallback } from 'react';

import iconSearch from '../assets/media/icon-search.svg';
import iconClear from '../assets/media/icon-clear.svg';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { changeSearchQuery } from '../store/filterSlice';

export default function Search() {

  let [localValue, setLocalValue] = useState<string>('');

  const dispatch = useDispatch();

  const searchInput = useRef<HTMLInputElement>(null);

  const handleSearchIcon = () => {
    setLocalValue('');
    delayCallUpdateSearch('');
    searchInput.current?.focus();
  }

  
  const delayCallUpdateSearch = useCallback(
    debounce((value: string) => {
      dispatch(changeSearchQuery(value))
    }, 600),
  []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
