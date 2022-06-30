import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import UserEdit from '../components/page/userEdit';
import UserPage from '../components/page/userPage';
import UsersList from '../components/page/usersList/usersList';
import Preloader from '../components/ui/preloader';
import { useAuth } from '../hooks/useAuth';
import UserProvider from '../hooks/useUsers';
import { getDataStatus, loadUsersList } from '../store/users';

const Users = () => {
  const dispatch = useDispatch();
  const { userId, edit } = useParams();
  const { currentUser } = useAuth();
  const dataStatus = useSelector(getDataStatus());

  useEffect(() => {
    if (!dataStatus) {
      dispatch(loadUsersList());
    }
  }, []);

  if (!dataStatus) return <Preloader />;

  return (
    <UserProvider>
      {userId ? (
        edit ? (
          userId === currentUser._id ? (
            <UserEdit userId={userId} />
          ) : (
            <Redirect to={`/users/${currentUser._id}/edit`} />
          )
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersList />
      )}
    </UserProvider>
  );
};

export default Users;
