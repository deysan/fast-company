import React from 'react';

const Preloader = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  );
};

export default Preloader;
