export const font = {
  base: '16px',
  size: {
    title: {
      mobile: '1.5rem',
      tablet: '3rem',
      desktop: '3.5rem',
    },
    subtitle: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '1.75rem',
    },
    sectionTitle: { mobile: '1rem' },
    sectionBody: { mobile: '1rem' },
    nav: { mobile: '1rem' },
  },
  spacing: {
    title: {
      mobile: '5px',
      tablet: '12px',
    },
    subtitle: { mobile: '3px' },
    nav: { mobile: '2px' },
  },
  family: {
    sansSerif: '"Gill Sans", "Cabin", "sans-serif"',
    serif: '"EB Garamond", "serif"',
  },
};

export const color = {
  main: 'rgba(156, 188, 207, 1)',
  body: 'rgba(120, 163, 188, 1)',
  second: 'rgba(220, 111, 95, 1)',
  background: 'rgba(225, 227, 232, 1)',
  secondHover: 'rgba(174, 57, 42, 1)',
};

export const border = { width: '0.8rem' };

export const media = {
  tablet: 768,
  desktop: 1024,
};

export const mediaQuery = {
  tablet: `(min-width: ${media.tablet}px)`,
  desktop: `(min-width: ${media.desktop}px)`,
};
