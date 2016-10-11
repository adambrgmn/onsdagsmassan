import React from 'react';
import convert from 'convert-rich-text';
import { Parser } from 'html-to-react';

const deltaToHtml = (delta) => {
  const formats = {
    firstHeader: { type: 'line', tag: 'h1' },
    secondHeader: { type: 'line', tag: 'h2' },
    bold: { tag: 'strong' },
    italic: { tag: 'em' },
  };

  const options = {
    blockTag: 'p',
    inlineTag: 'span',
  };

  const html = convert(delta, formats, options);

  return `<div class="text-content">${html}</div>`;
};

export default (delta) => {
  const htmlString = deltaToHtml(delta);
  const htmlParser = new Parser(React);
  const component = htmlParser.parse(htmlString);

  return component;
};
