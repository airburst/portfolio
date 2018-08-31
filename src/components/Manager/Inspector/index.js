import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { debounce } from 'throttle-debounce';
import { Checkbox } from 'semantic-ui-react';
import allPhotosQuery from '../MediaViewer/allPhotosQuery';
import './Inspector.css';

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

  constructor() {
    super();
    this.emitValue = debounce(500, this.emitValue);
  }

  state = {
    id: null,
    name: null,
    title: null,
    caption: null,
    urls: null,
    width: null,
    height: null,
    isPublic: false,
    dateTaken: null,
    // exposure
    // shutter
    // focalLength
    // iso
  };

  componentWillReceiveProps(nextProps) {
    const { selected } = nextProps;
    if (selected) {
      this.setState({ ...selected });
    }
  }

  onChange = (e, control) => {
    const { name, value } = e.target;
    const { id } = this.state;
    const change = control ? { [name]: control.checked } : { [name]: value };
    const photo = { id, ...change };
    this.setState(change);
    this.emitValue(photo);
  };

  emitValue(photo) {
    this.props.mutate({
      variables: { photo },
      refetchQueries: [
        {
          query: allPhotosQuery,
        },
      ],
    });
  }

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
                      value={title || ''}
                      name="title"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="heading">Caption</div>
                  <div className="property">
                    <textarea
                      className="dark"
                      rows="6"
                      name="caption"
                      value={caption || ''}
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
