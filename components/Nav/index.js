/* eslint-disable no-use-before-define */

import React from 'react';
import { merge, media, before, after, hover } from 'next/css';

import ScrollLink from '../ScrollLink';
import * as vars from '../../styles/variables';

export default ({ showNav = true, onClick = () => {}, items = [] }) => {
  const routes = items.map((item) => (
    <li key={item.title} className={styles.navItem}>
      <ScrollLink to={item.to} href={item.href} onClick={onClick}>
        {item.title}
      </ScrollLink>
    </li>
  ));

  return (
    <nav {...merge(styles.nav, showNav ? styles.showNav : null)}>
      <ul {...styles.navList}>
        {routes}
      </ul>
      <div {...styles.showNavBtnContainer}>
        <button {...styles.showNavBtn} onClick={onClick}>
          <div {...styles.showNavIcon} />
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
  nav: merge(
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
    media(vars.mediaQuery.tablet, {
      top: 0,
      paddingTop: '2rem',
      paddingBottom: '1rem',
      background: 'none',
    }),
  ),

  showNav: merge({ top: 0 }),

  navList: merge({ padding: 0, margin: 0, listStyle: 'none' }),

  navItem: merge(
    {
      display: 'block',
      padding: '0.25rem 0',
    },
    before({ content: '"\\2022"', margin: 'auto 0.75rem' }),
    after({ content: '"\\2022"', margin: 'auto 0.75rem' }),
    media(vars.mediaQuery.tablet, merge(
      { display: 'inline-block', marginRight: '1rem' },
      before({ margin: 0, marginRight: '1rem' }),
      after({ content: '""', margin: 0 }),
      { '&:last-child::after': { content: '"\\2022"', marginLeft: '1rem' } },
    )),
  ),

  navItemLink: merge(
    {
      position: 'relative',
      color: vars.color.second,
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
    after({
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
    hover({ color: vars.color.secondHover }),
    { '&:hover::after': { top: '110%', background: vars.color.secondHover, opacity: 1 } },
  ),

  showNavBtnContainer: merge(
    { background: vars.color.main },
    media(vars.mediaQuery.tablet, { display: 'none' }),
  ),

  showNavBtn: merge({
    display: 'block',
    width: '1rem',
    height: '1rem',
    margin: '0.5rem auto 0',
    padding: 0,
    border: 'none',
    background: 'none',
    outline: 'none',
  }),

  showNavIcon: merge(
    { color: vars.color.second, ...shared },
    before({ content: '""', left: 0, top: '-0.25rem', ...shared }),
    after({ content: '""', left: 0, top: '0.25rem', ...shared }),
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
