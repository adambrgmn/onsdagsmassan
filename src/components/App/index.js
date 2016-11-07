// @flow

import React from 'react';

import s from './styles.scss';

import Menu from '../Menu';
import Home from '../Home';
import Footer from '../Footer';
import Section from '../Section';

export default function App() {
  const routes = [
    { path: '', title: 'Hem' },
    { path: 'aktuellt', title: 'Aktuellt' },
    { path: 'information', title: 'Information' },
    { path: 'musik', title: 'Musik' },
  ];

  return (
    <div className={s.container}>
      <Menu routes={routes} />
      <Home />
      {routes.slice(1).map(({ path }, i) => {
        let reverse = false;
        if (i % 2) reverse = true;

        return (
          <Section
            key={path}
            sectionName={path}
            reverse={reverse}
          />
        );
      })}
      <Footer />
    </div>
  );
}
