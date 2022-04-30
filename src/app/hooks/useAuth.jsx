import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/user.service';
import localStorageService, {
  setTokens
} from '../services/localStorage.service';
import { toast } from 'react-toastify';
import Preloader from '../components/ui/preloader';

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        switch (message) {
          case 'USER_DISABLED':
            throw new Error(
              'Учетная запись пользователя отключена администратором.'
            );
          case 'EMAIL_NOT_FOUND':
          case 'INVALID_PASSWORD':
          case 'INVALID_EMAIL':
            throw new Error('Неверный email или пароль');
          default:
            throw new Error('Слишком много попыток входа, попробуйте позже');
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    history.push('/');
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post('accounts:signUp', {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким Email уже существует'
          };
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      console.log(content);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setIsLoading(true);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data.error;
    setError(message);
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, currentUser }}>
      {!isLoading ? children : <Preloader />}
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
