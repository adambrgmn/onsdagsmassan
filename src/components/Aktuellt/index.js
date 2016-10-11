import React from 'react';
import deltaToReact from '../../lib/deltaToReact';

import { aktuellt } from '../../content.json';
import image from './akvarell2.png';
import './styles.css';

export default () => {
  const component = deltaToReact(aktuellt);

  return (
    <div className="aktuellt">
      <div className="aktuellt-img-container">
        <img className="aktuellt-img" src={image} alt="Bild av akvarell" />
      </div>
      <div className="aktuellt-text-container">
        {component}
      </div>
    </div>
  )
};
