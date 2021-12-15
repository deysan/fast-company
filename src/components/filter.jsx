import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ items, valueProperty, contentProperty }) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li key={items[item][valueProperty]} className="list-group-item">
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
};

Filter.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
};

Filter.propTypes = {
  items: PropTypes.object.isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired
};

export default Filter;
