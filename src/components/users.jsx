import React, { useState } from 'react';
import User from './user';
import api from '../api';
import Status from './status';
import Pagination from './pagination';
import paginate from '../utils/paginate';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [currentPage, setCurrentPage] = useState(1);

  const count = users.length;
  const pageSize = 4;
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  const renderTable = () => {
    return (
      count !== 0 && (
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
            {userCrop.map(
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
      <Status number={count} />
      {renderTable()}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Users;
