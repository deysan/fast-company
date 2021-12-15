import React, { useState, useEffect } from 'react';
import User from './user';
import api from '../api';
import Status from './status';
import Pagination from './pagination';
import paginate from '../utils/paginate';
import Filter from './filter';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedFilter, setSelectedFilter] = useState();

  const pageSize = 4;
  const filteredUsers = selectedFilter
    ? users.filter((user) => user.profession === selectedFilter)
    : users;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);
  const count = filteredUsers.length;

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

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedFilter(item);
  };

  const clearFilter = () => {
    setSelectedFilter();
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  return (
    <>
      <Status number={count} />
      {professions && (
        <>
          <Filter
            items={professions}
            selectedItem={selectedFilter}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Сброс
          </button>
        </>
      )}
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
