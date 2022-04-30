import { Link, useHistory, useLocation } from 'react-router-dom';
import React from 'react';
// import api from '../../../api';
import UserCard from '../../ui/userCard';
import MeetingsCard from '../../ui/meetingsCard';
import QualitiesCard from '../../ui/qualitiesCard';
import Comments from '../../ui/comments';
import PropTypes from 'prop-types';
import { useUser } from '../../../hooks/useUsers';

const UserPage = ({ userId }) => {
  const history = useHistory();
  const { getUserById } = useUser();
  // const [user, setUser] = useState();
  const { pathname } = useLocation();

  const user = getUserById(userId);

  // useEffect(() => {
  //   api.users.getById(userId).then((data) => setUser(data));
  // }, []);

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
            <Comments />
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
