import React from 'react';
import deltaToReact from '../../lib/deltaToReact';

import Spotify from '../Spotify';

import { musik } from '../../content.json';
import './styles.css';

export default () => {
  const component = deltaToReact(musik);
  console.log(musik.uri);
  return (
    <div className="musik">
      <div className="musik-playlist-container">
        <Spotify uri={musik.uri} />
      </div>
      <div className="musik-text-container">
        {component}
      </div>
    </div>
  )
};
