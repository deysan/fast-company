import React, { useEffect, useState } from 'react';
import TextField from '../../components/common/form/textField';
// import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';
import * as yup from 'yup';

const LoginForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    stayOn: false
  });
  const [errors, setErrors] = useState({});

  const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required('Пароль обязателен для заполнения')
      .matches(
        /(?=.*?[A-Z])/,
        'Пароль должен содержать хотя бы одну заглавную букву'
      )
      .matches(/(?=.*?[0-9])/, 'Пароль должен содержать хотя бы одно число')
      .matches(
        /(?=.*?[#?!@$%^&*-])/,
        'Пароль должен содержать как минимум один специальный символ (#?!@$%^&*-),'
      )
      .matches(/(?=.{8,})/, 'Пароль должен состоять минимум из 8 символов'),
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('Email введен некорректно')
  });

  // const validatorConfig = {
  //   email: {
  //     isRequired: {
  //       message: 'Электронная почта обязательна для заполнения'
  //     },
  //     isEmail: {
  //       message: 'Email введен некорректно'
  //     }
  //   },
  //   password: {
  //     isRequired: {
  //       message: 'Пароль обязателен для заполнения'
  //     },
  //     isCapitalSymbol: {
  //       message: 'Пароль должен содержать хотя бы одну заглавную букву'
  //     },
  //     isContainDigit: {
  //       message: 'Пароль должен содержать хотя бы одно число'
  //     },
  //     minLengthPassword: {
  //       message: 'Пароль должен состоять минимум из 8 символов',
  //       value: 8
  //     }
  //   }
  // };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    // const errors = validator(data, validatorConfig);
    // setErrors(errors);
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    return Object.keys(errors).length === 0;
  };

  const handleChange = (target) => {
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
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>
      <button
        type="submit"
        className="btn btn-primary  mb-2"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
