import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import api from '../../../api';
import PropTypes from 'prop-types';
import UserCard from './components/userCard';
import QualitiesCard from './components/qualitiesCard';
import MeetingsCard from './components/meetingsCard';
import CommentsList from './components/commentsList';
import CommentsForm from './components/commentsForm';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleClick = () => {
    history.push(`${pathname}/edit`);
  };

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm mt-3">
          <div className="col-md-4">
            <UserCard user={user} handleClick={handleClick} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>

          <div className="col-md-8">
            <CommentsForm />
            <CommentsList />
          </div>
        </div>

        <div className="d-flex flex-row-reverse">
          <Link className="btn btn-secondary mb-3" type="button" to="/users">
            Все пользователи
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1 className="loader-text"></h1>
      </div>
    );
  }
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
