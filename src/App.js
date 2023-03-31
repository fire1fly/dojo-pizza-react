import React, { useState, createContext } from 'react';
import { Routes, Route } from "react-router-dom";
import useScrollbarSize from 'react-scrollbar-size';

import './assets/styles/app.sass';
import { Main } from './pages/Main';
import { ErrorPage } from './pages/ErrorPage';
import { Header, Cart } from './components';

export const Context = createContext({});

function App() {

  let [cartActive, setCartActive] = useState(false);

  let { width } = useScrollbarSize();

  return (
    <div className="wrapper">
      <Header onCartBtnClick={setCartActive} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
      {cartActive ? <Cart onCartBtnClick={setCartActive} scrollbarWidth={width} /> : null}
    </div>
  );
}

export default App;
