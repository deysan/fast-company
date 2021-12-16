import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem,
  clearFilter
}) => {
  return (
    <>
      <ul className="list-group">
        {Object.prototype.toString.call(items) === '[object Object]' &&
          Object.keys(items).map((item) => (
            <li
              key={items[item][valueProperty]}
              className={
                'list-group-item' +
                (items[item] === selectedItem ? ' active' : '')
              }
              onClick={() => onItemSelect(items[item])}
              role="button"
            >
              {items[item][contentProperty]}
            </li>
          ))}
        {Object.prototype.toString.call(items) === '[object Array]' &&
          items.map((item) => (
            <li
              key={item[valueProperty]}
              className={
                'list-group-item' +
                (item[valueProperty] === selectedItem ? ' active' : '')
              }
              onClick={() => onItemSelect(item[valueProperty])}
              role="button"
            >
              {item[contentProperty]}
            </li>
          ))}
      </ul>
      <button className="btn btn-secondary mt-2" onClick={clearFilter}>
        Сброс
      </button>
    </>
  );
};

Filter.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
};

Filter.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onItemSelect: PropTypes.func,
  clearFilter: PropTypes.func
};

export default Filter;
