import React from 'react';
import { useParams } from 'react-router-dom';
import UserEdit from '../components/page/userEdit';
import UserPage from '../components/page/userPage';
import UsersList from '../components/page/usersList/usersList';

const Users = () => {
  const { userId, edit } = useParams();

  if (userId && edit) {
    return <UserEdit userId={userId} />;
  } else if (userId) {
    return <UserPage userId={userId} />;
  } else {
    return <UsersList />;
  }
};

export default Users;
