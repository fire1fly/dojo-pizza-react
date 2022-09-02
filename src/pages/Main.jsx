import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../App';


import {Categories, Sort, ProductCard, ProductSkelet, Pagination } from '../components';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sorts = [
  { type: 'rating', name: 'популярности', order: "asc" },
  { type: 'price', name: 'цене', order: "asc" },
  { type: 'name', name: 'алфавиту', order: "asc" }
];

export function Main() {

  const {search, category, sort} = useContext(Context);
  let {searchValue} = search;
  let {catValue} = category;
  let {activeSort} = sort;

  console.log(activeSort);

  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [pagStep, setPagStep] = useState(1);

  useEffect(() => {
    setLoading(true);

    const search = searchValue ? `&search=${searchValue}` : '';
    const category = catValue !== 0 ? `&category=${catValue}` : '';

    fetch(`https://62f4edb1ac59075124c73e43.mockapi.io/products?p=
      ${pagStep}&l=10
      &sortBy=${activeSort.type}&order=${activeSort.order}
      ${category}
      ${search}
    `)
      .then((res) => {
        return res.json();
      })
      .then(json => {
        setLoading(false);
        setProducts(json);
      });
      window.scrollTo(0, 0);
  }, [pagStep, searchValue, catValue, activeSort]);


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
      {
        products.length !== 0 ?
          <Pagination 
            count={2}
            step={pagStep}
            setStep={setPagStep}
          /> : 
          null
      }
    </>
  )
}
