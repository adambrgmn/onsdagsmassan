import React from 'react';
import { Link } from 'react-router';

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
      <Link className="navigation-link" to={item.path}>{item.title}</Link>
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
