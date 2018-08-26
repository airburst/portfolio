import React from 'react';
import { Button } from 'semantic-ui-react';
import Search from './Search';
import './MediaViewer.css';

class MediaViewer extends React.Component {
  state = {
    search: '',
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    const { search } = this.state;
    console.log('​MediaViewer -> render -> search', search);

    return (
      <div>
        <div className="topbar">
          <div className="left">
            <Button
              secondary
              size="mini"
              onClick={() => console.log('add photos')}
              content="Upload"
            />
          </div>
          <div className="right">
            <Search action={v => this.onChange('search', v)} />
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
