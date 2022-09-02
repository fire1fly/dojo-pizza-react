import React, { useEffect, useState } from 'react';


import {Categories, Sort, ProductCard, ProductSkelet, Pagination } from '../components';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sorts = [
  { type: 'rating', name: 'популярности' },
  { type: 'price', name: 'цене' },
  { type: 'title', name: 'алфавиту' },
];

export function Main({searchValue}) {

  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [pagStep, setPagStep] = useState(1);

  console.log(pagStep);

  useEffect(() => {
    setLoading(true);

    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(`https://62f4edb1ac59075124c73e43.mockapi.io/products?p=${pagStep}&l=10${search}`)
      .then((res) => {
        return res.json();
      })
      .then(json => {
        console.log(json);
        setLoading(false);
        setProducts(json);
      });
      window.scrollTo(0, 0);
  }, [searchValue, pagStep]);


  return (
    <>
      <div className="content__top">
        <Categories categories={categories} />
        <Sort sorts={sorts} />
      </div>
      <h2 className="content__title">Пицца</h2>
      <div className="content__items">
        {
          !loading ?
            products.map(item => <ProductCard key={item.id} {...item} />) :
            Array(10).fill('').map((_, i) => <ProductSkelet key={i} />)
        }
      </div>
      <Pagination 
        count={2}
        step={pagStep}
        setStep={setPagStep}
      />
    </>
  )
}
