import React from 'react';

import ScrollLink from '../ScrollLink';
import './styles.css';

export default (props) => {
  const routes = [
    { path: '/', title: 'Hem' },
    { path: '/aktuellt', title: 'Aktuellt' },
    { path: '/information', title: 'information' },
    { path: '/musik', title: 'Musik' },
  ];

  const items = routes.map((item, i) => (
    <li key={i} className="navigation-item">
      <ScrollLink className="navigation-link" to={item.path}>{item.title}</ScrollLink>
    </li>
  ));

  return (
    <nav className="menu">
      <ul className="navigation">
        {items}
      </ul>
    </nav>
  );
};
