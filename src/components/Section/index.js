import React, { PropTypes } from 'react';
import deltaToReact from '../../lib/deltaToReact';
import getContent from '../../lib/getContent';

import Spotify from '../Spotify';

import akvarell1 from '../../img/akvarell-1.png';
import akvarell2 from '../../img/akvarell-2.png';

const Section = ({ content, pathname }) => {
  const { uri, ops } = content || getContent(pathname);

  const sectionTextContent = deltaToReact({ ops });

  const sectionSidebar = () => {
    const images = [akvarell1, akvarell2];
    const int = pathname === '/aktuellt' ? 0 : 1;

    return (
      <div>
        {uri
          ? <Spotify uri={uri} />
          : <img src={images[int]} alt="Bild av akvarell" />
        }
      </div>
    );
  };

  return (
    <div>
      {sectionSidebar()}
      <div>
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
