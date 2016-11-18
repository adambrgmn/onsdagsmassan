/* eslint-disable no-use-before-define */

import React from 'react';
import Link from 'next/link';
import { merge, media, after } from 'next/css';
import { color, mediaQuery, font } from '../../styles/variables';

export default ({ href }) => <Link href={href}><a {...styles}>Läs mer</a></Link>;

const styles = merge(
  {
    position: 'relative',
    color: color.main,
    fontFamily: font.family.sansSerif,
    textDecoration: 'none',
  },
  after({
    content: '"\\2192"',
    position: 'absolute',
    top: '0px',
    left: '110%',
  }),
  media(mediaQuery.desktop, merge(
    after({ opacity: 0, left: '90%', transition: 'opacity 0.3s, left 0.3s' }),
    { '&:hover::after': { opacity: 1, left: '110%' } },
  )),
);
