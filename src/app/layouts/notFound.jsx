import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  const handleMain = () => {
    history.replace('/');
  };

  return (
    <div className="container">
      <h1>Page Not Found</h1>
      <button
        onClick={() => handleMain()}
        type="button"
        className="btn btn-outline-dark"
      >
        Вернуться на главную
      </button>
    </div>
  );
};

export default NotFound;
