import React from 'react';
import { useQualities } from '../../hooks/useQualities';
import Preloader from './preloader';
import PropTypes from 'prop-types';

const Qualities = ({ qualities }) => {
  const { isLoading, getQuality } = useQualities();

  if (isLoading) return <Preloader />;

  return qualities.map((quality) => {
    const { color, name } = getQuality(quality);

    return (
      <span key={quality} className={`badge me-1 bg-${color}`}>
        {name}
      </span>
    );
  });
};

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default Qualities;
