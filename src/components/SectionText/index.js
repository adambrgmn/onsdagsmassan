// @flow

import React from 'react';
import ReactMarkdown from 'react-markdown';

import s from './styles.scss';

type Props = {
  title: string;
  body: string;
}

export default function SectionText({ title, body }: Props) {
  return (
    <div className={s.sectionTextContent}>
      <h2>{title}</h2>
      <ReactMarkdown source={body} />
    </div>
  );
}
