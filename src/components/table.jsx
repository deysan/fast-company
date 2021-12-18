import React from 'react';
import User from './user';
import TableHeader from './tableHeader';
import PropTypes from 'prop-types';

const Table = ({ users, onDelete, onBookmark, selectedSort, onSort }) => {
  const columns = {
    name: { iter: 'name', name: 'Имя' },
    qualities: { name: 'Качества' },
    professions: { iter: 'profession.name', name: 'Профессия' },
    completedMeetings: { iter: 'completedMeetings', name: 'Встретился, раз' },
    rate: { iter: 'rate', name: 'Оценка' },
    isBookmark: { name: 'Избранное' },
    delete: {}
  };

  return (
    <table className="table">
      <TableHeader
        selectedSort={selectedSort}
        onSort={onSort}
        columns={columns}
      />
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
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default Table;
