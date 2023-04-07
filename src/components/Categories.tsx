import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../store/filterSlice';
import { RootState } from '../store/store';

interface ICategories {
  categories: string[]
}


const Categories: React.FC<ICategories> = ({categories}) => {

  const dispatch = useDispatch();
  const catValue = useSelector((state: RootState) => state.filter.activeCategory);

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(changeCategory(index))
  }, []);

  return (
    <div className="categories">
      <ul>
        {
          categories.map((item, index) => 
            <li 
              key={index} 
              onClick={() => onChangeCategory(index)}
              className={index === catValue ? "active" : ""}>
                {item}
            </li>
          )
        }

      </ul>
    </div>
  )
}

export default React.memo(Categories);
