/* eslint-disable no-use-before-define */

import React from 'react';
import { merge, media, select as $ } from 'next/css';

import SlowScroll from '../SlowScroll';
import Img from '../Img';
import Spotify from '../Spotify';
import Grid, { GridItem } from '../Grid';
import { Excerpt } from '../TextContent';
import { Uppercase } from '../TextComp';

import { font, mediaQuery, color } from '../../styles/variables';

export default ({
  title,
  img = '/static/img/akvarell-1.png',
  spotify,
  source,
  readMoreLink,
  reverse,
}) => (
  <Grid reverse={reverse} id={title.toLowerCase()}>
    <GridItem>
      <SlowScroll className={styles.sectionSidebar} center ignoreMobile>
        {spotify ? <Spotify uri={spotify} /> : <Img src={img} className={styles.sectionImg} role="presentation" />}
      </SlowScroll>
    </GridItem>
    <GridItem>
      <h2 {...styles.sectionTitle}>
        <Uppercase>{title}</Uppercase>
      </h2>
      <Excerpt className={styles.sectionBody} source={source} readMoreLink={readMoreLink} />
    </GridItem>
  </Grid>
);

const styles = {
  sectionSidebar: merge(
    { textAlign: 'center' },
    media(mediaQuery.tablet, { textAlign: 'right' }),
  ),
  sectionImg: merge(
    { padding: '2.5rem' },
    media(mediaQuery.tablet, { padding: 0 }),
  ),
  sectionTitle: merge({
    margin: 0,
    marginBottom: '0.5rem',
    fontFamily: font.family.sansSerif,
    fontSize: font.size.sectionTitle.mobile,
    color: color.second,
    fontWeight: '500',
    letterSpacing: '2px',
  }),
  sectionBody: merge(
    { padding: '0', lineHeight: '1.5' },
    $(' p', { fontFamily: font.family.serif, fontSize: font.size.sectionBody.mobile }),
    $(' blockquote', { fontStyle: 'italic' }),
    $(' *:first-child', { marginTop: 0 }),
  ),
};
