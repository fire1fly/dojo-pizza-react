import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { ISetFilters, setFilters } from '../store/filterSlice';
import { fetchProducts } from '../store/productsSlice';

import {Categories, Sort, ProductCard, ProductSkelet, Pagination, ErrorBlock } from '../components';

import errorImage from '../assets/media/empty-picture.svg';
import { RootState, useAppDispatch } from '../store/store';

const Main: React.FC = () => {

  const {categories, activeCategory, activeSort, activePage, searchQuery} = useSelector((state: RootState) => state.filter);
  const { items, status } = useSelector((state: RootState) => state.products);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const handleFetchProducts = () => {

    const search = searchQuery ? `&search=${searchQuery}` : '';
    const category = activeCategory !== 0 ? `&category=${activeCategory}` : '';

    try {
      const params = {
        activePage: String(activePage),
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
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const filters: ISetFilters = {
        page: Number(params.page),
        category: Number(params.category),
        searchQuery: String(params.searchQuery),
        sortId: Number(params.sortId),
        sortType: String(params.sortType),
        sortOrder: String(params.sortOrder)
      }

      dispatch(setFilters(filters));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        page: activePage,
        limit: '10',
        sortType: activeSort.type,
        sortOrder: activeSort.order,
        sortId: activeSort.id,
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
      <div className={`content__items ${status === "success" && items.length === 0 ? "_empty" : null}`}>
        {
          (status === "loading") ?
            Array(10).fill('').map((_, i) => <ProductSkelet key={i} />) :
          (status === "success" && items.length !== 0) ?
            items.map((item: any) => <ProductCard key={item.id} {...item} />) :
          (status === "success" && items.length === 0) ?
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

export default Main;
