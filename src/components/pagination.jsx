import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={'page-item' + (page === currentPage ? ' active' : '')}
            key={'page_' + page}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
