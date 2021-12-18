/* eslint-disable */
import React, { useState, useEffect } from 'react';
import api from '../api';
import Status from './status';
import Pagination from './pagination';
import paginate from '../utils/paginate';
import Filter from './filter';
import Preloader from './preloader';
import Table from './table';
import _ from 'lodash';

const Users = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState();
  const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });

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

  const count = () => {
    return filteredUsers().length;
  };

  const sortedUsers = () => {
    return _.orderBy(filteredUsers(), [sortBy.iter], [sortBy.order]);
  };

  const userCrop = () => {
    return paginate(sortedUsers(), currentPage, pageSize);
  };

  const renderTable = () => {
    return (
      count() !== 0 && (
        <Table
          users={userCrop()}
          onDelete={handleDelete}
          onBookmark={handleBookmark}
          selectedSort={sortBy}
          onSort={handleSort}
        />
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

  const handleSort = (item) => {
    setSortBy(item);
    sortedUsers();
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
        <Preloader />
      )}
    </>
  );
};

export default Users;
