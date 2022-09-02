import React, { useState, createContext } from 'react';
import { Routes, Route } from "react-router-dom";
import useScrollbarSize from 'react-scrollbar-size';

import './assets/styles/app.sass';
import { Main } from './pages/Main';
import { ErrorPage } from './pages/ErrorPage';
import { Header, Cart, CartEmpty, CartStatic } from './components';

export const Context = createContext({});

function App() {

  let [cartActive, setCartActive] = useState(false);
  let [searchValue, setSearchValue] = useState('');
  const [catValue, setCatValue] = useState(0);
  let [activeSort, setActiveSort] = useState({ id: 0, type: 'rating', order: "desc" });

  let { width } = useScrollbarSize();

  const contextValue = {
    search: { searchValue, setSearchValue },
    category: { catValue, setCatValue },
    sort: { activeSort, setActiveSort }
  }

  return (
    <div className="wrapper">
      <Context.Provider value={contextValue}>
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
        {/* <CartEmpty /> */}
        {/* <CartStatic /> */}
      </Context.Provider>
    </div>
  );
}

export default App;
