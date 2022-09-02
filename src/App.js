import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import useScrollbarSize from 'react-scrollbar-size';

import './assets/styles/app.sass';
import { Main } from './pages/Main';
import { ErrorPage } from './pages/ErrorPage';
import { Header, Cart, CartEmpty, CartStatic } from './components';

function App() {

  let [cartActive, setCartActive] = useState(false);
  let [searchValue, setSearchValue] = useState('');

  let { width } = useScrollbarSize();

  return (
    <div className="wrapper">
      <Header onCartBtnClick={setCartActive} searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Main searchValue={searchValue} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
      {cartActive ? <Cart onCartBtnClick={setCartActive} scrollbarWidth={width} /> : null}
      {/* <CartEmpty /> */}
      {/* <CartStatic /> */}
    </div>
  );
}

export default App;
