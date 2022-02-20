import React from 'react';
import CommentItem from './commentItem';
import PropTypes from 'prop-types';

const CommentsList = ({ comments, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        {comments.map((comment) => (
          <CommentItem key={comment._id} {...comment} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  onDelete: PropTypes.func
};

export default CommentsList;
