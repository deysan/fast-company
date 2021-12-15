import React from 'react';
import PropTypes from 'prop-types';

const Qualities = (props) => {
  const { qualities } = props;

  return qualities.map((qualitie) => (
    <span key={qualitie._id} className={`badge me-1 bg-${qualitie.color}`}>
      {qualitie.name}
    </span>
  ));
};

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default Qualities;
