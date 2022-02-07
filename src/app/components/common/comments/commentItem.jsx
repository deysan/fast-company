import React, { useEffect, useState } from 'react';
import api from '../../../api';
import Preloader from '../../ui/preloader';
import { displayDate } from '../../../utils/displayDate';
import PropTypes from 'prop-types';

const CommentItem = ({
  userId,
  created_at: created,
  _id: commentId,
  content,
  onDelete
}) => {
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  if (user) {
    return (
      <div className="bg-light card-body mb-3">
        <div className="row">
          <div className="col">
            <div className="d-flex flex-start">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() + 1
                )
                  .toString(36)
                  .substring(7)}.svg`}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
              />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1">
                      {user.name}
                      <span className="small"> - {displayDate(created)}</span>
                    </p>
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center"
                      onClick={() => onDelete(commentId)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <p className="small mb-0">{content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Preloader />;
  }
};

CommentItem.propTypes = {
  userId: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  _id: PropTypes.string,
  content: PropTypes.string,
  onDelete: PropTypes.func
};

export default CommentItem;
