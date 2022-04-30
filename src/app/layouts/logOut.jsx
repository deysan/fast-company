import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Preloader from '../components/ui/preloader';

const LogOut = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    logOut();
  }, []);

  return <Preloader />;
};

export default LogOut;
