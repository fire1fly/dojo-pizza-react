import React, { useEffect, useRef, useState } from 'react';

export default function Cart({ onCartBtnClick, scrollbarWidth }) {

  const popupEl = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add("scroll-lock");
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    setTimeout(() => {
      popupEl.current.classList.add("active");
    }, 0);
  }, []);

  function closeCart() {
    popupEl.current.classList.add("closing");
    setTimeout(() => {
      popupEl.current.classList.remove("active");
      onCartBtnClick(false);
      document.documentElement.classList.remove("scroll-lock");
      document.body.style.paddingRight = '';
    }, 300);
  }
  
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
          
        </div>
      </div>
    </div>
  )
}
