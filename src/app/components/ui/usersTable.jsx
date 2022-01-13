import React from 'react';
import Table from '../common/table';
import Qualities from './qualities/qualities';
import Bookmark from '../common/bookmark';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UsersTable = ({ users, onDelete, onBookmark, selectedSort, onSort }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`users/${user._id}`}>{user.name}</Link>
    },
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
    />
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
