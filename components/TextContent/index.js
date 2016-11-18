/* eslint-disable no-use-before-define */

import React from 'react';
import ReactMarkdown from 'react-markdown';

export default ({ source, className }) => (
  <div {...className}>
    <ReactMarkdown source={source} skipHtml />
  </div>
);

export const Excerpt = ({ source, readMoreLink, className }) => {
  const exc = source
    .split('\n\n')
    .slice(0, 4)
    .join('\n\n');

  return (
    <div {...className}>
      <ReactMarkdown source={exc} skipHtml />
      {readMoreLink}
    </div>
  );
};
