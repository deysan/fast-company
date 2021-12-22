import React from 'react';

const NavBar = () => {
  return (
    <div className="container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">
            Main
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/users">
            Users
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
