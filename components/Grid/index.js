import React from 'react';
import { merge } from 'next/css';

import { grid, gridItem } from '../../styles/shared';

export default ({ id, className, reverse, children }) => (
  <div id={id} {...merge(grid(reverse), className)}>{children}</div>
);

export const GridItem = ({ children }) => (
  <div {...gridItem}>{children}</div>
);
