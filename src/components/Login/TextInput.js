import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Form } from 'semantic-ui-react';

const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

export const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => {
  const classes = classnames(
    'input-group',
    {
      'animated shake error': !!error,
    },
    className
  );
  return (
    <Form.Field className={classes}>
      <label htmlFor={id} error={error}>
        {label}
      </label>
      <input
        id={id}
        className="text-input"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
        fluid="true"
      />
      <InputFeedback error={error} />
    </Form.Field>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  type: 'text',
  error: '',
  value: '',
  className: '',
};
