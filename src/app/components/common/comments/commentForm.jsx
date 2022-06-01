import React, { useState } from 'react';
import { validator } from '../../../utils/validator';
import PropTypes from 'prop-types';
import TextAreaField from '../form/textAreaField';

const CommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
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
    setData({});
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
            <TextAreaField
              label="Сообщение"
              name="content"
              value={data.content || ''}
              onChange={handleChange}
              error={errors.content}
            />
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
  onSubmit: PropTypes.func
};

export default CommentForm;
