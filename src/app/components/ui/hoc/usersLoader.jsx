import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStatus, loadUsersList } from '../../../store/users';
import Preloader from '../preloader';
import PropTypes from 'prop-types';

const UsersLoader = ({ children }) => {
  const dispatch = useDispatch();
  const dataStatus = useSelector(getDataStatus());

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, []);

  if (!dataStatus) return <Preloader />;

  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UsersLoader;
