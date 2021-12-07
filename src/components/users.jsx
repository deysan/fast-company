import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const MAX_RATING = 5;

  const renderPhrase = (number) => {
    const titles = ['человек тусанет', 'человека тусанут'];

    const declOfNum = (number) => {
      return titles[
        number % 10 === 1 && number % 100 !== 11
          ? 0
          : number % 10 >= 2 &&
            number % 10 <= 4 &&
            (number % 100 < 10 || number % 100 >= 20)
          ? 1
          : 0
      ];
    };

    let phrase = '';
    let classes = 'badge rounded-pill m-2 py-2 px-3 fs-6 bg-';

    if (number > 0) {
      classes += 'primary';
      phrase = `${number} ${declOfNum(number)} с тобой сегодня`;
    } else {
      classes += 'danger';
      phrase = 'Никто с тобой не тусанет :(';
    }

    return <span className={classes}>{phrase}</span>;
  };

  const renderTable = () => {
    return (
      users.length !== 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{renderUser()}</tbody>
        </table>
      )
    );
  };

  const renderUser = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{renderQualitie(user.qualities)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>
          {user.rate} / {MAX_RATING}
        </td>
        <td>
          <button
            className="btn btn-danger"
            type="submit"
            onClick={() => handleDelete(user._id)}
          >
            Удалить
          </button>
        </td>
      </tr>
    ));
  };

  const renderQualitie = (qualities) => {
    return qualities.map((qualitie) => (
      <span key={qualitie._id} className={`badge me-1 bg-${qualitie.color}`}>
        {qualitie.name}
      </span>
    ));
  };

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  return (
    <>
      {renderPhrase(users.length)}
      {renderTable()}
    </>
  );
};

export default Users;
