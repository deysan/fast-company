import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const { pathname } = useLocation();

  const getClasses = (path) => {
    const classes = 'nav-link';
    const classesActive = `${classes} active`;

    if (pathname.length > 1 && pathname.slice(-1) === '/') {
      return pathname.slice(0, -1) === path ? classesActive : classes;
    }

    return pathname === path ? classesActive : classes;
  };

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
