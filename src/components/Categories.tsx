type CategoriesPropsType = {
  value: number;
  onClickCategory: (index: number) => void;
};

export const Categories = ({ value, onClickCategory }: CategoriesPropsType) => {
  // const [activeIndex, setActiveIndex] = React.useState(0);

  // const onClickCategory_ = (index: number) => {
  //   setActiveIndex(index);
  // };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => {
          return (
            <li key={i} onClick={() => onClickCategory(i)} className={value === i ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
