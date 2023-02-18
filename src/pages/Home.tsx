import React from 'react';
import { Categories } from '../components/Categories';
import { PizzaBlock, PizzaBlockType } from '../components/PizzaBlock-/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock-/PizzaSkeleton';
import { Sort, ValueSortType } from '../components/Sort';

export const Home = () => {
  const [items, setItems] = React.useState<Array<PizzaBlockType>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [categoryId, setCategoryId] = React.useState<number>(0);
  const [sortType, setSortType] = React.useState<ValueSortType>({ name: 'популярности', sortProperty: 'rating' });

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');

    fetch(`https://63ea242be0ac9368d64b2797.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  const onClickCategory = (indexCategory: number) => {
    setCategoryId(indexCategory);
  };

  const onClickSort = (sortTypeObj: ValueSortType) => {
    setSortType(sortTypeObj);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickCategory={onClickCategory} value={categoryId} />
        <Sort value={sortType} onClickSort={onClickSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};
