import React from 'react';
import SelectField from '../../../common/form/selectField';
import PropTypes from 'prop-types';

const CommentsForm = ({ users, handleChange }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <div className="mb-4">
            <SelectField
              name="userId"
              options={users}
              defaultOption="Выберите пользователя"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label forHtml="exampleFormControlTextarea1" className="form-label">
              Сообщение
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

CommentsForm.propTypes = {
  users: PropTypes.array,
  handleChange: PropTypes.func
};

export default CommentsForm;
