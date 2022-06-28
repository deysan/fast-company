import { Link, useHistory, useLocation } from 'react-router-dom';
import React from 'react';
import UserCard from '../../ui/userCard';
import MeetingsCard from '../../ui/meetingsCard';
import QualitiesCard from '../../ui/qualitiesCard';
import Comments from '../../ui/comments';
import PropTypes from 'prop-types';
// import { useUser } from '../../../hooks/useUsers';
import { CommentsProvider } from '../../../hooks/useComments';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../store/users';

const UserPage = ({ userId }) => {
  const history = useHistory();
  // const { getUserById } = useUser();
  const { pathname } = useLocation();

  const user = useSelector(getUserById(userId));

  // const user = getUserById(userId);

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
            <Link className="btn btn-secondary mb-3" type="button" to="/users">
              Все пользователи
            </Link>
          </div>

          <div className="col-md-8">
            <CommentsProvider>
              <Comments />
            </CommentsProvider>
          </div>
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
