import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  label,
  value,
  option,
  defaultOption,
  onChange,
  error
}) => {
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        name="profession"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          {defaultOption}
        </option>
        {option &&
          option.map((profession) => (
            <option value={profession._id} key={profession._id}>
              {profession.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  option: PropTypes.array,
  defaultOption: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default SelectField;
