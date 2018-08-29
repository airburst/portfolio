// https://github.com/benawad/slack-clone-client/blob/cookies/src/routes/Login.js
import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { TextInput } from './TextInput';
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
  handleSubmit: (values, { props, setSubmitting }) => {
    const { username, password } = trimFields(values);
    const { mutate } = props;
    mutate({
      variables: { username, password },
      // refetchQueries: [
      //   {
      //     query: allPhotosQuery,
      //   },
      // ],
    })
      .then(response => console.log(response))
      .catch(err => console.log('Error', err.message));

    setSubmitting(false);
  },
  displayName: 'Sign in',
});

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
