import React, { useRef, useState } from 'react';

import './assets/styles/app.sass';
import goods from './assets/db.json'

import { Header, Categories, Sort, ProductCard, Cart } from './components';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sorts = [
  { type: 'rating', name: 'популярности' },
  { type: 'price', name: 'цене' },
  { type: 'alphabet', name: 'алфавиту' },
];

function App() {

  let [cartActive, setCartActive] = useState(false);

  function openCart(flag) {
    setCartActive(flag)
  }

  return (
    <div className="wrapper">
      <Header onCartBtnClick={openCart} />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories categories={categories} />
            <Sort sorts={sorts} />
          </div>
          <h2 className="content__title">Пицца</h2>
          <div className="content__items">
            {
              goods.map(item =>
                <ProductCard
                  key={item.id}
                  {...item}
                />
              )
            }
          </div>
        </div>
      </div>
      {cartActive ? <Cart onCartBtnClick={openCart} /> : null}
    </div>
  );
}

export default App;
