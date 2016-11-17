import css, { merge, media } from 'next/css';
import { color, mediaQuery } from './variables';

export const responsiveImg = css({
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
});

export const uppercase = css({ textTransform: 'uppercase' });
export const italic = css({ fontStyle: 'italic' });

export const grid = (reverse) => css({
  display: 'flex',
  flexFlow: `${reverse ? 'row-reverse' : 'row'} wrap`,
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  padding: '1rem',
  minHeight: '100vh',
  width: '100%',
  color: color.main,
});

export const gridItem = merge(
  { width: '100%', margin: '1rem' },
  media(mediaQuery.tablet, { width: '45%' }),
  media(mediaQuery.desktop, { width: '35%' }),
);
