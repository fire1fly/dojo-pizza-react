import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import wordEndingByNumber from '../../utils/wordEndingByNumber';
import { addItem, removeItem, clearCart, subtractItem, selectCart } from '../../store/cartSlice';
import CartEmpty from './CartEmpty';


const productTypes = ['тонкое', 'традиционное'];

export default function Cart({ onCartBtnClick, scrollbarWidth }) {

  const popupEl = useRef(null);
  const dispatch = useDispatch();

  const cartState = useSelector(selectCart);
  const {items, totalPrice, totalCount} = cartState;

  useEffect(() => {
    document.documentElement.classList.add("scroll-lock");
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    setTimeout(() => {
      popupEl.current.classList.add("active");
    }, 0);
  }, [scrollbarWidth]);

  function closeCart() {
    popupEl.current.classList.add("closing");
    setTimeout(() => {
      popupEl.current.classList.remove("active");
      onCartBtnClick(false);
      document.documentElement.classList.remove("scroll-lock");
      document.body.style.paddingRight = '';
    }, 300);
  }
  
  function handleAddItem(item) {
    const product = {
      id: item.id,
      size: item.size,
      type: item.type
    }
    dispatch(addItem(product));
  }

  function handleSubtractItem(id, count) {
    if (count > 1) {
      dispatch(subtractItem(id));
    }
  }

  function handleRemoveItem(id) {
    dispatch(removeItem(id));
  }

  function handleClearCart() {
    if (items.length > 0) {
      dispatch(clearCart());
    }
  }

  const productLabel = wordEndingByNumber(items.length, ["товар", "товара", "товаров"]);

  return (
    <div className="cart-popup" ref={popupEl}>
      <div className="cart-popup__backdrop"></div>
      <div className="cart-popup__inner">
        <div className="cart-popup-close" onClick={closeCart}>
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.61 12.199L.54 3.129A1.833 1.833 0 113.13.536l9.07 9.07L21.27.54a1.833 1.833 0 012.592 2.592l-9.068 9.068 9.07 9.07a1.833 1.833 0 01-2.59 2.592l-9.072-9.07-9.073 9.073a1.833 1.833 0 01-2.591-2.592L9.61 12.2z" fill="#fff"></path>
          </svg>
        </div>
        <div className="cart">
          {
            totalCount === 0 ? 
            <CartEmpty onCloseCart={closeCart} /> :
            <div className="cart__inner">
              <div className="cart-h">
                <div className="cart-h-label">
                  {
                    totalCount > 0 ? 
                    `${totalCount} ${productLabel} на ${totalPrice} ₽` :
                    "0 товаров"
                  }
                </div>
                <div className="cart-clear" onClick={() => handleClearCart()}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 5H4.16667H17.5" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8.33337 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M11.6666 9.16667V14.1667" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  <div className="cart-clear-label">Очистить</div>
                </div>
              </div>
              
              <div className="cart-b">
                <div className="cart-b__inner">
                  {
                    items.map((item, i) => 
                      <div key={i} className="card">
                        <div className="card-delete" onClick={() => handleRemoveItem(item.id)}>
                          <svg fill="none" viewBox="0 0 24 24">
                            <path d="M17.3 5.3a1 1 0 111.4 1.4L13.42 12l5.3 5.3a1 1 0 11-1.42 1.4L12 13.42l-5.3 5.3a1 1 0 01-1.4-1.42l5.28-5.3-5.3-5.3A1 1 0 016.7 5.3l5.3 5.28 5.3-5.3z" fill="#000"></path>
                          </svg>
                        </div>
                        <div className="card-b">
                          <img 
                            src={item.imageUrl}
                            alt="пицца" 
                            className="card-pic"/>
                          <div className="card-inf">
                            <div className="card-title">{item.name}</div>
                            <div className="card-exinf">Размер: {item.size} см., {productTypes[item.type]} тесто</div>
                          </div>
                        </div>
                        <div className="card-f">
                          <div className="card-price">{item.price * item.count} ₽</div>
                          <div className="card-bar">
                            <div 
                              className={`card-bar-btn minus ${item.count === 1 ? "disabled" : null}`}
                              onClick={() => handleSubtractItem(item.id, item.count)}
                            >
                              <svg width="10" height="10" viewBox="0 0 10 10"><rect fill="#FFFFFF" y="4" width="10" height="2" rx="1"></rect></svg>
                            </div>
                            <div className="card-bar__value">{item.count}</div>
                            <div className="card-bar-btn plus" onClick={() => handleAddItem(item)}>
                              <svg width="10" height="10" viewBox="0 0 10 10">
                                <g fill="#FFFFFF"><rect x="4" width="2" height="10" ry="1"></rect><rect y="4" width="10" height="2" rx="1"></rect></g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  
                </div>
              </div>
              <div className="cart-f">
                <div className="cart-subtotal">
                  <div className="info">
                    <div className="label">Товаров: {totalCount}</div>
                    <div className="value">{totalPrice} ₽</div>
                  </div>
                  <div className="info">
                    <div className="label">Доставка</div>
                    <div className="value">Бесплатно</div>
                  </div>
                </div>
                <div className="cart-total">
                  <div className="label">Сумма заказа</div>
                  <div className="value">{totalPrice} ₽</div>
                </div>
                <button className="cart-total-btn">Оформить заказ</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
