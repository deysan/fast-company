import React from 'react';
import User from './user';
import PropTypes from 'prop-types';

const Table = ({ users, onDelete, onBookmark, currentSort, onSort }) => {
  const handleSort = (item) => {
    if (currentSort.iter === item) {
      onSort({
        ...currentSort,
        order: currentSort.order === 'asc' ? 'desc' : 'asc'
      });
    } else {
      onSort({ iter: item, order: 'asc' });
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th onClick={() => handleSort('name')} scope="col">
            Имя
          </th>
          <th scope="col">Качества</th>
          <th onClick={() => handleSort('profession.name')} scope="col">
            Профессия
          </th>
          <th onClick={() => handleSort('completedMeetings')} scope="col">
            Встретился, раз
          </th>
          <th onClick={() => handleSort('rate')} scope="col">
            Оценка
          </th>
          <th onClick={() => handleSort('isBookmark')} scope="col">
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
  currentSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default Table;
