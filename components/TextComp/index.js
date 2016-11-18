import React from 'react';

import { uppercase, italic } from '../../styles/shared';

const textComponentFactory = (className) => ({ children }) => (
  <span {...className}>{children}</span>
);

export const Uppercase = textComponentFactory(uppercase);
export const Italic = textComponentFactory(italic);
