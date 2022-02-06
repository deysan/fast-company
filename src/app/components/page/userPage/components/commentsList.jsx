import React from 'react';
import CommentItem from './commentItem';

const CommentsList = () => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        <CommentItem />
      </div>
    </div>
  );
};

export default CommentsList;
