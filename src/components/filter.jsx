import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          key={items[item][valueProperty]}
          className={
            'list-group-item' + (items[item] === selectedItem ? ' active' : '')
          }
          onClick={() => onItemSelect(items[item])}
          role="button"
        >
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
  contentProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.object,
  onItemSelect: PropTypes.func
};

export default Filter;
