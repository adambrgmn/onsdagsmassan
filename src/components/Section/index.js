// @flow

import React from 'react';
import classNames from 'classnames';

import s from './styles.scss';

import SectionText from '../SectionText';
import SectionSidebar from '../SectionSidebar';

type Content = {
  title: string;
  uri: string;
  body: string;
  layout: { reverse: boolean };
}

type Props = {
  pathname: string;
  content: Content;
}

export default function Section({ content, pathname }: Props) {
  const sectionName = pathname.replace('/', '');
  const cx = {
    [s.section]: true,
    [`section-${sectionName}`]: true,
  };

  return (
    <div id={sectionName} className={classNames(cx)}>
      <SectionSidebar uri={content.uri} reverse={content.layout.reverse} />
      <SectionText title={content.title} body={content.body} />
    </div>
  );
}
