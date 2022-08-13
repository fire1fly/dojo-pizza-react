import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import useScrollbarSize from 'react-scrollbar-size';

import './assets/styles/app.sass';
import { Main } from './pages/Main';
import { ErrorPage } from './pages/ErrorPage';
import { Header, Cart, CartEmpty, CartStatic } from './components';

function App() {

  let [cartActive, setCartActive] = useState(false);

  function openCart(flag) {
    setCartActive(flag);
  }

  let { width } = useScrollbarSize();

  return (
    <div className="wrapper">
      <Header onCartBtnClick={openCart} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
      {cartActive ? <Cart onCartBtnClick={openCart} scrollbarWidth={width} /> : null}
      {/* <CartEmpty /> */}
      {/* <CartStatic /> */}
    </div>
  );
}

export default App;
