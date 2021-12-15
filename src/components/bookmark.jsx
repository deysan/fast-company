import React from 'react';
import PropTypes from 'prop-types';

const Bookmark = (props) => {
  const { isBookmark, onBookmark, id } = props;

  const getBookmarkClasses = () => {
    let classes = 'bi bi-';
    classes += isBookmark === true ? 'bookmark-fill' : 'bookmark';
    return classes;
  };

  return (
    <button
      type="button"
      className="btn btn-light"
      onClick={() => onBookmark(id)}
    >
      <i className={getBookmarkClasses()}></i>
    </button>
  );
};

Bookmark.propTypes = {
  isBookmark: PropTypes.bool.isRequired,
  onBookmark: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default Bookmark;
