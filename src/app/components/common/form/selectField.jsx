import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  label,
  name,
  value,
  options,
  defaultOption,
  onChange,
  error
}) => {
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option value="" disabled>
          {defaultOption}
        </option>
        {options &&
          options.map((option) => (
            <option value={option._id} key={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  defaultOption: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default SelectField;
