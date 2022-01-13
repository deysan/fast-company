import React from 'react';
import PropTypes from 'prop-types';

function TableHeader({ columns, selectedSort, onSort }) {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc',
        icon: selectedSort.icon === 'up' ? 'down' : 'up'
      });
    } else {
      onSort({ path: item, order: 'asc', icon: 'up' });
    }
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            {columns[column].name}{' '}
            {selectedSort.path === columns[column].path && (
              <i className={`bi bi-caret-${selectedSort.icon}-fill`}></i>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHeader.propTypes = {
  columns: PropTypes.object.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default TableHeader;
