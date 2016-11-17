import React from 'react';
import { merge } from 'next/css';

import { grid, gridItem } from '../../styles/shared';

export default ({ id, className, reverse, children }) => (
  <div id={id} className={merge(grid(reverse), className)}>{children}</div>
);

export const GridItem = ({ className, children }) => (
  <div className={merge(gridItem, className)}>{children}</div>
);
