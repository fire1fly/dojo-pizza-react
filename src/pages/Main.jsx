import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../App';

import axios from 'axios';
import { useSelector } from 'react-redux';

import {Categories, Sort, ProductCard, ProductSkelet, Pagination } from '../components';

export function Main() {

  const {categories, activeCategory} = useSelector(state => state.category);
  const { activeSort } = useSelector(state => state.sort);

  const { search } = useContext(Context);
  let { searchValue } = search;

  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [pagStep, setPagStep] = useState(1);

  useEffect(() => {
    setLoading(true);

    const search = searchValue ? `&search=${searchValue}` : '';
    const category = activeCategory !== 0 ? `&category=${activeCategory}` : '';

    axios.get(`https://62f4edb1ac59075124c73e43.mockapi.io/products?p=
      ${pagStep}&l=10
      &sortBy=${activeSort.type}&order=${activeSort.order}
      ${category}
      ${search}
    `)
      .then(res => {
        setLoading(false);
        setProducts(res.data);
      });
      window.scrollTo(0, 0);
  }, [pagStep, searchValue, activeCategory, activeSort]);

  return (
    <>
      <div className="content__top">
        <Categories categories={categories} />
        <Sort/>
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
