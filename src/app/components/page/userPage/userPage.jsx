import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../api';
import Qualities from '../../ui/qualities';
import PropTypes from 'prop-types';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleClick = () => {
    history.push('/users');
  };

  if (user) {
    return (
      <div className="container">
        <div className="card w-50 mt-3">
          <div className="card-body">
            <h1 className="card-title">{user.name}</h1>
            <h3 className="card-subtitle mb-2 text-muted">
              Профессия: {user.profession.name}
            </h3>
            <p className="card-text">
              <Qualities qualities={user.qualities} />
            </p>
            <p className="card-text">
              Встретился{' '}
              <span className="fw-bold">{user.completedMeetings}</span> раз
            </p>
            <h5 className="card-subtitle mb-2 fw-normal">
              Оценка: <span className="fw-bold">{user.rate}</span>
            </h5>
            <button
              className="btn btn-warning"
              type="button"
              onClick={handleClick}
            >
              Все пользователи
            </button>
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