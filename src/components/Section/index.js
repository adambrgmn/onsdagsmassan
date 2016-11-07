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
}

type Props = {
  sectionName: string;
  content: Content;
  reverse: boolean;
}

export default function Section(props: Props) {
  const { sectionName, reverse } = props;

  const cx = {
    [s.section]: true,
    [`section-${sectionName}`]: true,
  };

  return (
    <div id={sectionName} className={classNames(cx)}>
      <SectionSidebar uri={props.content.uri} reverse={reverse} />
      <SectionText title={props.content.title} body={props.content.body} />
    </div>
  );
}
