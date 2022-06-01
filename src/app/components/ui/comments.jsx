import React from 'react';
import CommentForm from '../common/comments/commentForm';
import CommentsList from '../common/comments/commentsList';
import { orderBy } from 'lodash';
import { useComments } from '../../hooks/useComments';

const Comments = () => {
  const { comments, createComment, removeComment } = useComments();

  const handleSubmit = (data) => {
    createComment(data);
  };

  const handleDeleteComment = (commentId) => {
    removeComment(commentId);
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);

  return (
    <>
      <CommentForm onSubmit={handleSubmit} />
      {sortedComments.length > 0 && (
        <CommentsList
          comments={sortedComments}
          onDelete={handleDeleteComment}
        />
      )}
    </>
  );
};

export default Comments;
