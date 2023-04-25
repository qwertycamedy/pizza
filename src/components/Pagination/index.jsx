import React from "react";
import ReactPaginate from 'react-paginate';
import cl from './Pagination.module.scss'

function Pagination({curPage, onChangePage}) {
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
          renderOnZeroPageCount={null}
        />
  );
}

export default Pagination;
