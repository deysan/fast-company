import React, { useCallback, useEffect, useState } from 'react';
import { validator } from '../../../utils/validator';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

const FormComponent = ({
  defaultData,
  children,
  validatorConfig,
  validateSchema,
  signUp,
  logIn,
  enterError,
  setEnterError,
  historyLocation
}) => {
  const dispatch = useDispatch();

  const [data, setData] = useState(defaultData || {});
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    setEnterError && setEnterError(null);
  }, []);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      validate(data);
    }
  }, [data]);

  const validate = useCallback(
    (data) => {
      if (validatorConfig) {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
      }

      if (validateSchema) {
        validateSchema
          .validate(data)
          .then(() => setErrors({}))
          .catch((error) => setErrors({ [error.path]: error.message }));
      }

      return logIn
        ? Object.keys(errors).length === 0 || enterError === null
        : Object.keys(errors).length === 0;
    },
    [validatorConfig, validateSchema, errors]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(data);
    if (!isValid || enterError) return;

    if (logIn) {
      const redirect = historyLocation || '/users';
      dispatch(logIn(data, redirect));
    }

    if (signUp) {
      const newData = {
        ...data,
        qualities: data.qualities.map((quality) => quality.value)
      };

      console.log(newData);
      dispatch(signUp(newData));
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const form = e.target.form;
      const indexField = Array.prototype.indexOf.call(form, e.target);
      form.elements[indexField + 1].focus();
    }
  }, []);

  const isValid = Object.keys(errors).length === 0;

  const clonedElements = React.Children.map(children, (child) => {
    const childType = typeof child.type;
    let config = {};

    if (childType === 'object') {
      if (!child.props.name) {
        throw new Error(
          'Name property is required for field components!',
          child
        );
      }

      config = {
        ...child.props,
        onChange: handleChange,
        value: data[child.props.name],
        error: errors[child.props.name],
        onKeyDown: handleKeyDown
      };
    }

    if (childType === 'string') {
      if (child.type === 'button') {
        if (child.props.type === 'submit' || child.props.type === undefined) {
          config = { ...child.props, disabled: !isValid || enterError };
        }
      }
    }

    return React.cloneElement(child, config);
  });

  return <form onSubmit={handleSubmit}>{clonedElements}</form>;
};

FormComponent.propTypes = {
  defaultData: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  validatorConfig: PropTypes.object,
  validateSchema: PropTypes.object,
  signUp: PropTypes.func,
  logIn: PropTypes.func,
  enterError: PropTypes.string,
  setEnterError: PropTypes.func,
  historyLocation: PropTypes.string
};

export default FormComponent;
