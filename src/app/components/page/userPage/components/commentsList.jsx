import React from 'react';
import CommentItem from './commentItem';
import PropTypes from 'prop-types';

const CommentsList = ({ comments, handleCommentDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            handleCommentDelete={handleCommentDelete}
          />
        ))}
      </div>
    </div>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  handleCommentDelete: PropTypes.func
};

export default CommentsList;
