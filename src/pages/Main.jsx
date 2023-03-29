import React, { useEffect, useState, useContext, useRef } from 'react';
import { Context } from '../App';

import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../store/filterSlice';

import {Categories, Sort, ProductCard, ProductSkelet, Pagination } from '../components';

export function Main() {

  const {categories, activeCategory, activeSort, activePage} = useSelector(state => state.filter);

  const { search } = useContext(Context);
  let { searchValue } = search;

  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchProducts = async () => {
    setLoading(true);

    const search = searchValue ? `&search=${searchValue}` : '';
    const category = activeCategory !== 0 ? `&category=${activeCategory}` : '';

    try {
      const res = await axios.get(
        `https://62f4edb1ac59075124c73e43.mockapi.io/products?p=${activePage}&l=10&sortBy=${activeSort.type}&order=${activeSort.order}${category}${search}`
      );
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetchProdcuts: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        page: activePage,
        limit: '10',
        sortBy: activeSort.type,
        order: activeSort.order,
        orderId: activeSort.id,
        category: activeCategory,
      });
      navigate(`?${queryString}`)
    }
    isMounted.current = true;

    if (!isSearch.current) {
      fetchProducts();
    }
    isSearch.current = false;

    window.scrollTo(0, 0);

  }, [activePage, searchValue, activeCategory, activeSort]);

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
          <Pagination count={2} /> : 
          null
      }
    </>
  )
}
