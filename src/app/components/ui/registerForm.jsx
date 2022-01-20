import React, { useEffect, useState } from 'react';
import FormComponent, {
  TextField,
  CheckBoxField,
  RadioField,
  SelectField,
  MultiSelectField
} from '../common/form';
import api from '../../api';

const RegisterForm = () => {
  const [data] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  });
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

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
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите профессию'
      }
    },
    license: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без использования лицензионного соглашения'
      }
    }
  };

  return (
    <FormComponent defaultData={data} validatorConfig={validatorConfig}>
      <TextField
        label="Электронная почта"
        type="email"
        name="email"
        autoFocus
      />
      <TextField label="Пароль" type="password" name="password" />
      <SelectField
        label="Выберите вашу профессию"
        name="profession"
        options={professions}
        defaultOption="Choose..."
      />
      <RadioField
        label="Выберите ваш пол"
        name="sex"
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
      />
      <MultiSelectField
        label="Выберите ваши качества"
        name="qualities"
        options={qualities}
        defaultValue={data.qualities}
      />
      <CheckBoxField name="license">
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button type="submit" className="btn btn-primary mb-2">
        Submit
      </button>
    </FormComponent>
  );
};

export default RegisterForm;
