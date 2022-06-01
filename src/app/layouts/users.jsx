import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import UserEdit from '../components/page/userEdit';
import UserPage from '../components/page/userPage';
import UsersList from '../components/page/usersList/usersList';
import { useAuth } from '../hooks/useAuth';
import UserProvider from '../hooks/useUsers';

const Users = () => {
  const { userId, edit } = useParams();
  const { currentUser } = useAuth();

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
