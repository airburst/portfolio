import React from 'react';
import './Inspector.css';

class Inspector extends React.Component {
  state = {
    title: 'My title',
    caption: 'My caption',
  };

  onChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  render() {
    const { title, caption } = this.state;

    return (
      <div>
        <div className="topbar">Inspector</div>
        <div className="right">
          <div className="selected-photo">
            <img
              src="/../../assets/images/lakes.png"
              alt="Selected Placeholder"
            />
          </div>
          <div className="content">
            <div className="title">Properties</div>
            <div className="properties">
              <div className="heading">File</div>
              <div className="property">abc.jpg</div>

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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inspector;
