import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextInput } from './TextInput';
import 'semantic-ui-css/semantic.min.css';
import './Login.css';

const trimFields = values => {
  const newValues = Object.assign({}, values);
  newValues.username = values.username.trim();
  newValues.password = values.password.trim();
  return newValues;
};

const enhance = withFormik({
  mapPropsToValues: () => ({
    username: '',
    password: '',
  }),
  validationSchema: yup.object().shape({
    username: yup.string().required('User name is required.'),
    password: yup.string().required('Password is required.'),
  }),
  handleSubmit: async (values, { props, setSubmitting }) => {
    const { username, password } = trimFields(values);
    const { mutate } = props;
    const response = await mutate({
      variables: { username, password },
    });
    const { success, token, refreshToken, errors } = response.data.login;
    if (success) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      props.history.push('/manager');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      console.log('ERRORS:', err);
      setSubmitting(false);
    }
  },
  displayName: 'Sign in',
});

// The form component
const LoginForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = props;

  return (
    <div className="form-container">
      <div className="login-form">
        <Form>
          <TextInput
            id="username"
            type="text"
            label="Username or Email"
            error={touched.username && errors.username}
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <TextInput
            id="password"
            type="password"
            label="Password"
            error={touched.password && errors.password}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            positive
            type="submit"
            onClick={handleSubmit}
            disabled={!dirty || isSubmitting}
          >
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

// GQL Mutation
const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(enhance(LoginForm));
