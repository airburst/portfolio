import React, { Component } from 'react';
import './Manager.css';

class Manager extends Component {
  render() {
    return (
    <div className="admin-container">

      <div className="topbar">Library</div>

      <div className="topbar"></div>

      <div className="topbar">Inspector</div>

      <div className="content">
        <div className="title">Albums</div>
        <div className="tree">(File tree)</div>
      </div>

      <div className="media-container">
        <div className="media">
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/100x150" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/100x150" alt="Placeholder" />
          </div>
          <div className="thumbnail">
            <img src="https://source.unsplash.com/random/150x100" alt="Placeholder" />
          </div>
        </div>
      </div>

      <div className="right">
        <div className="selected-photo">
          <img src="https://source.unsplash.com/random/300x200" alt="Selected Placeholder" />
        </div>
        <div className="content">
          <div className="title">Properties</div>
          <div className="properties">
            <div className="heading">File</div>
            <div className="property">abc.jpg</div>
            <div className="heading">Title</div>
            <div className="property">
              <input className="dark" type="text" value="My title" />
            </div>
            <div className="heading">Caption</div>
            <div className="property">
              <textarea className="dark" rows="8" value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quas ipsa numquam molestias tempore."></textarea>
            </div>
          </div>
        </div>
      </div>

    </div>
    );
  }
}

export default Manager;
