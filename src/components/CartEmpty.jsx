import React from 'react';

import cartEmptyImage from '../assets/media/cart-empty.svg'

export default function CartEmpty() {
  return (
    <div className="cart-popup">
      <div className="cart-popup__backdrop"></div>
      <div className="cart-popup__inner">
        <div className="cart-popup-close">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.61 12.199L.54 3.129A1.833 1.833 0 113.13.536l9.07 9.07L21.27.54a1.833 1.833 0 012.592 2.592l-9.068 9.068 9.07 9.07a1.833 1.833 0 01-2.59 2.592l-9.072-9.07-9.073 9.073a1.833 1.833 0 01-2.591-2.592L9.61 12.2z" fill="#fff"></path>
          </svg>
        </div>
        <div className="cart">
          <div className="cart-empty">
            <div className="cart-empty__inner">
              <img src={cartEmptyImage} alt="Пусто!" className="cart-empty-image" />
              <h2 className="cart-empty-title">Ой, пусто!</h2>
              <p className="cart-empty-p">
                Ваша корзина пуста, откройте «Меню» и выберите понравившийся товар.
              </p>
              <button className="button button--cart">Вернуться в меню</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
