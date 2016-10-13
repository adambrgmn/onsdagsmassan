import React from 'react';
import getContent from '../../lib/getContent';

import Home from '../Home';
import { SectionReveal } from '../Section';

export default () => {
  const aktuellt = getContent('/aktuellt');
  const information = getContent('/information');
  const musik = getContent('/musik');

  return (
    <div>
      <Home />
      <SectionReveal content={aktuellt} pathname="/aktuellt" />
      <SectionReveal content={information} pathname="/information" />
      <SectionReveal content={musik} pathname="/musik" />
    </div>
  )
};
