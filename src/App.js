import React, { useEffect, useState } from 'react';
import useScrollbarSize from 'react-scrollbar-size';

import './assets/styles/app.sass';

import { Header, Categories, Sort, ProductCard, Cart, CartEmpty, CartStatic } from './components';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sorts = [
  { type: 'rating', name: 'популярности' },
  { type: 'price', name: 'цене' },
  { type: 'alphabet', name: 'алфавиту' },
];

function App() {

  let [products, setProducts] = useState([]);
  let [cartActive, setCartActive] = useState(false);

  useEffect(() => {
    fetch("https://62f4edb1ac59075124c73e43.mockapi.io/products")
      .then((res) => {
        return res.json();
      })
      .then(json => {
        setProducts(json);
      });
  }, []);

  let { width } = useScrollbarSize();

  function openCart(flag) {
    setCartActive(flag);
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
              products.map(item =>
                <ProductCard
                  key={item.id}
                  {...item}
                />
              )
            }
          </div>
        </div>
      </div>
      {/* {cartActive ? <Cart onCartBtnClick={openCart} scrollbarWidth={width} /> : null} */}
      {/* <CartEmpty /> */}
      {/* <CartStatic /> */}
    </div>
  );
}

export default App;
