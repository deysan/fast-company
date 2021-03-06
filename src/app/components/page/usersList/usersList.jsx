import React, { useState, useEffect } from 'react';
// import api from '../../../api';
import paginate from '../../../utils/paginate';
import Status from '../../ui/status';
import Pagination from '../../common/pagination';
import Filter from '../../common/filter';
import Preloader from '../../ui/preloader';
import UsersTable from '../../ui/usersTable';
import Search from '../../common/search';
import _ from 'lodash';
// import { useAuth } from '../../../hooks/useAuth';
import { useSelector } from 'react-redux';
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions';
import { getCurrentUserId, getUsersList } from '../../../store/users';

const UsersList = () => {
  // const [users, setUsers] = useState();
  // const { currentUser } = useAuth();
  const currentUserId = useSelector(getCurrentUserId());
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState();
  const [sortBy, setSortBy] = useState({
    path: 'name',
    order: 'asc',
    icon: 'up'
  });
  const [searchValue, setSearchValue] = useState('');

  const users = useSelector(getUsersList());

  const pageSize = 4;

  // useEffect(() => {
  //   api.users.fetchAll().then((data) => setUsers(data));
  // }, []);

  const handleBookmark = (userId) => {
    const bookmarkUsers = [...users];

    bookmarkUsers.map((user) =>
      user._id === userId
        ? user.isBookmark === true
          ? (user.isBookmark = false)
          : (user.isBookmark = true)
        : user.isBookmark
    );

    // setUsers(bookmarkUsers);
    console.log(bookmarkUsers);
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

  if (users && professions && !professionsLoading) {
    function filterUsers(data) {
      const filteredUsers = selectedFilter
        ? data.filter(
            (user) =>
              JSON.stringify(user.profession) === JSON.stringify(selectedFilter)
          )
        : searchValue
        ? data.filter((user) =>
            user.name.toLowerCase().includes(searchValue.toLowerCase())
          )
        : data;

      return filteredUsers.filter((user) => user._id !== currentUserId);
    }

    const filteredUsers = filterUsers(users);

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

export default UsersList;
