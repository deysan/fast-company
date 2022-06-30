import React, { useEffect } from 'react';
// import { useAuth } from '../hooks/useAuth';
import Preloader from '../components/ui/preloader';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/users';

const LogOut = () => {
  // const { logOut } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  }, []);

  return <Preloader />;
};

export default LogOut;
