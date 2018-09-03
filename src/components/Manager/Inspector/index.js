import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { debounce } from 'throttle-debounce';
import { Checkbox } from 'semantic-ui-react';
import DeletePhotoButton from './DeletePhotoButton';
import allPhotosQuery from '../MediaViewer/allPhotosQuery';
import './Inspector.css';

const initialState = {
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

const getInspectorPhoto = urls => {
  if (!urls || !urls.json) {
    return null;
  }
  const u = urls.json;
  return u[5] ? u[5] : u[6];
};

class Inspector extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    clearInspector: PropTypes.func.isRequired,
    selected: PropTypes.object,
  };

  static defaultProps = {
    selected: null,
  };

  constructor() {
    super();
    this.emitValue = debounce(500, this.emitValue);
  }

  state = initialState;

  onChange = (e, control) => {
    const name = control ? control.name : e.target.name;
    const value = control ? control.checked : e.target.value;
    const { id } = this.state;
    const change = { [name]: value };
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
    const { selected, clearInspector } = this.props;

    const {
      id,
      name,
      title,
      caption,
      width,
      height,
      urls,
      isPublic,
      dateTaken,
    } = selected || initialState;

    return (
      <div className="inspector-section">
        <div className="topbar">Inspector</div>
        <div className="properties-content">
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

                  <div className="heading">Dimensions</div>
                  <div className="property">{`${width} x ${height}`}</div>

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
              <div className="action-buttons">
                <DeletePhotoButton id={id} clear={clearInspector} />
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
