import ReactPaginate from 'react-paginate';

import style from './style.module.scss';

type PaginationPropsType = {
  onChangePage: (page: number) => void;
};

export const Pagination = ({ onChangePage }: PaginationPropsType) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={() => null}
    />
  );
};
