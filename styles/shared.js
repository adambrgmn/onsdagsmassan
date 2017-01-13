import css, { merge, media, keyframes, select as $ } from 'next/css';
import { color, mediaQuery } from './variables';

export const responsiveImg = css({
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
});

export const uppercase = css({ textTransform: 'uppercase' });
export const italic = css({ fontStyle: 'italic' });

export const fadeIn = keyframes('fadeIn', {
  '0%': { opacity: 0, transform: 'translateX(-10%)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

export const grid = (reverse) => merge(
  {
    display: 'flex',
    flexFlow: `${reverse ? 'row-reverse' : 'row'} wrap`,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: '1rem',
    minHeight: '100vh',
    width: '100%',
    color: color.body,
  },
  media(mediaQuery.tablet, { minHeight: '110vh' }),
);

export const gridItem = merge(
  { width: '100%', margin: '1rem', transition: 'opacity 1s, transform 1s', animation: `${fadeIn} 1s` },
  media(mediaQuery.tablet, { width: '45%' }),
  media(mediaQuery.desktop, { width: '30%' }),
  $('.inTransition &', { opacity: 0 }),
  $('.inTransition &:first-child', { transform: 'translateX(10%)' }),
  $('.inTransition &:last-child', { transform: 'translateX(-10%)' }),
);
