import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavProfile = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="nav-item dropdown" onClick={toggleMenu}>
      <a
        className="nav-link dropdown-toggle"
        data-bs-toggle="dropdown"
        href="#"
        role="button"
        aria-expanded="false"
      >
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`}
          className="rounded-circle me-2"
          alt="avatar"
          width="20"
          height="20"
        />
        {currentUser.name}
      </a>
      <ul className={`dropdown-menu${isOpen ? ' show' : ''}`}>
        <li>
          <Link className="dropdown-item" to={`users/${currentUser._id}`}>
            Profile
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" to="#">
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

NavProfile.propTypes = {
  currentUser: PropTypes.object
};

export default NavProfile;
