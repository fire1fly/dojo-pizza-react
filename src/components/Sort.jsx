import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { changeSort } from '../store/filterSlice';

const Sort = function Sort() {

  let [popupActive, setPopupActive] = useState(false);

  const dispatch = useDispatch();
  const {sorts, activeSort} = useSelector(state => state.filter);  

  function handleSort(e, sort) {
    if (e.target.closest(".active")) {
      sort.order = sort.order === "asc" ? "desc" : "asc";
    }
    setPopupActive(false);
    dispatch(changeSort(sort));
  }

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          transform={popupActive ? "rotate(180)" : null}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <div className="sort__value" onClick={() => setPopupActive(flag => !flag)}>
          <span>{sorts[activeSort.id].name}</span>
          <div className="order">
            {activeSort.order === "asc" ? 
              <svg className="order-asc" enableBackground="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg" >
                <path clipRule="evenodd" d="M26.704,10.192l-9.999-9.899  c-0.397-0.393-1.03-0.378-1.428,0l-9.999,9.9c-0.394,0.391-0.394,1.024,0,1.414c0.395,0.391,1.034,0.391,1.429,0l8.275-8.192V31  c0,0.552,0.452,1,1.01,1s1.01-0.448,1.01-1V3.414l8.275,8.192c0.394,0.391,1.034,0.391,1.428,0  C27.099,11.216,27.099,10.583,26.704,10.192z"  fillRule="evenodd"/>
              </svg> 
              :
              <svg className="order-desc" enableBackground="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px"xmlns="http://www.w3.org/2000/svg" >
                <path clipRule="evenodd" d="M26.704,20.393  c-0.394-0.39-1.034-0.391-1.428,0l-8.275,8.193V1c0-0.552-0.452-1-1.01-1s-1.01,0.448-1.01,1v27.586l-8.275-8.192  c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414l9.999,9.899c0.39,0.386,1.039,0.386,1.429,0l9.999-9.899  C27.099,21.417,27.099,20.784,26.704,20.393C26.31,20.003,27.099,20.784,26.704,20.393z" fillRule="evenodd"/>
              </svg>
            }
          </div>
        </div>
      </div>
      { popupActive &&
        (<div className="sort__popup">
            <ul>
            {
              sorts.map((item, i) => 
                <li
                  key={i}
                  onClick={(e) => {
                    handleSort(e, {id: i, type: item.type, order: item.order})
                  }}
                  className={activeSort.id === i ? 'active' : null}>
                  <div className="label">{item.name}</div>
                  <div className="order">
                    {item.order === "asc" ? 
                      <svg className="order-asc" enableBackground="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg" >
                        <path clipRule="evenodd" d="M26.704,10.192l-9.999-9.899  c-0.397-0.393-1.03-0.378-1.428,0l-9.999,9.9c-0.394,0.391-0.394,1.024,0,1.414c0.395,0.391,1.034,0.391,1.429,0l8.275-8.192V31  c0,0.552,0.452,1,1.01,1s1.01-0.448,1.01-1V3.414l8.275,8.192c0.394,0.391,1.034,0.391,1.428,0  C27.099,11.216,27.099,10.583,26.704,10.192z"  fillRule="evenodd"/>
                      </svg> 
                      :
                      <svg className="order-desc" enableBackground="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px"xmlns="http://www.w3.org/2000/svg" >
                        <path clipRule="evenodd" d="M26.704,20.393  c-0.394-0.39-1.034-0.391-1.428,0l-8.275,8.193V1c0-0.552-0.452-1-1.01-1s-1.01,0.448-1.01,1v27.586l-8.275-8.192  c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414l9.999,9.899c0.39,0.386,1.039,0.386,1.429,0l9.999-9.899  C27.099,21.417,27.099,20.784,26.704,20.393C26.31,20.003,27.099,20.784,26.704,20.393z" fillRule="evenodd"/>
                      </svg>
                    }
                  </div>
                </li>
              )
            }
          </ul>
        </div>)
      }
    </div>
  )
}

export default Sort;
