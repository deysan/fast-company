import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, name, value, onChange }) => {
  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </>
  );
};

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default TextField;
