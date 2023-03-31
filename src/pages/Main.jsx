import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../store/filterSlice';
import { fetchProducts } from '../store/productsSlice';

import {Categories, Sort, ProductCard, ProductSkelet, Pagination, ErrorBlock } from '../components';

import errorImage from '../assets/media/empty-picture.svg';

export function Main() {

  const {categories, activeCategory, activeSort, activePage, searchQuery} = useSelector(state => state.filter);
  const { items, status } = useSelector(state => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const handleFetchProducts = () => {

    const search = searchQuery ? `&search=${searchQuery}` : '';
    const category = activeCategory !== 0 ? `&category=${activeCategory}` : '';

    try {
      const params = {
        activePage,
        sortType: activeSort.type,
        sortOrder: activeSort.order,
        category,
        search
      }
      dispatch(fetchProducts(params));
    } catch (error) {
      console.log("Error fetchProdcuts: ", error);
    }
  }

  useEffect(() => {
    console.log(window.location.search);
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
        searchQuery
      });
      navigate(`?${queryString}`)
    }
    isMounted.current = true;

    if (!isSearch.current) {
      handleFetchProducts();
    }
    isSearch.current = false;

    window.scrollTo(0, 0);

  }, [activePage, searchQuery, activeCategory, activeSort]);

  if (status === "error") {
    return <ErrorBlock 
      title="Что-то пошло не так." 
      imageUrl={errorImage} 
      description="Попробуйте позже или перезагрузите страницу." 
    />
  }


  return (
    <>
      <div className="content__top">
        <Categories categories={categories} />
        <Sort/>
      </div>

      <h2 className="content__title">Пицца</h2>
      <div className={`content__items ${status === "loaded" && items.length === 0 ? "_empty" : null}`}>
        {
          (status === "loading") ?
            Array(10).fill('').map((_, i) => <ProductSkelet key={i} />) :
          (status === "loaded" && items.length !== 0) ?
            items.map(item => <ProductCard key={item.id} {...item} />) :
          (status === "loaded" && items.length === 0) ?
            <ErrorBlock 
              title="Не найдено ни одного товара." 
              imageUrl={errorImage} 
            /> : null
        }
      </div>
      {
        items.length !== 0 ?
          <Pagination count={2} /> : 
          null
      }
    </>
  )
}
