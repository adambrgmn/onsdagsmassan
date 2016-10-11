import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match } from 'react-router';

import routes from './routes';
import Menu from './components/Menu';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <div className="container">
      <Menu />
      {routes.map((route, i) => (
        <Match key={i} {...route} />
      ))}
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
