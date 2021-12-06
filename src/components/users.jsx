import React from 'react';
import api from '../api';

const Users = () => {
  console.log(api.users.fetchAll());
  return (
    <>
      <span class="badge rounded-pill bg-primary m-2 py-2 px-3 fs-6">
        # человек тусанет с тобой сегодня
      </span>
      <table class="table">
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
        <tbody>
          <tr>
            <td>Полное имя</td>
            <td>Массив качеств</td>
            <td>Название профессии</td>
            <td>Число</td>
            <td>Оценка из 5</td>
            <td>Кнопка удалить</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Users;
