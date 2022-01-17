import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import api from '../../../api';
import PropTypes from 'prop-types';
import TextField from '../../common/form/textField';
import * as yup from 'yup';
import SelectField from '../../common/form/selectField';
import RadioField from '../../common/form/radioField';
import MultiSelectField from '../../common/form/multiSelectField';

const UserEdit = ({ userId }) => {
  const [user, setUser] = useState();
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();
  const [qualities, setQualities] = useState();
  // const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
    api.professions.fetchAll().then((data) => setProfessions(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const validateSchema = yup.object().shape({
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('Email введен некорректно')
  });

  const validate = () => {
    validateSchema
      .validate(user)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    return Object.keys(errors).length === 0;
  };

  // const handleClick = () => {
  //   history.replace(`/users/${userId}`);
  // };

  const handleChange = (target) => {
    if (target.name === 'profession') {
      const professionName = professions.find((profession) =>
        Object.values(profession).includes(target.value)
      ).name;

      setUser((prevState) => ({
        ...prevState,
        [target.name]: { _id: target.value, name: professionName }
      }));
    } else if (target.name === 'qualities') {
      const { value } = target;
      const qualitieValue = Object.values(value).map(
        (qualitie) => qualitie.value
      );
      const qualitieObject = Object.values(qualities).filter((qualitie) =>
        qualitieValue.includes(qualitie._id)
      );

      setUser((prevState) => ({ ...prevState, [target.name]: qualitieObject }));
    } else {
      setUser((prevState) => ({ ...prevState, [target.name]: target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    console.log(user);
  };

  if (user) {
    return (
      <div className="container">
        <div className="card w-50 mt-3">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <TextField
                label="Электронная почта"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label="Выбери свою профессию"
                name="profession"
                value={user.profession._id}
                options={professions}
                defaultOption="Choose..."
                onChange={handleChange}
                error={errors.profession}
              />
              <RadioField
                label="Выберите ваш пол"
                name="sex"
                value={user.sex}
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                onChange={handleChange}
              />
              <MultiSelectField
                label="Выберите ваши качества"
                name="qualities"
                options={qualities}
                onChange={handleChange}
                defaultValue={{ ...user.qualities }}
              />
              <button
                className="btn btn-success"
                type="submin"
                // onClick={handleClick}
              >
                Сохранить изминения
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1 className="loader-text"></h1>
      </div>
    );
  }
};

UserEdit.propTypes = {
  userId: PropTypes.string
};

export default UserEdit;
