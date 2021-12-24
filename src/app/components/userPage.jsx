import React from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { userId } = useParams();

  return (
    <div className="container">
      <h1>UserPage - {userId}</h1>
    </div>
  );
};

export default UserPage;
