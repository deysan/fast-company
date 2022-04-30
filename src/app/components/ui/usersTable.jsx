import React from 'react';
import { Table } from '../common/table';
import Qualities from './qualities';
import Bookmark from '../common/bookmark';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Profession from './profession';

const UsersTable = ({ users, onBookmark, selectedSort, onSort }) => {
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
    professions: {
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />
    },
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
  onBookmark: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default UsersTable;
