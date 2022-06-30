import React, { useEffect } from 'react';
import CommentForm from '../common/comments/commentForm';
import CommentsList from '../common/comments/commentsList';
import { orderBy } from 'lodash';
// import { useComments } from '../../hooks/useComments';
import { useDispatch, useSelector } from 'react-redux';
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from '../../store/comments';
import Preloader from './preloader';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  // const { createComment, removeComment } = useComments();

  const comments = useSelector(getComments());
  const isLoading = useSelector(getCommentsLoadingStatus());

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: userId }));
  };

  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(commentId));
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  return (
    <>
      <CommentForm onSubmit={handleSubmit} />
      {sortedComments.length > 0 &&
        (!isLoading ? (
          <CommentsList
            comments={sortedComments}
            onDelete={handleDeleteComment}
          />
        ) : (
          <Preloader />
        ))}
    </>
  );
};

export default Comments;
