import React from 'react';
import { useProfessions } from '../../hooks/useProfession';
import Preloader from './preloader';
import PropTypes from 'prop-types';

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const prof = getProfession(id);

  if (!isLoading) {
    return <p>{prof.name}</p>;
  } else return <Preloader />;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
