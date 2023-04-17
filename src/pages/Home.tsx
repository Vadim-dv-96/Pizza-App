import React from 'react';
import { Categories } from '../components/Categories';
import { PizzaBlock, PizzaBlockType } from '../components/PizzaBlock-/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock-/PizzaSkeleton';
import { Sort, typesSort } from '../components/Sort';
import { Pagination } from '../Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks/redux-hooks';
import { changeCategoryPizza, changePage, setFiltersFromQuerySearch } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useFetchPizzas } from '../api/pizza-api';

export const Home = () => {
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const dispatch = useAppDispatch();
  const categoryId = useAppSelector((state) => state.filter.categoryId);
  const sortType = useAppSelector((state) => state.filter.sort);
  const currentPage = useAppSelector((state) => state.filter.currentPage);

  const [items, setItems] = React.useState<Array<PizzaBlockType>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { fetchPizzas } = useFetchPizzas();

  // if was first render => checking URL-params and set them in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = typesSort.find((sort) => sort.sortProperty === params.sortProperty);
      if (sort) {
        dispatch(
          setFiltersFromQuerySearch({
            categoryId: Number(params.categoryId),
            currentPage: Number(params.currentPage),
            sort,
          })
        );
      }
      isSearch.current = true;
    }
  }, [dispatch]);

  // if was first render and changed any params in filter
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage, navigate]);

  // if was first render => fetch pizzas
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      setIsLoading(true);
      fetchPizzas().then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    }
    isSearch.current = false;
  }, [categoryId, sortType, currentPage, fetchPizzas]);

  const onClickCategory = (indexCategory: number) => {
    dispatch(changeCategoryPizza({ categryId: indexCategory }));
  };

  const onChangePage = (page: number) => {
    dispatch(changePage({ page }));
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
