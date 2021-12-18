import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function TableBody({ users, data, columns, onDelete, onBookmark }) {
  const MAX_RATING = 5;

  const renderContent = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component;

      if (typeof component === 'function') {
        return component(item);
      }

      return component;
    }

    if (columns[column].path === 'rate') {
      return `${item[columns[column].path]} / ${MAX_RATING}`;
    }

    return _.get(item, columns[column].path);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{renderContent(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired
};

export default TableBody;
