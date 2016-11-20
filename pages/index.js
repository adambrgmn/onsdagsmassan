/* eslint-disable no-use-before-define */

import React, { Component } from 'react';
import css from 'next/css';
import axios from 'axios';
import * as vars from '../styles/variables';

import Head from '../components/Head';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Section from '../components/Section';
import Footer from '../components/Footer';
import ReadMoreLink from '../components/ReadMoreLink';

export default class Index extends Component {
  static async getInitialProps() {
    try {
      const aktuellt = await axios.get('http://localhost:8080/api/aktuellt');
      const information = await axios.get('http://localhost:8080/api/information');
      const musik = await axios.get('http://localhost:8080/api/musik');
      return {
        aktuellt: aktuellt.data.content,
        information: information.data.content,
        musik: musik.data.content,
      };
    } catch (err) {
      return { err };
    }
  }

  constructor(props) {
    super(props);
    this.state = { showNav: false, inTransition: false };
    this.sectionScrollEvents = [];
  }

  onNavClick = (e) => {
    if (e) e.preventDefault();
    this.setState({ showNav: !this.state.showNav });
  }

  onTransition = () => new Promise((resolve) => {
    this.setState({ inTransition: true });

    window.setTimeout(() => {
      this.setState({ inTransition: false });
      resolve();
    }, 1000);
  });

  render() {
    const sections = [
      {
        title: 'Aktuellt',
        to: 'aktuellt',
        img: 'akvarell2.png',
        source: this.props.aktuellt,
      },
      {
        title: 'Information',
        to: 'information',
        img: 'akvarell3.png',
        reverse: true,
        source: this.props.information,
        readMoreLink: <ReadMoreLink transition={this.onTransition} href="/information" />,
      },
      {
        title: 'Musik',
        to: 'musik',
        spotify: 'spotify:user:onsdagsm%C3%A4ssan:playlist:4dDDM2RIVweg1Smi9GemJY',
        source: this.props.musik,
      },
    ];

    const navItems = [{ title: 'Hem', to: 'hem' }, ...sections];

    const { inTransition } = this.state;
    const cx = inTransition ? 'container inTransition' : 'container';

    return (
      <div className={cx}>
        <Head />
        <Nav showNav={this.state.showNav} onClick={this.onNavClick} items={navItems} />
        <Header img="akvarell1.png" />
        {sections.map((props) => (
          <Section key={props.title} {...props} />
        ))}
        <Footer />
      </div>
    );
  }
}

css.insertRule(`html { font-size: ${vars.font.base} }`);
css.insertRule('*, *::before, *::after { box-sizing: border-box }');
css.insertRule(`
  body {
    margin: 0;
    font-family: ${vars.font.family.sansSerif};
    border-left: ${vars.border.width} solid ${vars.color.main};
    border-right: ${vars.border.width} solid ${vars.color.main};
    background: url('/static/img/bg.jpg') ${vars.color.background};
  }

  body::before,
  body::after {
    content: '';
    position: fixed;
    background: ${vars.color.main};
    left: 0;
    right: 0;
    height: ${vars.border.width};
    z-index: 1;
  }

  body::before { top: 0; }
  body::after { bottom: 0; }
`);
