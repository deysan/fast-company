import React, { useState } from 'react';
import FormComponent, { TextField, CheckBoxField } from '../common/form';
import * as yup from 'yup';

const LoginForm = () => {
  const [data] = useState({
    email: '',
    password: '',
    stayOn: false
  });

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

  return (
    <FormComponent defaultData={data} validateSchema={validateSchema}>
      <TextField label="Электронная почта" type="email" name="email" />
      <TextField label="Пароль" type="password" name="password" />
      <CheckBoxField name="stayOn">Оставаться в системе</CheckBoxField>
      <button type="submit" className="btn btn-primary mb-2">
        Submit
      </button>
    </FormComponent>
  );
};

export default LoginForm;
