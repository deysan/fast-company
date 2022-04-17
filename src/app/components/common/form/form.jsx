import React, { useCallback, useEffect, useState } from 'react';
import { validator } from '../../../utils/validator';
import PropTypes from 'prop-types';

const FormComponent = ({
  defaultData,
  children,
  validatorConfig,
  validateSchema
}) => {
  const [data, setData] = useState(defaultData || {});
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
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

      return Object.keys(errors).length === 0;
    },
    [validatorConfig, validateSchema, errors]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(data);
    if (!isValid) return;
    const newDate = {
      ...data,
      qualities: data.qualities.map((quality) => quality.value)
    };
    console.log(newDate);
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
          config = { ...child.props, disabled: !isValid };
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
  validateSchema: PropTypes.object
};

export default FormComponent;
