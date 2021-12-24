import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';
import Qualities from './qualities';

const UserPage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

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
            <Link to="/users" className="btn btn-warning" role="button">
              Все пользователи
            </Link>
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

export default UserPage;
