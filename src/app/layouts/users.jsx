import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import UserEdit from '../components/page/userEdit';
import UserPage from '../components/page/userPage';
import UsersList from '../components/page/usersList/usersList';
import UsersLoader from '../components/ui/hoc/usersLoader';
// import { useAuth } from '../hooks/useAuth';
import UserProvider from '../hooks/useUsers';
import { getCurrentUserId } from '../store/users';

const Users = () => {
  const { userId, edit } = useParams();
  // const { currentUser } = useAuth();
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <UsersLoader>
      <UserProvider>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <UserEdit userId={userId} />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersList />
        )}
      </UserProvider>
    </UsersLoader>
  );
};

export default Users;
