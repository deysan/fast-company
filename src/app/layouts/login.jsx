import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = {};
    for (const fieldName in data) {
      if (data[fieldName].trim() === '') {
        errors[fieldName] = `Please enter your ${fieldName}`;
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
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
