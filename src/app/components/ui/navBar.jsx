import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const { pathname } = useLocation();

  const defaultClasses = {
    main: 'nav-link',
    login: 'nav-link',
    users: 'nav-link'
  };

  const [classes, setClasses] = useState(defaultClasses);

  useEffect(() => {
    setClasses(defaultClasses);
    if (pathname.includes('login')) {
      setClasses((prevState) => ({ ...prevState, login: 'nav-link active' }));
    } else if (pathname.includes('users')) {
      setClasses((prevState) => ({ ...prevState, users: 'nav-link active' }));
    } else {
      setClasses((prevState) => ({ ...prevState, main: 'nav-link active' }));
    }
  }, [pathname]);

  return (
    <div className="container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className={classes.main} to="/">
            Main
          </Link>
        </li>
        <li className="nav-item">
          <Link className={classes.login} to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className={classes.users} to="/users">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
