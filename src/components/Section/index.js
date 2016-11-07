// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import getContent from '../../lib/getContent';

import s from './styles.scss';

import SectionText from '../SectionText';
import SectionSidebar from '../SectionSidebar';


type Props = {
  sectionName: string;
  reverse: boolean;
}

type State = {
  body: string;
  title: string;
  excerpt: string;
  uri?: string;
  showExcerpt: boolean;
}

export default class Section extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { body: '', title: '', excerpt: '', showExcerpt: false };
  }

  componentDidMount(): void { this.fetchContent(); }

  fetchContent = (): void => {
    getContent(this.props.sectionName)
      .then(({ body, title, uri }) => {
        let showExcerpt = false;
        const splitBody = body.split('\n\n');
        const excerpt = splitBody
          .slice(0, 5)
          .join('\n\n');

        if (splitBody.length > 5) showExcerpt = true;

        this.setState({ body, title, uri, excerpt, showExcerpt });
      })
      .catch(console.error);
  }

  onShowMoreClick = (e: SyntheticEvent): void => {
    e.preventDefault();
    this.setState({ showExcerpt: !this.state.showExcerpt });
  }

  render() {
    const { sectionName, reverse } = this.props;
    const { body, title, uri, excerpt, showExcerpt } = this.state;
    const cx = {
      [s.section]: true,
      [`section-${sectionName}`]: true,
    };

    return (
      <div id={sectionName} className={classNames(cx)}>
        <SectionSidebar uri={uri} reverse={reverse} />
        <SectionText
          title={title}
          body={showExcerpt ? excerpt : body}
          showMore={showExcerpt ? this.onShowMoreClick : undefined}
        />
      </div>
    );
  }
}
