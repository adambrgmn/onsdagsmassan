/* eslint-disable no-use-before-define */

import React, { Component } from 'react';
import { merge, media, select as $ } from 'next/css';

import { font, mediaQuery } from '../styles/variables';
import { gridItem } from '../styles/shared';

import Head from '../components/Head';
import Nav from '../components/Nav';
import Img from '../components/Img';
import TextContent from '../components/TextContent';
import Footer from '../components/Footer';
import Grid from '../components/Grid';
import SlowScroll from '../components/SlowScroll';

import information from '../resources/information';

export default class Information extends Component {
  constructor(props) {
    super(props);
    this.state = { showNav: false };
  }

  onNavClick = (e) => {
    if (e) e.preventDefault();
    this.setState({ showNav: !this.state.showNav });
  }

  render() {
    const navItems = [{ title: 'Tillbaka', href: '/' }];
    return (
      <div className="container">
        <Head />
        <Nav showNav={this.state.showNav} onClick={this.onNavClick} items={navItems} />
        <Grid>
          <div {...styles.gridItem}>
            <SlowScroll maxTranslate={-30} ignoreMobile>
              <Img src="akvarell3.png" {...styles.image} />
            </SlowScroll>
            <h1 {...styles.title}>Information</h1>
            <TextContent source={information} className={styles.content} />
          </div>
        </Grid>
        <Footer />
      </div>
    );
  }
}

const styles = {
  gridItem: merge(gridItem, media(mediaQuery.desktop, { width: '40%' })),
  image: merge({ width: '70%', margin: '5rem auto 0 auto' }),
  title: merge(
    {
      margin: 0,
      fontFamily: font.family.sansSerif,
      fontSize: '1.2rem',
      fontWeight: '600',
    },
    media(mediaQuery.tablet, { marginTop: '3rem' }),
  ),
  content: merge(
    { padding: '0', lineHeight: '1.5' },
    $(' p', { fontFamily: font.family.serif, fontSize: '1.2rem' }),
    $(' blockquote', { fontStyle: 'italic' }),
    $(' *:first-child', { marginTop: 0 }),
  ),
};
