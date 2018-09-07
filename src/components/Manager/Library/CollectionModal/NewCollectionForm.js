import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { Form, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import albumsQuery from '../albumsQuery';
import { TextInput } from '../../../Login/TextInput';

const enhance = withFormik({
  mapPropsToValues: () => ({
    name: '',
  }),
  validationSchema: yup.object().shape({
    name: yup.string().required('Collection name is required.'),
  }),
  handleSubmit: async (values, { props, setSubmitting }) => {
    const { mutate, cancelHandler } = props;
    const response = await mutate({
      variables: { album: { name: values.name.trim() } },
      refetchQueries: [{ query: albumsQuery }],
    });
    const success = response.data.addAlbum;
    if (success) {
      cancelHandler();
    } else {
      console.log('Error adding collection');
      setSubmitting(false);
    }
  },
  displayName: 'Sign in',
});

// The form component
const NewCollectionForm = props => {
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    cancelHandler,
  } = props;

  return (
    <Form>
      <TextInput
        id="name"
        type="text"
        label="Name"
        error={touched.name && errors.name}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button
        color="red"
        type="submit"
        onClick={handleSubmit}
        disabled={!dirty || isSubmitting}
      >
        Create
      </Button>
      <Button secondary onClick={cancelHandler}>
        Cancel
      </Button>
    </Form>
  );
};

NewCollectionForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
};

// GQL Mutation
const addAlbumMutation = gql`
  mutation addAlbum($album: AlbumInput!) {
    addAlbum(album: $album)
  }
`;

export default graphql(addAlbumMutation)(enhance(NewCollectionForm));