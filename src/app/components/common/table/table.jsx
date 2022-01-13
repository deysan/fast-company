import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import PropTypes from 'prop-types';

export const Table = ({ data, columns, selectedSort, onSort, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ columns, selectedSort, onSort }} />
          <TableBody {...{ data, columns }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.object,
  selectedSort: PropTypes.object,
  onSort: PropTypes.func,
  children: PropTypes.array
};
