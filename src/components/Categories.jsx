import React, { useContext, useState } from 'react';
import { Context } from '../App';

export default function Categories({categories}) {

  const { category } = useContext(Context);
  let { catValue, setCatValue } = category;

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, index) => 
            <li 
              key={index} 
              onClick={() => setCatValue(index)}
              className={index === catValue ? "active" : null}>
                {item}
            </li>
          )
        }

      </ul>
    </div>
  )
}
