import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import api from '../../../api';
import Qualities from '../../ui/qualities';
import PropTypes from 'prop-types';

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
            <div className="card mb-3">
              <div className="card-body">
                <button
                  className="position-absolute top-0 end-0 btn btn-light btn-sm"
                  onClick={handleClick}
                >
                  <i className="bi bi-gear"></i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                  <img
                    src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{user.name}</h4>
                    <p className="text-secondary mb-1">
                      {user.profession.name}
                    </p>
                    <div className="text-muted">
                      <i
                        className="bi bi-caret-down-fill text-primary"
                        role="button"
                      ></i>
                      <i
                        className="bi bi-caret-up text-secondary"
                        role="button"
                      ></i>
                      <span className="ms-2">{user.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Qualities</span>
                </h5>
                <p className="card-text">
                  <Qualities qualities={user.qualities} />
                </p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                  <span>Completed meetings</span>
                </h5>
                <h1 className="display-1">{user.completedMeetings}</h1>
              </div>
            </div>
          </div>
        </div>

        <Link className="btn btn-secondary mb-3" type="button" to="/users">
          Все пользователи
        </Link>
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
