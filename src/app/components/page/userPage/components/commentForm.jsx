import React, { useState } from 'react';
import SelectField from '../../../common/form/selectField';
import { validator } from '../../../../utils/validator';
import PropTypes from 'prop-types';
import TextAreaField from '../../../common/form/textAreaField';

const initialData = { userId: '', content: '' };

const CommentForm = ({ users, onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Выберите от чьего имени вы хотите отправить сообщение'
      }
    },
    content: {
      isRequired: {
        message: 'Сообщение не может быть пустым'
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData(initialData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <SelectField
                name="userId"
                value={data.userId}
                options={users}
                defaultOption="Выберите пользователя"
                onChange={handleChange}
                error={errors.userId}
              />
            </div>
            <div className="mb-3">
              <TextAreaField
                label="Сообщение"
                name="content"
                value={data.content}
                onChange={handleChange}
                error={errors.content}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary">Опубликовать</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  users: PropTypes.array,
  onSubmit: PropTypes.func
};

export default CommentForm;
