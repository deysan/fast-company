import React from 'react';

const CommentsForm = () => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div>
          <h2>New comment</h2>
          <div className="mb-4">
            <select className="form-select" name="userId" value="">
              <option disabled value="" selected>
                Выберите пользователя
              </option>
              <option>Доктор</option>
              <option>Тусер</option>
            </select>
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

export default CommentsForm;
