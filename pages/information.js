/* eslint-disable no-use-before-define */

import React, { Component } from 'react';
import { merge, media, select as $ } from 'next/css';

import { font, mediaQuery, color } from '../styles/variables';
import { gridItem } from '../styles/shared';

import Head from '../components/Head';
import Nav from '../components/Nav';
import Img from '../components/Img';
import TextContent from '../components/TextContent';
import { Uppercase } from '../components/TextComp';
import Footer from '../components/Footer';
import Grid from '../components/Grid';
import SlowScroll from '../components/SlowScroll';

import { getSection } from '../utils/api';
import rellax from '../utils/rellax';

export default class Information extends Component {
  static async getInitialProps() {
    const section = await getSection('information');
    return { section };
  }

  constructor(props) {
    super(props);
    this.state = { showNav: false, inTransition: false };
  }

  componentDidMount() {
    this.destroyRellax = rellax();
  }

  componentWillUnmount() {
    this.destroyRellax();
  }

  onNavClick = (e) => {
    if (e) e.preventDefault();
    this.setState({ showNav: !this.state.showNav });
  }

  onTransition = () => new Promise((resolve) => {
    this.setState({ inTransition: true });
    window.setTimeout(() => resolve(), 1000);
  })

  render() {
    const navItems = [{ title: 'Tillbaka', href: '/' }];
    const cx = this.state.inTransition ? 'container inTransition' : 'container';

    return (
      <div className={cx}>
        <Head />
        <Nav
          showNav={this.state.showNav}
          onClick={this.onNavClick}
          items={navItems}
          transition={this.onTransition}
        />
        <Grid>
          <div {...styles.gridItem}>
            <SlowScroll faster>
              <Img src="akvarell3.png" {...styles.image} />
            </SlowScroll>
            <h1 {...styles.title}>
              <Uppercase>Information</Uppercase>
            </h1>
            <TextContent source={this.props.section} className={styles.content} />
          </div>
        </Grid>
        <Footer />
      </div>
    );
  }
}

const styles = {
  gridItem: merge(gridItem, media(mediaQuery.desktop, { width: '40%' })),
  image: merge({ width: '70%', margin: '5rem auto 3rem auto' }),
  title: merge(
    {
      margin: 0,
      marginBottom: '0.5rem',
      fontFamily: font.family.sansSerif,
      fontSize: font.size.sectionTitle.mobile,
      color: color.second,
      fontWeight: '500',
      letterSpacing: '2px',
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
