import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/redux-hooks/redux-hooks';
import { setSort } from '../redux/slices/filterSlice';

export type ValueSortType = {
  name: string;
  sortProperty: string;
};

export const typesSort = [
  { name: 'популярности (DESC)', sortProperty: 'rating' },
  { name: 'популярности (ASC)', sortProperty: '-rating' },
  { name: 'цене (DESC)', sortProperty: 'price' },
  { name: 'цене (ASC)', sortProperty: '-price' },
  { name: 'алфавиту (DESC)', sortProperty: 'name' },
  { name: 'алфавиту (ASC)', sortProperty: '-name' },
];

export const Sort = () => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.filter.sort);

  const [open, setOpen] = React.useState(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const onClickListItem = (sortType: ValueSortType) => {
    dispatch(setSort({ typeSort: sortType }));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: Event) => {
      console.log('click event');
      const path = event.composedPath();
      if (!path.includes(sortRef.current as EventTarget)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {typesSort.map((typeSort, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(typeSort)}
                className={sort.name === typeSort.name ? 'active' : ''}
              >
                {typeSort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
