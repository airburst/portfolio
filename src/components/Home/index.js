import React from 'react';
import './Home.css';
import './Kenburns.css';

const Home = () => (
  <div className="page-container">
    <div className="slideshow">
      <div
        className="slideshow-image"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/category/nature/1600x1400')",
        }}
      />
      <div
        className="slideshow-image"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/category/buildings/1600x1400')",
        }}
      />
      <div
        className="slideshow-image"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/category/food/1600x1400')",
        }}
      />
      <div
        className="slideshow-image"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/category/technology/1600x1400')",
        }}
      />
    </div>
  </div>
);

export default Home;
