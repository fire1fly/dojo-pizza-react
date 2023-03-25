import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addItem } from '../../store/cartSlice';

const productTypes = ['тонкое', 'традиционное'];

export default function ProductCard({id, name, price, imageUrl, sizes, types}) {

  let [count, setCount] = useState(0);
  let [activeSize, setActiveSize] = useState(0);
  let [activeType, setActiveType] = useState(0);

  const dispatch = useDispatch();

  const addProductToCart = () => {
    setCount(++count);

    const product = { 
      id: `${id}_${activeType}_${sizes[activeSize]}`,
      name, 
      price, 
      imageUrl, 
      size: sizes[activeSize],
      type: activeType
    }

    dispatch(addItem(product));
  }

  return (
    <div className="pizza-block">
      <div className="pizza-block__image">
        <img
          src={imageUrl}
          alt="Pizza"
        />
      </div>
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {
            types.map((type, i) => 
              <li 
                key={i}
                onClick={() => setActiveType(i)}
                className={i === activeType ? "active" : null}>
                {productTypes[type]}
              </li>
            ) 
          }
        </ul>
        <ul>
          {
            sizes.map((size, i) =>
              <li 
                key={i}
                onClick={() => setActiveSize(i)}
                className={i === activeSize ? "active" : null}>
                {size} см.
              </li>
            ) 
          }
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button className="button button--outline button--add" onClick={addProductToCart}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {
            count !== 0 ?
            <i>{count}</i> :
            null
          }
        </button>
      </div>
    </div>
)
}
