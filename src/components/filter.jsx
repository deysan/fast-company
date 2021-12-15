import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ items }) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li key={items[item]._id} className="list-group-item">
          {items[item].name}
        </li>
      ))}
    </ul>
  );
};

Filter.propTypes = {
  items: PropTypes.object.isRequired
};

export default Filter;
