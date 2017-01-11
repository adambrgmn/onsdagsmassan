/* eslint-disable no-use-before-define */

import React from 'react';
import { merge, media, before, after, hover, keyframes, select as $ } from 'next/css';

import ScrollLink from '../ScrollLink';
import * as vars from '../../styles/variables';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navHeight: 500,
    };
  }

  componentDidMount() {
    this.onMount();
  }

  onMount = () => {
    const { height } = this.container.getBoundingClientRect();
    this.setState({ navHeight: height });
  }

  render() {
    const { showNav, onClick, items, transition } = this.props;
    const { navHeight } = this.state;

    const routes = items.map((item) => (
      <li key={item.title} className={styles.navItem}>
        <ScrollLink to={item.to} href={item.href} onClick={onClick} transition={transition}>
          <a {...styles.navItemLink}>{item.title}</a>
        </ScrollLink>
      </li>
    ));

    return (
      <nav
        ref={ref => (this.container = ref)}
        {...merge(styles.nav(navHeight), showNav ? styles.showNav : null)}
      >
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
  }
}


const moveDown = keyframes('moveDown', { '0%': { top: '-100%' } });

const shared = {
  position: 'absolute',
  width: '1rem',
  height: '1px',
  background: 'currentColor',
};

const styles = {
  nav: (navHeight) => merge(
    {
      width: '100%',
      position: 'fixed',
      top: `calc(-${navHeight}px + 1.5rem)`,
      left: 0,
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
    media(vars.mediaQuery.tablet, merge(
      {
        top: 0,
        paddingTop: '2rem',
        paddingBottom: '1rem',
        background: 'none',
        transition: 'top 1s ease-in-out',
        animation: `${moveDown} 1s ease-in-out`,
      },
      $('.inTransition &', { top: '-100%' }),
    )),
  ),

  showNav: merge({ top: '0' }),

  navList: merge({ padding: 0, margin: 0, listStyle: 'none' }),

  navItem: merge(
    {
      display: 'block',
      padding: '0.5rem 0',
    },
    before({ content: '""', margin: 'auto 0.75rem' }),
    after({ content: '""', margin: 'auto 0.75rem' }),
    media(vars.mediaQuery.tablet, merge(
      { display: 'inline-block', marginRight: '1rem' },
      before({ content: '"\\2022"', margin: 0, marginRight: '1rem' }),
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
    { background: vars.color.main, width: '100%' },
    media(vars.mediaQuery.tablet, { display: 'none' }),
  ),

  showNavBtn: merge({
    display: 'block',
    width: '1rem',
    height: '1.5rem',
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
