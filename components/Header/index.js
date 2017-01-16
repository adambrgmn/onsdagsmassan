/* eslint-disable no-use-before-define */

import React from 'react';
import css from 'next/css';

import Img from '../Img';
import SlowScroll from '../SlowScroll';
import { Uppercase } from '../TextComp';

import { grid, responsiveImg, uppercase } from '../../styles/shared';
import { mediaQuery, font } from '../../styles/variables';

export default ({ img }) => (
  <header id="hem" {...styles.header}>
    <div {...styles.headerImgContainer}>
      <SlowScroll faster>
        <Img src={img} role="presentation" />
      </SlowScroll>
    </div>
    <div {...styles.headerTitleContainer}>
      <h1 {...styles.headerTitle}>Onsdagsm&auml;ssan</h1>
      <h2 {...styles.headerSubTitle}>
        Varje onsdag kl 18.30 i<br />
        <Uppercase>Betlehemskyrkans kapell</Uppercase>
      </h2>
    </div>
  </header>
);

const styles = {
  header: css.merge(
    grid(),
  ),

  headerImgContainer: css.merge(
    { width: '75%', marginBottom: '2rem' },
    css.media(mediaQuery.tablet, { width: '60%', marginBottom: '3rem' }),
    css.media(mediaQuery.desktop, { width: '30%', marginBottom: '1rem' }),
  ),

  headerImg: css.merge(responsiveImg, { animationDelay: '0.5s' }),

  headerTitleContainer: css({ textAlign: 'center', width: '100%' }),

  headerTitle: css.merge(
    uppercase,
    {
      margin: 0,
      marginBottom: '1rem',
      fontFamily: font.family.serif,
      fontWeight: '400',
      fontSize: font.size.title.mobile,
      letterSpacing: font.spacing.title.mobile,
    },
    css.media(mediaQuery.tablet, {
      fontSize: font.size.title.tablet,
      letterSpacing: font.spacing.title.tablet,
    }),
    css.media(mediaQuery.desktop, {
      fontSize: font.size.title.desktop,
    }),
  ),

  headerSubTitle: css.merge(
    {
      margin: 0,
      fontFamily: font.family.sansSerif,
      fontWeight: 'normal',
      fontSize: font.size.subtitle.mobile,
      lineHeight: '1.5',
      letterSpacing: font.spacing.subtitle.mobile,
    },
    css.media(mediaQuery.tablet, { fontSize: font.size.subtitle.tablet }),
    css.media(mediaQuery.desktop, { fontSize: font.size.subtitle.desktop }),
  ),
};
