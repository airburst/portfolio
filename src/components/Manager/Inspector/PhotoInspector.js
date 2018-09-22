import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { debounce } from 'throttle-debounce';
import { Checkbox } from 'semantic-ui-react';
import { allPhotosQuery, updatePhotoMutation } from '../../../queries';
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
  if (!urls) {
    return null;
  }
  return urls[5] ? urls[5] : urls[6];
};

const formatDate = datetime => {
  const dateString = new Date(datetime).toISOString().split('T')[0];
  const reversed = dateString
    .split('-')
    .reverse()
    .join('/');
  return reversed;
};

class PhotoInspector extends React.Component {
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

  state = initialState;

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      this.setState(nextProps.selected);
    } else {
      this.setState(initialState);
    }
  }

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
      <React.Fragment>
        {name && (
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
                <div className="property">{formatDate(+dateTaken)}</div>

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
      </React.Fragment>
    );
  }
}

export default graphql(updatePhotoMutation)(PhotoInspector);
