import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import api from '../../../api';
import PropTypes from 'prop-types';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
import CommentsList from './components/commentsList';
import CommentForm from './components/commentForm';
import { orderBy } from 'lodash';

const UserPage = ({ userId }) => {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.users.getById(userId).then((data) => setUser(data));
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const handleClick = () => {
    history.push(`${pathname}/edit`);
  };

  const handleSubmit = (data) => {
    api.comments
      .add({ ...data, pageId: userId })
      .then((newComment) => setComments([...comments, newComment]));
  };

  const handleDeleteComment = (commentId) => {
    api.comments.remove(commentId).then((commentId) => {
      setComments(comments.filter((comment) => comment._id !== commentId));
    });
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);

  if (users && user) {
    return (
      <div className="container">
        <div className="row gutters-sm mt-3">
          <div className="col-md-4">
            <UserCard user={user} handleClick={handleClick} />
            <QualitiesCard qualities={user.qualities} />
            <MeetingsCard completedMeetings={user.completedMeetings} />
          </div>

          <div className="col-md-8">
            <CommentForm users={users} onSubmit={handleSubmit} />
            {sortedComments.length > 0 && (
              <CommentsList
                comments={sortedComments}
                onDelete={handleDeleteComment}
              />
            )}
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
