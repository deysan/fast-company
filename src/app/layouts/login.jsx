import React, { useState } from 'react';
import TextField from '../components/textField';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  return (
    <div className="container">
      <h1>Login & Password</h1>
      <form>
        <div className="mb-3">
          <TextField
            label={'Email address'}
            type={'email'}
            name={'email'}
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <TextField
            label={'Password'}
            type={'password'}
            name={'password'}
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
