import React from 'react';
import { useParams } from 'react-router-dom';
import UserEdit from '../components/page/userEdit';
import UserPage from '../components/page/userPage';
import UsersList from '../components/page/usersList/usersList';
import UserProvider from '../hooks/useUsers';

const Users = () => {
  const { userId, edit } = useParams();

  return (
    <UserProvider>
      {userId ? (
        edit ? (
          <UserEdit userId={userId} />
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
