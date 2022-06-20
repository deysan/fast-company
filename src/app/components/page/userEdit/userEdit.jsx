import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import {
  TextField,
  RadioField,
  SelectField,
  MultiSelectField
} from '../../common/form';
import BackHistoryButton from '../../common/backButton';
import { useAuth } from '../../../hooks/useAuth';
// import { useQualities } from '../../../hooks/useQualities';
import { useProfessions } from '../../../hooks/useProfession';
import { useSelector } from 'react-redux';
import {
  getQualities,
  getQualitiesLoadingStatus
} from '../../../store/qualities';

const UserEdit = ({ userId }) => {
  const history = useHistory();
  const { currentUser, updateUserData } = useAuth();
  // const { qualities, isLoading: qualitiesLoading } = useQualities();
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const { professions, isLoading: professionLoading } = useProfessions();

  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }));

  const validateSchema = yup.object().shape({
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('Email введен некорректно')
  });

  const validate = () => {
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    await updateUserData({
      ...data,
      qualities: data.qualities.map((q) => q.value)
    });

    history.replace(`/users/${userId}`);
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const transformData = (data) => {
    const result = getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }));
    return result;
  };

  function getQualitiesListByIds(qualitiesIds) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }

  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      });
    }
  }, [professionLoading, qualitiesLoading, currentUser, data]);

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="container">
        <h1 className="loader-text"></h1>
      </div>
    );
  }

  return (
    <div className="container mt-3">
      <div className="row gutters-sm mt-3">
        <div className="col-md-2">
          <BackHistoryButton />
        </div>
        <div className="col-md-6">
          <div className="card w-100 shadow">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Имя"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
                <TextField
                  label="Электронная почта"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <SelectField
                  label="Выбери свою профессию"
                  name="profession"
                  value={data.profession._id}
                  options={professions}
                  defaultOption="Choose..."
                  onChange={handleChange}
                  error={errors.profession}
                />
                <RadioField
                  label="Выберите ваш пол"
                  name="sex"
                  value={data.sex}
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
                  options={qualitiesList}
                  onChange={handleChange}
                  defaultValue={data.qualities}
                />
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={handleSave}
                >
                  Сохранить изменения
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserEdit.propTypes = {
  userId: PropTypes.string
};

export default UserEdit;
