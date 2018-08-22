import React from 'react';
import './MediaViewer.css';

class MediaViewer extends React.Component {
  state = {
    search: '',
  };

  onChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  render() {
    const { search } = this.state;

    return (
      <div>
        <div className="topbar">
          <div className="left" />
          <div className="right">
            <input
              className="search-input"
              type="text"
              value={search}
              name="search"
              placeholder="Search"
              onChange={this.onChange.bind(null, 'search')}
            />
          </div>
        </div>
        <div className="media-container">
          <div className="media">
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/100x150"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/100x150"
                alt="Placeholder"
              />
            </div>
            <div className="thumbnail">
              <img
                src="https://source.unsplash.com/random/150x100"
                alt="Placeholder"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MediaViewer;
