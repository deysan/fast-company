import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentUserData } from '../../store/users';
import Preloader from './preloader';

const NavProfile = () => {
  const { pathname } = useLocation();

  const currentUser = useSelector(getCurrentUserData());

  const [isOpen, setIsOpen] = useState();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  if (!currentUser) return <Preloader />;

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
          src={currentUser.image}
          className="rounded-circle me-2"
          alt="avatar"
          width="20"
          height="20"
        />
        {currentUser.name}
      </a>
      <ul className={`dropdown-menu${isOpen ? ' show' : ''}`}>
        <li>
          <Link
            className="dropdown-item"
            to={
              pathname.includes('users')
                ? `${currentUser._id}`
                : `users/${currentUser._id}`
            }
          >
            Profile
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" to="/logout">
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavProfile;
