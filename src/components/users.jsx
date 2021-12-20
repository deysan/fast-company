/* eslint-disable */
import React, { useState, useEffect } from 'react';
import User from './user';
import api from '../api';
import Status from './status';
import Pagination from './pagination';
import paginate from '../utils/paginate';
import Filter from './filter';

const Users = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const pageSize = 4;
  const filteredUsers = () =>
    Object.prototype.toString.call(selectedFilter) === '[object Object]'
      ? users.filter((user) => user.profession === selectedFilter)
      : users &&
        (Object.prototype.toString.call(selectedFilter) === '[object String]'
          ? users.filter((user) => user.profession._id === selectedFilter)
          : users);
  const userCrop = function () {
    return paginate(filteredUsers(), currentPage, pageSize);
  };
  const count = function () {
    return filteredUsers().length;
  };

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
            {userCrop().map((user) => (
              <User
                key={user._id}
                {...user}
                onDelete={handleDelete}
                onBookmark={handleBookmark}
              />
            ))}
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
    setCurrentPage(1);
  }, [selectedFilter]);

  return (
    <>
      {users && professions ? (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6 pt-2">
              <Status number={count()} />
            </div>
          </div>
          <div className="row">
            <div className="col-3 p-3">
              <Filter
                items={professions}
                selectedItem={selectedFilter}
                onItemSelect={handleProfessionSelect}
                clearFilter={clearFilter}
              />
            </div>
            <div className="col-9 p-3">
              {renderTable()}
              <div className="row justify-content-center">
                <div className="col-auto">
                  <Pagination
                    itemsCount={count()}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
