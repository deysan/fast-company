import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const MultiSelectField = ({ label, name, options, onChange }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        className="basic-multi-select"
        classNamePrefix="select"
        name={name}
        options={optionsArray}
        onChange={handleChange}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func
};

export default MultiSelectField;
