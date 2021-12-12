import React from 'react';
import PropTypes from 'prop-types';

const Status = (length) => {
  const { number } = length;

  const titles = ['человек тусанет', 'человека тусанут'];

  const declOfNum = (number) => {
    return titles[
      number % 10 === 1 && number % 100 !== 11
        ? 0
        : number % 10 >= 2 &&
          number % 10 <= 4 &&
          (number % 100 < 10 || number % 100 >= 20 ? 1 : 0)
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
