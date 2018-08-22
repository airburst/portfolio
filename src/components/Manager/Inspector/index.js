import React from 'react';
import './Inspector.css';

const Inspector = props => {
  return (
    <div>
      <div className="topbar">Inspector</div>
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
              <input className="dark" type="text" value="My title" readOnly />
            </div>
            <div className="heading">Caption</div>
            <div className="property">
              <textarea className="dark" rows="8" value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quas ipsa numquam molestias tempore." readOnly></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inspector;