import { media } from '../../styles/variables';

const windowDefined = () => typeof window !== 'undefined';
export const createMediaQuery = (query) => () => windowDefined() && window.innerWidth >= query;
export const aboveTablet = createMediaQuery(media.tablet);
export const aboveDesktop = createMediaQuery(media.desktop);
