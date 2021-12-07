import React, { useState } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  console.log(api.users.fetchAll());

  const renderQualitie = (qualities) => {
    return qualities.map((qualitie) => qualitie.name);
  };

  const renderUser = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{renderQualitie(user.qualities)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} из 5</td>
        <td>Кнопка удалить</td>
      </tr>
    ));
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

  return (
    <>
      <span className="badge rounded-pill bg-primary m-2 py-2 px-3 fs-6">
        # человек тусанет с тобой сегодня
      </span>
      {renderTable()}
    </>
  );
};

export default Users;
