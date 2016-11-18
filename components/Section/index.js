/* eslint-disable no-use-before-define */

import React from 'react';
import { merge, media, select as $ } from 'next/css';

import SlowScroll from '../SlowScroll';
import Img from '../Img';
import Spotify from '../Spotify';
import Grid, { GridItem } from '../Grid';
import { Excerpt } from '../TextContent';

import { font, mediaQuery } from '../../styles/variables';

export default ({
  title,
  img = '/static/img/akvarell-1.png',
  spotify,
  source,
  readMoreLink,
  reverse,
  addScroll,
}) => (
  <Grid reverse={reverse} id={title.toLowerCase()}>
    <GridItem>
      <SlowScroll
        className={styles.sectionSidebar}
        maxTranslate={30}
        addScroll={addScroll}
      >
        {spotify ? <Spotify uri={spotify} /> : <Img src={img} role="presentation" />}
      </SlowScroll>
    </GridItem>
    <GridItem>
      <h2 {...styles.sectionTitle}>{title}</h2>
      <Excerpt className={styles.sectionBody} source={source} readMoreLink={readMoreLink} />
    </GridItem>
  </Grid>
);

const styles = {
  sectionSidebar: merge(
    { textAlign: 'center' },
    media(mediaQuery.tablet, { textAlign: 'right' }),
  ),
  sectionTitle: merge({
    margin: 0,
    fontFamily: font.family.sansSerif,
    fontSize: font.size.sectionTitle.mobile,
    fontWeight: '600',
  }),
  sectionBody: merge(
   { padding: '0', lineHeight: '1.5' },
   $(' p', { fontFamily: font.family.serif, fontSize: font.size.sectionBody.mobile }),
   $(' *:first-child', { marginTop: 0 }),
 ),
};
