import React, { useEffect, useState } from 'react';


import {Categories, Sort, ProductCard, ProductSkelet } from '../components';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sorts = [
  { type: 'rating', name: 'популярности' },
  { type: 'price', name: 'цене' },
  { type: 'alphabet', name: 'алфавиту' },
];

export function Main() {

  let [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://62f4edb1ac59075124c73e43.mockapi.io/products")
      .then((res) => {
        return res.json();
      })
      .then(json => {
        setProducts(json);
      });
  }, []);


  return (
    <>
      <div className="content__top">
        <Categories categories={categories} />
        <Sort sorts={sorts} />
      </div>
      <h2 className="content__title">Пицца</h2>
      <div className="content__items">
        {
          products.length !== 0 ?
            products.map(item => <ProductCard key={item.id} {...item} />) :
            Array(10).fill('').map((_, i) => <ProductSkelet key={i} />)
        }
      </div>
    </>
  )
}
