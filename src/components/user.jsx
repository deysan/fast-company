import React from 'react';
import Bookmark from './bookmark';
import Qualities from './qualities';

const User = (user) => {
  const MAX_RATING = 5;

  return (
    <tr>
      <td>{user.name}</td>
      <td>
        <Qualities qualities={user.qualities} />
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>
        {user.rate} / {MAX_RATING}
      </td>
      <td>
        <Bookmark
          id={user._id}
          isBookmark={user.isBookmark}
          onBookmark={user.onBookmark}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          type="submit"
          onClick={() => user.onDelete(user._id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default User;
