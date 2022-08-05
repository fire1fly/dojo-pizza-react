import React from 'react';

import './assets/styles/app.sass'

import { Header, Categories, Sort, PizzaBlock } from './components'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Пицца</h2>
          <div className="content__items">
            {
              Array(10).fill('').map((a, i) => <PizzaBlock key={i} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
