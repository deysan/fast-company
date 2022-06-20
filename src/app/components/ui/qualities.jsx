import React from 'react';
import Preloader from './preloader';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus
} from '../../store/qualities';

const Qualities = ({ qualities }) => {
  const qualitiesList = useSelector(getQualitiesByIds(qualities));
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

  if (qualitiesLoading) return <Preloader />;

  return qualitiesList.map(({ _id: id, color, name }) => {
    return (
      <span key={id} className={`badge me-1 bg-${color}`}>
        {name}
      </span>
    );
  });
};

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default Qualities;
