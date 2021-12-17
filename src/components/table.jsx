import React from 'react';
import User from './user';
import PropTypes from 'prop-types';

const Table = ({ users, onDelete, onBookmark, onSort }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => onSort('name')} scope="col">
            Имя
          </th>
          <th scope="col">Качества</th>
          <th onClick={() => onSort('profession.name')} scope="col">
            Профессия
          </th>
          <th onClick={() => onSort('completedMeetings')} scope="col">
            Встретился, раз
          </th>
          <th onClick={() => onSort('rate')} scope="col">
            Оценка
          </th>
          <th onClick={() => onSort('isBookmark')} scope="col">
            Избранное
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User
            key={user._id}
            {...user}
            onDelete={onDelete}
            onBookmark={onBookmark}
          />
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired
};

export default Table;
