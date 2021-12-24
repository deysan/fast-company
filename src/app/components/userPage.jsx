import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Preloader from './preloader';

const UserPage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
    console.log(user);
  }, []);

  console.log(api.users.getById(userId));

  if (user) {
    return (
      <div className="container">
        <h1>UserPage - {user.name}</h1>
      </div>
    );
  } else if (user === undefined) {
    return <Preloader />;
  }
};

export default UserPage;
