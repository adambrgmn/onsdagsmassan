import React from 'react';
import classNames from 'classnames';

import image from '../../img/akvarell-0.png';
import s from './styles.scss';

export default () => (
  <header className={s.header}>
    <div className={s.headerImgContainer}>
      <img className={s.headerImg} src={image} alt="Bild av akvarell" />
    </div>
    <h1 className={s.title}>Onsdagsmässan</h1>
    <h2 className={classNames([s.subtitle])}>Varje onsdag kl 19.30</h2>
    <h2 className={classNames([s.subtitle])}>
      <span className="italic">St</span> <span className="uppercase">Andrew&apos;s Church</span>
    </h2>
  </header>
);
