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
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      minLengthPassword: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
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

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h1 className="mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              label={'Электронная почта'}
              type={'email'}
              name={'email'}
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label={'Пароль'}
              type={'password'}
              name={'password'}
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isValid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
