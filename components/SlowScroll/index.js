import React from 'react';
import { aboveTablet } from '../../utils/mediaQuery';

export default ({ ignoreMobile, faster, center, className, children }) => {
  const cx = center ? 'rellax-center' : 'rellax';
  const speed = faster ? 2 : -2;
  const ignore = ignoreMobile && !aboveTablet();

  return (
    <div
      className={ignore ? undefined : cx}
      {...className}
      data-rellax-speed={speed}
    >
      {children}
    </div>
  );
};
