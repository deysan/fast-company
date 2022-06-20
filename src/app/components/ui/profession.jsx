import React from 'react';
import Preloader from './preloader';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  getProfessionById,
  getProfessionsLoadingStatus
} from '../../store/professions';

const Profession = ({ id }) => {
  const prof = useSelector(getProfessionById(id));
  const isLoading = useSelector(getProfessionsLoadingStatus());

  if (!isLoading) {
    return <p>{prof.name}</p>;
  } else return <Preloader />;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
