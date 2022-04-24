import React from 'react';
import { useQualities } from '../../hooks/useQualities';
import Preloader from './preloader';
import PropTypes from 'prop-types';

const Qualities = ({ qualities }) => {
  const { isLoading, getQuality } = useQualities();

  if (isLoading) return <Preloader />;

  return qualities
    ? qualities.map((qualitie) => {
        const quality = getQuality(qualitie.value);

        return (
          quality && (
            <span
              key={quality._id}
              className={`badge me-1 bg-${quality.color}`}
            >
              {quality.name}
            </span>
          )
        );
      })
    : null;
};

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default Qualities;
