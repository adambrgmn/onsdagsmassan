import React from 'react';
import { Link } from 'react-router';
import routes from '../../routes';

import './styles.css';

export default () => {
  const items = routes.map((item, i) => (
    <li key={i} className="navigation-item">
      <Link className="navigation-link" to={item.pattern}>{item.title}</Link>
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
