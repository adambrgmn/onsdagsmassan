/* eslint-disable no-use-before-define */

import React, { Component } from 'react';
import css from 'next/css';
import * as vars from '../styles/variables';
import eventListeners from '../utils/eventListeners';

import Head from '../components/Head';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Section from '../components/Section';
import Footer from '../components/Footer';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { showNav: false };
    this.sectionScrollEvents = [];
  }

  componentDidMount() {
    this.unregisterScroll = eventListeners('scroll', this.runScroll);
  }

  componentWillUnmount() {
    this.unregisterScroll();
  }

  addScrollEvent = (fn) => (this.sectionScrollEvents = [...this.sectionScrollEvents, fn]);
  addResizeEvent = (fn) => (this.sectionResizeEvents = [...this.sectionResizeEvents, fn]);
  runScroll = () => this.sectionScrollEvents.forEach(fn => fn());

  onNavClick = (e) => {
    if (e) e.preventDefault();
    this.setState({ showNav: !this.state.showNav });
  }

  render() {
    const sections = [
      {
        title: 'Aktuellt',
        img: '/static/img/akvarell-1.png',
        textContent: (<div><p>Aktuellt conceptam reprimique duo ei, impedit tibique omittantur ne mea, mel stet consectetuer ut. Ut qui ubique definiebas percipitur, fabulas legimus signiferumque duo an. At iisque impedit salutatus cum, pri vidit referrentur eu, quo praesent expetendis interesset eu.</p><p>Eros sanctus his ex. At liber electram posidonium ius. Te mei dico audire veritus. Nullam sententiae consequuntur est at, his an discere suscipiantur. Stet conceptam reprimique duo ei, impedit tibique omittantur ne mea, mel stet consectetuer ut. Ut qui ubique definiebas percipitur, fabulas legimus signiferumque duo.</p><p>At iisque impedit salutatus cum, pri vidit referrentur eu, quo praesent expetendis interesset eu. Eros sanctus his ex. At liber electram posidonium ius. Te mei dico audire veritus. Nullam sententiae consequuntur est at, his an discere suscipiantur.</p></div>), // eslint-disable-line max-len
      },
      {
        title: 'Information',
        img: '/static/img/akvarell-2.png',
        reverse: true,
        textContent: (<div><p>Information conceptam reprimique duo ei, impedit tibique omittantur ne mea, mel stet consectetuer ut. Ut qui ubique definiebas percipitur, fabulas legimus signiferumque duo an. At iisque impedit salutatus cum, pri vidit referrentur eu, quo praesent expetendis interesset eu.</p><p>Eros sanctus his ex. At liber electram posidonium ius. Te mei dico audire veritus. Nullam sententiae consequuntur est at, his an discere suscipiantur. Stet conceptam reprimique duo ei, impedit tibique omittantur ne mea, mel stet consectetuer ut. Ut qui ubique definiebas percipitur, fabulas legimus signiferumque duo.</p><p>At iisque impedit salutatus cum, pri vidit referrentur eu, quo praesent expetendis interesset eu. Eros sanctus his ex. At liber electram posidonium ius. Te mei dico audire veritus. Nullam sententiae consequuntur est at, his an discere suscipiantur.</p></div>), // eslint-disable-line max-len
      },
      {
        title: 'Musik',
        spotify: 'spotify:user:onsdagsm%C3%A4ssan:playlist:4dDDM2RIVweg1Smi9GemJY',
        textContent: (<div><p>Musik conceptam reprimique duo ei, impedit tibique omittantur ne mea, mel stet consectetuer ut. Ut qui ubique definiebas percipitur, fabulas legimus signiferumque duo an. At iisque impedit salutatus cum, pri vidit referrentur eu, quo praesent expetendis interesset eu.</p><p>Eros sanctus his ex. At liber electram posidonium ius. Te mei dico audire veritus. Nullam sententiae consequuntur est at, his an discere suscipiantur. Stet conceptam reprimique duo ei, impedit tibique omittantur ne mea, mel stet consectetuer ut. Ut qui ubique definiebas percipitur, fabulas legimus signiferumque duo.</p><p>At iisque impedit salutatus cum, pri vidit referrentur eu, quo praesent expetendis interesset eu. Eros sanctus his ex. At liber electram posidonium ius. Te mei dico audire veritus. Nullam sententiae consequuntur est at, his an discere suscipiantur.</p></div>), // eslint-disable-line max-len
      },
    ];

    return (
      <div className="container">
        <Head />
        <Nav showNav={this.state.showNav} onClick={this.onNavClick} />
        <Header img="/static/img/akvarell-0.png" addScroll={this.addScrollEvent} />
        {sections.map((props) => (
          <Section key={props.title} {...props} addScroll={this.addScrollEvent} />
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
