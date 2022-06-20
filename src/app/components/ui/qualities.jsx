import React, { useEffect } from 'react';
import Preloader from './preloader';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from '../../store/qualities';

const Qualities = ({ qualities }) => {
  const dispatch = useDispatch();
  const qualitiesList = useSelector(getQualitiesByIds(qualities));
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

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
