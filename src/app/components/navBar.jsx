import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const { pathname } = useLocation();

  const getClasses = (path) =>
    pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <div className="container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className={getClasses('/')} to="/">
            Main
          </Link>
        </li>
        <li className="nav-item">
          <Link className={getClasses('/login')} to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className={getClasses('/users')} to="/users">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
