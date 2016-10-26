import React from 'react';
import { render } from 'react-dom';

import './styles.scss';
import bg from './img/bg.jpg';

import Menu from './components/Menu';
import App from './components/App';

render(
  <div className="container" style={{ backgroundImage: `url(${bg})` }}>
    <Menu />
    <App />
  </div>,
  document.getElementById('root')
);
