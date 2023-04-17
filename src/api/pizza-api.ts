import axios from 'axios';
import React from 'react';
import { SearchContext } from '../App';
import { PizzaBlockType } from '../components/PizzaBlock-/PizzaBlock';
import { useAppSelector } from '../redux/redux-hooks/redux-hooks';

export const useFetchPizzas = () => {
  const categoryId = useAppSelector((state) => state.filter.categoryId);
  const sortType = useAppSelector((state) => state.filter.sort);
  const { searchValue } = React.useContext(SearchContext);
  const currentPage = useAppSelector((state) => state.filter.currentPage);

  const fetchPizzas_ = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');

    return axios.get<Array<PizzaBlockType>>(
      `https://63ea242be0ac9368d64b2797.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
    );
  };

  const fetchPizzas = React.useCallback(fetchPizzas_, [categoryId, currentPage, searchValue, sortType.sortProperty]);
  return { fetchPizzas };
};
