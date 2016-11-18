/* eslint-disable no-use-before-define */

import React from 'react';
import css from 'next/css';

import ScrollLink from '../ScrollLink';
import * as vars from '../../styles/variables';

export default ({ showNav = true, onClick = () => {}, items = [] }) => {
  const routes = items.map((item) => (
    <li key={item.title} className={styles.navItem}>
      <ScrollLink className={styles.navItemLink} to={item.to} href={item.href} onClick={onClick}>
        {item.title}
      </ScrollLink>
    </li>
  ));

  return (
    <nav className={css.merge(styles.nav, showNav ? styles.showNav : null)}>
      <ul className={css(styles.navList)}>
        {routes}
      </ul>
      <div className={styles.showNavBtnContainer}>
        <button className={styles.showNavBtn} onClick={onClick}>
          <div className={styles.showNavIcon} />
        </button>
      </div>
    </nav>
  );
};


const shared = {
  position: 'absolute',
  width: '1rem',
  height: '1px',
  background: 'currentColor',
};

const styles = {
  nav: css.merge(
    {
      width: `calc(100% - ${vars.border.width} * 2)`,
      position: 'fixed',
      top: `calc(-145px + ${vars.border.width})`,
      left: vars.border.width,
      paddingTop: vars.border.width,
      fontFamily: vars.font.family.sansSerif,
      fontSize: vars.font.size.nav.mobile,
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: vars.font.spacing.nav.mobile,
      color: vars.color.second,
      background: `url('/static/img/bg.jpg') ${vars.color.background}`,
      zIndex: 1,
      transition: 'top 0.3s ease-in-out',
    },
    css.media(vars.mediaQuery.tablet, {
      top: 0,
      paddingTop: '2rem',
      paddingBottom: '1rem',
      background: 'none',
    }),
  ),

  showNav: { top: 0 },

  navList: { padding: 0, margin: 0, listStyle: 'none' },

  navItem: css.merge(
    {
      display: 'block',
      padding: '0.25rem 0',
    },
    css.before({ content: '"\\2022"', margin: 'auto 0.75rem' }),
    css.after({ content: '"\\2022"', margin: 'auto 0.75rem' }),
    css.media(vars.mediaQuery.tablet, css.merge(
      { display: 'inline-block', marginRight: '1rem' },
      css.before({ margin: 0, marginRight: '1rem' }),
      css.after({ content: '""', margin: 0 }),
      { '&:last-child::after': { content: '"\\2022"', marginLeft: '1rem' } },
    )),
  ),

  navItemLink: css.merge(
    {
      position: 'relative',
      color: vars.color.second,
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
    css.after({
      content: '""',
      position: 'absolute',
      top: '150%',
      left: 0,
      width: '100%',
      height: '2px',
      background: vars.color.second,
      opacity: 0,
      transition: 'all 0.3s',
    }),
    css.hover({ color: vars.color.secondHover }),
    { '&:hover::after': { top: '110%', background: vars.color.secondHover, opacity: 1 } },
  ),

  showNavBtnContainer: css.merge(
    { background: vars.color.main },
    css.media(vars.mediaQuery.tablet, { display: 'none' }),
  ),

  showNavBtn: css.merge({
    display: 'block',
    width: '1rem',
    height: '1rem',
    margin: '0.5rem auto 0',
    padding: 0,
    border: 'none',
    background: 'none',
    outline: 'none',
  }),

  showNavIcon: css.merge(
    { color: vars.color.second, ...shared },
    css.before({ content: '""', left: 0, top: '-0.25rem', ...shared }),
    css.after({ content: '""', left: 0, top: '0.25rem', ...shared }),
  ),
};

// .menuIcon,
// .menuIcon::before,
// .menuIcon::after {
//   position: absolute;
//   width: 1rem;
//   height: 1px;
//   background-color: currentColor;
// }
//
// .menuIcon {
//   color: $color-second;
//
//   &::before,
//   &::after {
//     content: '';
//     left: 0;
//   }
//
//   &::before {
//     top: -0.25rem;
//   }
//
//   &::after {
//     top: 0.25rem;
//   }
// }
