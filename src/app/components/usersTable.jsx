import React from 'react';
import Table from './table';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import Qualities from './qualities';
import Bookmark from './bookmark';
import PropTypes from 'prop-types';

const UsersTable = ({ users, onDelete, onBookmark, selectedSort, onSort }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    isBookmark: {
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          id={user._id}
          isBookmark={user.isBookmark}
          onBookmark={onBookmark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger"
          type="submit"
          onClick={() => onDelete(user._id)}
        >
          Удалить
        </button>
      )
    }
  };

  return (
    <Table
      data={users}
      columns={columns}
      selectedSort={selectedSort}
      onSort={onSort}
    >
      <TableHeader
        columns={columns}
        selectedSort={selectedSort}
        onSort={onSort}
      />
      <TableBody data={users} columns={columns} />
    </Table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UsersTable;
