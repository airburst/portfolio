import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Checkbox } from 'semantic-ui-react';
import './Inspector.css';

const removeNulls = (photo = {}) => {
  const cleaned = {};
  Object.entries(photo).forEach(([key, value]) => {
    if (key !== 'isPublic') {
      cleaned[key] = value || '';
    }
  });
  return cleaned;
};

const getInspectorPhoto = urls => {
  if (!urls) {
    return null;
  }
  return urls[5] ? urls[5] : urls[6];
};

class Inspector extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    selected: PropTypes.object,
  };

  static defaultProps = {
    selected: null,
  };

  state = {
    id: null,
    name: '',
    title: '',
    caption: '',
    urls: null,
    width: '',
    height: '',
    isPublic: false,
    dateTaken: '',
    // exposure
    // shutter
    // focalLength
    // iso
  };

  componentWillReceiveProps(nextProps) {
    const { selected } = nextProps;
    if (selected) {
      this.setState({ ...removeNulls(selected) });
    }
  }

  onChange = (name, e, control) => {
    const { id } = this.state;
    const change = control
      ? { [name]: control.checked }
      : { [name]: e.target.value };
    const photo = { id, ...change };
    this.setState(change, () => this.props.mutate({ variables: { photo } }));
  };

  render() {
    const { selected } = this.props;
    const {
      name,
      title,
      caption,
      width,
      height,
      urls,
      isPublic,
      dateTaken,
    } = this.state;

    return (
      <div className="inspector-section">
        <div className="topbar">Inspector</div>
        <div className="content">
          {selected && (
            <React.Fragment>
              <div className="selected-photo">
                <img src={getInspectorPhoto(urls)} alt="Selected Placeholder" />
              </div>
              <div className="inspector-content">
                <div className="title">Properties</div>
                <div className="properties">
                  <div className="heading">File</div>
                  <div className="property">{name}</div>

                  <div className="heading">Title</div>
                  <div className="property">
                    <input
                      className="dark"
                      type="text"
                      value={title}
                      name="title"
                      onChange={this.onChange.bind(null, 'title')}
                    />
                  </div>

                  <div className="heading">Caption</div>
                  <div className="property">
                    <textarea
                      className="dark"
                      rows="6"
                      name="caption"
                      value={caption}
                      onChange={this.onChange.bind(null, 'caption')}
                    />
                  </div>

                  <div className="heading">Width</div>
                  <div className="property">{width}</div>

                  <div className="heading">Height</div>
                  <div className="property">{height}</div>

                  <div className="heading">Date Taken</div>
                  <div className="property">{dateTaken}</div>

                  <div className="heading">Public</div>
                  <div className="property">
                    <Checkbox
                      name="isPublic"
                      checked={isPublic}
                      value="isPublic"
                      onChange={this.onChange.bind(null, 'isPublic')}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const updatePhotoMutation = gql`
  mutation updatePhoto($photo: PhotoInput!) {
    updatePhoto(photo: $photo)
  }
`;

export default graphql(updatePhotoMutation)(Inspector);
