// @flow

import React from 'react';
import ReactMarkdown from 'react-markdown';

import s from './styles.scss';

type Props = {
  title: string;
  body: string;
  showMore?: (e: SyntheticEvent) => void;
}

export default function SectionText({ title, body, showMore }: Props) {
  return (
    <div className={s.sectionTextContent}>
      <h2>{title}</h2>
      <ReactMarkdown source={body} />
      {showMore ?
        <button onClick={showMore} type="button" className={s.sectionShowButton}>Läs mer ...</button> :
        null
      }
    </div>
  );
}
