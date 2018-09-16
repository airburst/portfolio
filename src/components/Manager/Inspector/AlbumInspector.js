import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { debounce } from 'throttle-debounce';
import { Checkbox } from 'semantic-ui-react';
import { albumsQuery, updateAlbumMutation } from '../../../queries';
import CoverPhoto from './CoverPhoto';
import './Inspector.css';

const initialState = {
  id: null,
  name: null,
  description: null,
  cover: null,
  isPublic: null,
};

class AlbumInspector extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    album: PropTypes.object,
  };

  static defaultProps = {
    album: null,
  };

  constructor() {
    super();
    this.emitValue = debounce(500, this.emitValue);
  }

  state = initialState;

  componentWillReceiveProps(nextProps) {
    if (nextProps.album) {
      this.setState(nextProps.album);
    } else {
      this.setState(initialState);
    }
  }

  onChange = (e, control) => {
    const name = control ? control.name : e.target.name;
    const value = control ? control.checked : e.target.value;
    const { id } = this.state;
    const change = { [name]: value };
    const album = { id, ...change };
    this.setState(change);
    // this.emitValue(album);
  };

  onDropCoverPhoto = id => {
    const { album } = this.props;
    const { photos } = album;
    console.log('TCL: AlbumInspector -> onDropCoverPhoto -> id', id);
    console.log('TCL: AlbumInspector -> photos', album);
    // this.setState({ cover: thumbnail });
  };

  emitValue(album) {
    this.props.mutate({
      variables: { album },
      refetchQueries: [
        {
          query: albumsQuery,
        },
      ],
    });
  }

  render() {
    const { id, name, description, isPublic } = this.state;

    return (
      <React.Fragment>
        {name && (
          <React.Fragment>
            <div className="inspector-content">
              <section>
                <div className="title">Cover Photo</div>
                <CoverPhoto onDropCoverPhoto={this.onDropCoverPhoto} />
                <div className="inspector-divider" />
              </section>

              <section>
                <div className="title">Properties</div>
                <div className="properties">
                  <div className="heading">Id</div>
                  <div className="property">{id}</div>

                  <div className="heading">Name</div>
                  <div className="property">
                    <input
                      className="dark"
                      type="text"
                      value={name || ''}
                      name="name"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="heading">Description</div>
                  <div className="property">
                    <textarea
                      className="dark"
                      rows="6"
                      name="description"
                      value={description || ''}
                      onChange={this.onChange}
                    />
                  </div>

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
              </section>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default graphql(updateAlbumMutation)(AlbumInspector);
