import React, { useState } from 'react';
import User from './user';
import api from '../api';
import Status from './status';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const renderTable = () => {
    return (
      users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (user) => (
                // eslint-disable-next-line no-sequences
                !user.isBookmark ? (user.isBookmark = false) : user.isBookmark,
                (
                  <User
                    key={user._id}
                    {...user}
                    onDelete={handleDelete}
                    onBookmark={handleBookmark}
                  />
                )
              )
            )}
          </tbody>
        </table>
      )
    );
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const handleBookmark = (userId) => {
    const bookmarkUsers = [...users];

    bookmarkUsers.map((user) =>
      user._id === userId
        ? user.isBookmark === true
          ? (user.isBookmark = false)
          : (user.isBookmark = true)
        : user.isBookmark
    );

    setUsers(bookmarkUsers);
  };

  return (
    <>
      <Status number={users.length} />
      {renderTable()}
    </>
  );
};

export default Users;
