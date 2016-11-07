// @flow

import React from 'react';
import classNames from 'classnames';

import s from './styles.scss';

import Spotify from '../Spotify';

import akvarell1 from '../../img/akvarell-1.png';
import akvarell2 from '../../img/akvarell-2.png';

type Props = {
  uri?: string;
  reverse: boolean;
}

export default function sectionSidebar({ uri, reverse }: Props) {
  const images = [akvarell1, akvarell2];
  const int = Math.round(Math.random());

  const cx = {
    [s.sectionSidebar]: true,
    [s.sectionSidebarSpotify]: uri,
    [s.sectionReverse]: reverse,
  };

  return (
    <div className={classNames(cx)}>
      {uri
        ? <Spotify uri={uri} />
        : <img className={s.sectionSidebarImg} src={images[int]} alt="Bild av akvarell" />
      }
    </div>
  );
}
