import React, { useState, useContext } from 'react';

import iconSearch from '../assets/media/icon-search.svg';
import iconClear from '../assets/media/icon-clear.svg';
import { Context } from '../App';

export default function Search() {

  const {search} = useContext(Context);
  let {searchValue, setSearchValue} = search;

  return (
    <div className="search">
      <input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        className="search__input" 
        type="text" 
        placeholder="Поиск..."
      />
      <div className="search__icon">
        {
          !searchValue ? 
          <img src={iconSearch} alt="Поиск" /> :
          <img 
            onClick={() => setSearchValue('')}
            className="close" 
            src={iconClear} 
            alt="Поиск" 
          />
        }
      </div>
    </div>
  )
}
