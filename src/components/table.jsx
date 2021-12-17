import React from 'react';
import User from './user';
import PropTypes from 'prop-types';

const Table = ({ users, handleDelete, handleBookmark }) => {
  return (
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
        {users.map((user) => (
          <User
            key={user._id}
            {...user}
            onDelete={handleDelete}
            onBookmark={handleBookmark}
          />
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  users: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleBookmark: PropTypes.func.isRequired
};

export default Table;
