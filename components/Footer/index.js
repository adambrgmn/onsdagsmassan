/* eslint-disable no-use-before-define */

import React from 'react';
import { merge, media } from 'next/css';

import { Italic, Uppercase } from '../TextComp';
import { color, mediaQuery } from '../../styles/variables';

export default () => (
  <footer className={styles.footer}>
    <Uppercase>Onsdagsm&auml;ssan</Uppercase>
    <div className={styles.footerSvgContainer}>
      <svg viewBox="0 0 50 78" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.85 26.24c-.72-2.28-2.52-3.36-4.8-3-.72.36-1.44.36-1.8.72-4.08.36-7.8.24-11.88-.12-1.08 0-2.28.36-3 0-.72-1.08-1.8-2.64-1.44-4.08.36-.72.36-1.92.36-2.64 0-.72 0-1.44.12-2.16 0-3.36 1.08-7.08 0-10.44 0-.36.36-.36.36-.72-.36-.36-1.08-.72-1.08-1.44v-.72c-.72-.48-1.08-1.56-1.8-1.56-1.2.36-3 1.08-3.36 2.52-.36 1.56-.72 2.64-.36 4.08.36.84.24 1.92.24 2.64-1.08 4.08.36 7.8 0 11.88-.84 4.08-6 2.16-8.88 2.52-3.36.72-6.36.72-9.36 1.8-.72 0-1.8.72-2.16 1.8-.48 1.44-.12 3.36 1.44 4.08 2.16.36 4.44 0 6.6.12 1.56-1.56 3.72-1.2 5.64-.72.36 0 1.08.72 1.44.72 1.44 0 3.36 0 4.44 1.08 1.8 2.64.72 6 1.44 9.36.36.72 0 1.8 0 2.52-.48 2.64-.84 5.64.24 8.16-1.44 3.72 0 7.08 0 10.8-.48 1.44-.84 2.52-.84 4.08.36 1.08.36 2.16.36 3.24-.72 1.56-1.08 3.36-.36 4.92.72 1.08 2.16 1.44 3.24 1.8 2.64.72 3.36-1.8 4.08-3.6.48-1.56-.72-2.64.12-4.08.72-2.64-1.08-5.64-.36-8.16 0-.84-.72-1.56-.72-2.28 0-5.52-.24-10.68.48-16.32 0-3.72-1.44-7.8.48-11.4.72-1.56 3-1.92 4.8-1.44 5.16 1.08 9.96 0 14.88 0 .72-1.08 1.8-2.16 1.44-3.96z" />
      </svg>
    </div>
    <span><Italic>St </Italic><Uppercase>Andrew&apos;s Church</Uppercase></span>
  </footer>
);

const styles = {
  footer: merge(
    {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 0 3rem',
      color: color.second,
      fill: color.second,
      letterSpacing: '2px',
    },
  ),

  footerSvgContainer: merge(
    { width: '100%', padding: '1rem 5rem' },
    media(mediaQuery.tablet, { width: '10%', padding: 0, margin: '0 2rem' }),
    media(mediaQuery.desktop, { width: '3%' }),
  ),
};
