import style from './style.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={style.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={style.description}>К сожалению страница отсутствует</p>
    </div>
  );
};
