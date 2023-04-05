import React from 'react';

import cartEmptyImage from '../../assets/media/empty-picture.svg';

const CartEmpty: React.FC<{onCloseCart: () => void}> = ({onCloseCart}) => {
  return (
    <div className="cart-empty">
      <div className="cart-empty__inner">
        <img src={cartEmptyImage} alt="Пусто!" className="cart-empty-image" />
        <h2 className="cart-empty-title">Ой, пусто!</h2>
        <p className="cart-empty-p">
          Ваша корзина пуста, откройте «Меню» и выберите понравившийся товар.
        </p>
        <button 
          className="button button--cart"
          onClick={() => onCloseCart()}
        >
            Вернуться к товарам
        </button>
      </div>
    </div>
  )
}

export default CartEmpty;
