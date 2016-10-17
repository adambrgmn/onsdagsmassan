import 'intersection-observer';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match } from 'react-router';

import Menu from './components/Menu';
import routes from './routes';

import bg from './img/bg.jpg';
import './index.css';

const basename = process.env.NODE_ENV !== 'production' ? undefined : '/onsdagsmassan';

ReactDOM.render(
  <BrowserRouter basename={basename}>
    <div className="container" style={{ backgroundImage: `url(${bg})`}}>
      <Menu />
      {routes.map((route, i) => <Match key={i} {...route} />)}
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
