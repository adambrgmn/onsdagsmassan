import { media } from '../../styles/variables';

export const aboveTablet = () => {
  if (window) return window.innerWidth >= media.tablet;
  return false;
};

export const aboveDesktop = () => {
  if (window) return window.innerWidth >= media.desktop;
  return false;
};
