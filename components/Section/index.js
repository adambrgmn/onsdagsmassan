/* eslint-disable no-use-before-define */

import React from 'react';
import { merge, select as $ } from 'next/css';

import Img from '../Img';
import Spotify from '../Spotify';
import Grid, { GridItem } from '../Grid';

import { font } from '../../styles/variables';

export default ({
  title,
  img = '/static/img/akvarell-1.png',
  spotify,
  textContent,
  reverse,
}) => (
  <Grid reverse={reverse} id={title.toLowerCase()}>
    <GridItem>
      <div className={styles.sectionSidebar}>
        {spotify ? <Spotify uri={spotify} /> : <Img src={img} role="presentation" />}
      </div>
    </GridItem>
    <GridItem>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionBody}>{textContent}</div>
    </GridItem>
  </Grid>
);

const styles = {
  sectionSidebar: merge({ textAlign: 'right' }),
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
