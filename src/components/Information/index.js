import React from 'react';
import deltaToReact from '../../lib/deltaToReact';

import { information } from '../../content.json';
import image from './akvarell3.png';
import './styles.css';

export default () => {
  const component = deltaToReact(information);

  return (
    <div className="information">
      <div className="information-img-container">
        <img className="information-img" src={image} alt="Bild av akvarell" />
      </div>
      <div className="information-text-container">
        {component}
      </div>
    </div>
  )
};
