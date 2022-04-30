import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './useAuth';
import PropTypes from 'prop-types';

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);

  async function createComment(data) {
    const comment = {
      ...data,
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    };

    console.log(comment);
  }

  useEffect(() => {
    setComments(null);
  }, []);

  return (
    <CommentsContext.Provider value={{ comments, createComment }}>
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
