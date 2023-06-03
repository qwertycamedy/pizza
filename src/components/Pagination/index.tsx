import React, { FC } from "react";
import ReactPaginate from 'react-paginate';
import cl from './Pagination.module.scss'

type PaginationProps = {
  curPage: number,
  onChangePage: (page: number) => void,
}

const Pagination:FC<PaginationProps> = ({curPage, onChangePage}) => {
  return (
        <ReactPaginate
          className={cl.root}
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          onPageChange={e => onChangePage(e.selected + 1)}
          pageRangeDisplayed={4}
          pageCount={3}
          forcePage={curPage - 1}
        />
  );
}

export default Pagination;
