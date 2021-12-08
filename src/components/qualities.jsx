import React from 'react';

const Qualities = (props) => {
  const { qualities } = props;

  return qualities.map((qualitie) => (
    <span key={qualitie._id} className={`badge me-1 bg-${qualitie.color}`}>
      {qualitie.name}
    </span>
  ));
};

export default Qualities;
