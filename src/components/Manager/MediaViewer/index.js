import React from 'react';
import Toolbar from './Toolbar';
import FileUpload from './FileUpload';
import './MediaViewer.css';

class MediaViewer extends React.Component {
  state = {
    // search: '', // TODO: use search
    showUploads: false,
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  uploadClickHandler = () => {
    this.setState({ showUploads: true });
  };

  render() {
    const { showUploads } = this.state;

    return (
      <div className="media-section">
        <Toolbar
          onSearchChange={v => this.onChange('search', v)}
          uploadClickHandler={this.uploadClickHandler}
        />

        {showUploads && <FileUpload />}

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
