import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './useAuth';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import commentService from '../services/comment.service';
import PropTypes from 'prop-types';

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    };

    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }

    console.log(comment);
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments((prevState) =>
          prevState.filter((comment) => comment._id !== id)
        );
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  useEffect(() => {
    getComments();
  }, [userId]);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, removeComment, isLoading }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
