import React from 'react';

import image from '../../img/akvarell-0.png';

export default () => (
  <header>
    <img src={image} alt="Bild av akvarell" />
    <h1>Onsdagsmässan</h1>
    <h2>Varje onsdag kl 19.30</h2>
    <h2>
      <span>St</span> <span>Andrew&apos;s Church</span>
    </h2>
  </header>
);
