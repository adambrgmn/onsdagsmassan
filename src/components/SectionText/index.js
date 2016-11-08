// @flow

import React from 'react';
import ReactMarkdown from 'react-markdown';

import s from './styles.scss';

type Props = {
  title: string;
  body: string;
  textContainerClass?: string;
  showMoreButton?: () => React$Element<*>;
}

export default function SectionText({
  title,
  body,
  textContainerClass,
  showMoreButton,
}: Props) {
  return (
    <div className={s.sectionTextContent}>
      <h2>{title}</h2>
      <ReactMarkdown className={textContainerClass} source={body} />
      {showMoreButton ? showMoreButton() : null}
    </div>
  );
}
