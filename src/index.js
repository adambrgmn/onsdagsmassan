import React from 'react';
import { render } from 'react-dom';

import Menu from './components/Menu';
import App from './components/App';

import bg from './img/bg.jpg';
import './styles.scss';

render(
  <div className="container" style={{ backgroundImage: `url(${bg})` }}>
    <Menu />
    <App />
  </div>,
  document.getElementById('root')
);
