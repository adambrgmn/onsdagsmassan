import React, { Component } from 'react';

import Head from '../components/Head';
import Nav from '../components/Nav';
import InformationContent from '../components/Section/InformationContent';
import Footer from '../components/Footer';

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
        <InformationContent />
        <Footer />
      </div>
    );
  }
}
