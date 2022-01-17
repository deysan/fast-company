import React, { useState, useEffect } from 'react';
import api from '../api';
import paginate from '../utils/paginate';
import Status from '../components/status';
import Pagination from '../components/pagination';
import Filter from '../components/filter';
import Preloader from '../components/preloader';
import UsersTable from '../components/usersTable';
import Search from '../components/search';
import _ from 'lodash';

const Users = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState();
  const [sortBy, setSortBy] = useState({
    path: 'name',
    order: 'asc',
    icon: 'up'
  });
  const [searchValue, setSearchValue] = useState('');

  const pageSize = 4;

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

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
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSearchValue('');
    setSelectedFilter(item);
  };

  const handleSearchValue = (value) => {
    setSelectedFilter();
    setSearchValue(value);
  };

  const clearFilter = () => {
    setSelectedFilter();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, searchValue]);

  if (users && professions) {
    const filteredUsers = selectedFilter
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedFilter)
        )
      : searchValue
      ? users.filter((user) => user.name.toLowerCase().includes(searchValue))
      : users;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 pt-2">
            <Status number={count} />
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
            <Search
              users={userCrop}
              searchValue={searchValue}
              setSearchValue={handleSearchValue}
            />
            {count !== 0 && (
              <>
                <UsersTable
                  users={userCrop}
                  onDelete={handleDelete}
                  onBookmark={handleBookmark}
                  selectedSort={sortBy}
                  onSort={handleSort}
                />
                <div className="row justify-content-center">
                  <div className="col-auto">
                    <Pagination
                      itemsCount={count}
                      pageSize={pageSize}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Preloader />;
  }
};

export default Users;
