import React from 'react';
import revealer from '../../lib/revealer';

import Home from '../Home';
import Section from '../Section';

const SectionReveal = revealer(Section, { bottom: 0.8, top: 0.8 });

export default () => (
  <div>
    <Home />
    <SectionReveal pathname="/aktuellt" />
    <SectionReveal pathname="/information" />
    <SectionReveal pathname="/musik" />
  </div>
);
