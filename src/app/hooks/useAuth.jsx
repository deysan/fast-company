import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/user.service';
import { setTokens } from '../services/localStorage.service';

const httpAuth = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({});

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;

    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    });
    setTokens(data);
    await createUser({ _id: data.localId, email, ...rest });
    console.log(data);
  }

  async function createUser(data) {
    const { content } = userService.create(data);
    setUser(content);
  }

  return (
    <AuthContext.Provider value={{ signUp, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
