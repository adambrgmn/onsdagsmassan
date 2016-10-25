import React, { PropTypes } from 'react';
import classNames from 'classnames';
import deltaToReact from '../../lib/deltaToReact';
import getContent from '../../lib/getContent';

import s from './styles.scss';

import Spotify from '../Spotify';

import akvarell1 from '../../img/akvarell-1.png';
import akvarell2 from '../../img/akvarell-2.png';

const Section = ({ content, pathname }) => {
  const { uri, ops, layout } = content || getContent(pathname);

  const sectionTextContent = deltaToReact({ ops });

  const sectionSidebar = () => {
    const images = [akvarell1, akvarell2];
    const int = pathname === '/aktuellt' ? 0 : 1;

    const cx = {
      [s.sectionSidebar]: true,
      [s.sectionSidebarSpotify]: uri,
    };

    return (
      <div className={classNames(cx)}>
        {uri
          ? <Spotify uri={uri} />
          : <img className={s.sectionSidebarImg} src={images[int]} alt="Bild av akvarell" />
        }
      </div>
    );
  };

  const sectionName = pathname.replace('/', '');
  const cx = {
    [s.section]: true,
    [`section-${sectionName}`]: true,
    [s.sectionReverse]: layout.reverse,
  };

  return (
    <div id={sectionName} className={classNames(cx)}>
      {sectionSidebar()}
      <div className={s.sectionTextContent}>
        {sectionTextContent}
      </div>
    </div>
  );
};

Section.propTypes = {
  content: PropTypes.shape({
    layout: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    ops: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
    uri: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  }),
  pathname: PropTypes.string,
};

export default Section;
