import React from 'react';
import { Categories } from '../components/Categories';
import { PizzaBlock, PizzaBlockType } from '../components/PizzaBlock-/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock-/PizzaSkeleton';
import { Sort } from '../components/Sort';

export const Home = () => {
  const [items, setItems] = React.useState<Array<PizzaBlockType>>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://63ea242be0ac9368d64b2797.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  );
};
