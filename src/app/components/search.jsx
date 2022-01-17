import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchValue, setSearchValue }) => {
  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  };

  return (
    <form>
      <input
        className="form-control"
        id="search"
        type="search"
        placeholder="Поиск по имени..."
        value={searchValue}
        onChange={handleChange}
      />
    </form>
  );
};

Search.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired
};

export default Search;
