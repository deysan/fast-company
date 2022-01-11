import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';
import { validator } from '../utils/validator';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Please enter a valid email!'
      }
    },
    password: {
      isRequired: {
        message: 'Please enter a valid password!'
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <div className="container">
      <h1>Login & Password</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label={'Email address'}
          type={'email'}
          name={'email'}
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label={'Password'}
          type={'password'}
          name={'password'}
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
