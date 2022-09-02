import React, { useState } from 'react';

import iconSearch from '../assets/media/icon-search.svg';
import iconClear from '../assets/media/icon-clear.svg';

export default function Search({searchValue, setSearchValue}) {

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
