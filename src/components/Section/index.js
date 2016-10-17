import React from 'react';
import classNames from 'classnames';
import deltaToReact from '../../lib/deltaToReact';
import revealer from '../../lib/revealer';
import getContent from '../../lib/getContent';

import Spotify from '../Spotify';

import akvarell1 from '../../img/akvarell-1.png';
import akvarell2 from '../../img/akvarell-2.png';
import './styles.css';

const Section = ({ content, pathname, inView = true }) => {
  const { uri, ops, layout } = content || getContent(pathname);

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

  const sectionName = pathname.replace('/', '');
  const cx = {
    section: true,
    'section-reverse': layout.reverse,
    [`section-${sectionName}`]: true,
    'section-in-view': inView,
  }

  return (
    <div id={sectionName} className={classNames(cx)}>
      {sectionSidebar()}
      <div className="section-text section-column">
        {sectionTextContent}
      </div>
    </div>
  );
};

export default Section;
export const SectionReveal = revealer(Section);
