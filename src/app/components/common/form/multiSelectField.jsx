import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ name, options, onChange }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;

  return (
    <Select
      isMulti
      className="basic-multi-select mb-4"
      classNamePrefix="select"
      name={name}
      options={optionsArray}
      onChange={onChange}
    />
  );
};

MultiSelectField.propTypes = {
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func
};

export default MultiSelectField;
