import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../store/filterSlice';

interface ICategories {
  categories: string[]
}

const Categories: React.FC<ICategories> = ({categories}) => {

  const dispatch = useDispatch();
  const catValue = useSelector((state: any) => state.filter.activeCategory);

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, index) => 
            <li 
              key={index} 
              onClick={() => dispatch(changeCategory(index))}
              className={index === catValue ? "active" : ""}>
                {item}
            </li>
          )
        }

      </ul>
    </div>
  )
}

export default Categories;
