import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { debounce } from 'throttle-debounce';
import { Checkbox } from 'semantic-ui-react';
import { albumsQuery, updatePhotoMutation } from '../../../queries';
import './Inspector.css';

const initialState = {
  id: null,
  name: null,
  description: null,
  isPublic: null,
};

class AlbumInspector extends React.Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    albumId: PropTypes.number,
  };

  static defaultProps = {
    albumId: null,
  };

  constructor() {
    super();
    this.emitValue = debounce(500, this.emitValue);
  }

  state = initialState;

  componentWillReceiveProps(nextProps) {
    if (nextProps.albumId) {
      this.setState({ id: nextProps.albumId });
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
    console.log('TCL: AlbumInspector -> onChange -> album', album);
    this.setState(change);
    // this.emitValue(photo);
  };

  emitValue(photo) {
    this.props.mutate({
      variables: { photo },
      refetchQueries: [
        {
          query: albumsQuery,
        },
      ],
    });
  }

  render() {
    const { id, name, description, isPublic } = this.state || initialState;
    console.log('TCL: AlbumInspector -> render -> id', id);

    return (
      <React.Fragment>
        {/* {name && ( */}
        <React.Fragment>
          {/* <div className="selected-photo">
              <img src={getInspectorPhoto(urls)} alt="Selected Placeholder" />
            </div> */}

          <div className="inspector-content">
            <section>
              <div className="title">Cover Photo</div>
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
        {/* )} */}
      </React.Fragment>
    );
  }
}

export default graphql(updatePhotoMutation)(AlbumInspector);
