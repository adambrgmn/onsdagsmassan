import React from 'react';
import getContent from '../../lib/getContent';
import deltaToReact from '../../lib/deltaToReact';

import Spotify from '../Spotify';

import akvarell1 from '../../img/akvarell-1.png';
import akvarell2 from '../../img/akvarell-2.png';
import './styles.css';

export default ({ pathname, reveal }) => {
  const { uri, ops, layout } = getContent(pathname);

  const sectionTextContent = deltaToReact({ ops });

  const sectionSidebar = () => {
    const images = [akvarell1, akvarell2];
    const int = pathname === '/aktuellt' ? 0 : 1;

    return (
      <div className="section-sidebar section-column">
        {uri ?
          <Spotify uri={uri} /> :
          <img className="section-img" src={images[int]} alt="Bild av akvarell" />
        }
      </div>
    );
  };

  const sectionClassName = layout.reverse ? 'section section-reverse' : 'section';
  const sectionOpacity = reveal ? Number(reveal.toFixed(2)) : 1;

  return (
    <div className={sectionClassName} style={{ opacity: sectionOpacity }}>
      {sectionSidebar()}
      <div className="section-text section-column">
        {sectionTextContent}
      </div>
    </div>
  );
};
