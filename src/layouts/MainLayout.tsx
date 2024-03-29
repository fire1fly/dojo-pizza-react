import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import useScrollbarSize from 'react-scrollbar-size';
import { Header, Cart } from '../components'

console.log(Cart);

export default function MainLayout() {

  let [cartActive, setCartActive] = useState<boolean>(false);

  let { width } = useScrollbarSize();

  return (
    <div className="wrapper">
      <Header onCartBtnClick={setCartActive} />
      <div className="content">
        <div className="container">
          <Outlet />
        </div>
        {cartActive ? <Cart onCartBtnClick={setCartActive} scrollbarWidth={width} /> : null}
      </div>
    </div>
  )
}
