import React from 'react';

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

export default Bookmark;
