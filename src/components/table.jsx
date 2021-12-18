import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import Qualities from './qualities';
import Bookmark from './bookmark';
import PropTypes from 'prop-types';

const Table = ({ users, onDelete, onBookmark, selectedSort, onSort }) => {
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
    <table className="table">
      <TableHeader
        selectedSort={selectedSort}
        onSort={onSort}
        columns={columns}
      />
      <TableBody data={users} columns={columns} />
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
