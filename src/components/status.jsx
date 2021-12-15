import React from 'react';
import PropTypes from 'prop-types';

const Status = (length) => {
  const { number } = length;

  const titles = ['человек тусанет', 'человека тусанут'];

  const declOfNum = (number) => {
    const cases = [0, 0, 1, 1, 1, 0];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 0
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  let phrase = '';
  let classes = 'badge rounded-pill m-2 py-2 px-3 fs-6 bg-';

  if (number > 0) {
    classes += 'primary';
    phrase = `${number} ${declOfNum(number)} с тобой сегодня`;
  } else {
    classes += 'danger';
    phrase = 'Никто с тобой не тусанет :(';
  }
  return <span className={classes}>{phrase}</span>;
};

Status.propTypes = {
  number: PropTypes.number.isRequired
};

export default Status;
