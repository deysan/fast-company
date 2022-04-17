import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { setTokens } from '../services/localStorage.service';

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  async function signUp({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIowVWhGkDNqLPFQfcWoxHw6ABZKgZbh0`;

    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    });
    setTokens(data);
    console.log(data);
  }

  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
