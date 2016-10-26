import React from 'react';
import { render } from 'react-dom';

import './styles.scss';

import Menu from './components/Menu';
import App from './components/App';

render(
  <div className="container">
    <Menu />
    <App />
  </div>,
  document.getElementById('root')
);
