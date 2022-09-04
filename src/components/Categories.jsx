import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../store/categorySlice';

export default function Categories({categories}) {

  const dispatch = useDispatch();
  const catValue = useSelector(state => state.category.activeCategory);

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, index) => 
            <li 
              key={index} 
              onClick={() => dispatch(changeCategory(index))}
              className={index === catValue ? "active" : null}>
                {item}
            </li>
          )
        }

      </ul>
    </div>
  )
}
