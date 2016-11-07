import React from 'react';
import getContent from '../../lib/getContent';

import Menu from '../Menu';
import Home from '../Home';
import Footer from '../Footer';
import Section from '../Section';

export default () => {
  const aktuellt = getContent('aktuellt');
  const information = getContent('information');
  const musik = getContent('musik');

  return (
    <div className="container">
      <Menu />
      <Home />
      <Section content={aktuellt} pathname="/aktuellt" />
      <Section content={information} pathname="/information" />
      <Section content={musik} pathname="/musik" />
      <Footer />
    </div>
  );
};
