import React from 'react';

import image from '../../img/akvarell-0.png';
import './styles.css';

export default () => (
    <header className="header">
      <img className="header-img" src={image} alt="Bild av akvarell" />
      <h1 className="title">Onsdagsmässan</h1>
      <h2 className="subtitle time">Varje onsdag kl 19.30</h2>
      <h2 className="subtitle place">
        <span className="italic">St</span> <span className="uppercase">Andrew's Church</span>
      </h2>
    </header>
  );
