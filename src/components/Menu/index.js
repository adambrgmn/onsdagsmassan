import React from 'react';

import ScrollLink from '../ScrollLink';

export default () => {
  const routes = [
    { path: '', title: 'Hem' },
    { path: 'aktuellt', title: 'Aktuellt' },
    { path: 'information', title: 'information' },
    { path: 'musik', title: 'Musik' },
  ];

  const items = routes.map((item, i) => (
    <li key={i}>
      <ScrollLink to={item.path}>{item.title}</ScrollLink>
    </li>
  ));

  return (
    <nav>
      <ul>
        {items}
      </ul>
    </nav>
  );
};
