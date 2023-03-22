import React from 'react';
import './Landing.css';

function Landing() {

  return (
    <div className="landing">
      <div className="margin-2vh">
        <h2>
          <span className="pink">Welcome </span>
          <span className="yellow">to </span>
          <span className="yellow">Blunt </span>
          <span className="pink">Fringe </span>
        </h2>
        <p className="margin-2vh">An exciting new fringe arts festival is coming to London this July. </p>
      </div>
      <img src={"https://resources.stuff.co.nz/content/dam/images/4/y/u/i/o/d/image.related.StuffLandscapeSixteenByNine.1240x700.235od0.png/1630391972581.jpg?format=pjpg&optimize=medium"} alt="Acrobatic performers balance on their hands in moody lighting." className="landing-image" />
    </div>
  );
}

export default Landing;
