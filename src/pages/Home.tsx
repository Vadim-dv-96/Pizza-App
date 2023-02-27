import axios from 'axios';
import React from 'react';
import { SearchContext } from '../App';
import { Categories } from '../components/Categories';
import { PizzaBlock, PizzaBlockType } from '../components/PizzaBlock-/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock-/PizzaSkeleton';
import { Sort } from '../components/Sort';
import { Pagination } from '../Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks/redux-hooks';
import { changeCategoryPizza } from '../redux/slices/filterSlice';

export const Home = () => {
  const { searchValue } = React.useContext(SearchContext);

  const dispatch = useAppDispatch();
  const categoryId = useAppSelector((state) => state.filter.categoryId);
  const sortType = useAppSelector((state) => state.filter.sort);

  const [items, setItems] = React.useState<Array<PizzaBlockType>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');

    axios
      .get<Array<PizzaBlockType>>(
        `https://63ea242be0ac9368d64b2797.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const onClickCategory = (indexCategory: number) => {
    dispatch(changeCategoryPizza({ categryId: indexCategory }));
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickCategory={onClickCategory} value={categoryId} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />) : pizzas}
      </div>
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};
