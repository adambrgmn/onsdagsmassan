// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import getContent from '../../lib/getContent';

import s from './styles.scss';

import SectionText from '../SectionText';
import SectionSidebar from '../SectionSidebar';
import ScrollLink from '../ScrollLink';


type Props = {
  sectionName: string;
  reverse: boolean;
}

type State = {
  body: string;
  title: string;
  uri?: string;
  showExcerpt: boolean;
  needExcerpt: boolean;
}

export default class Section extends Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      body: '',
      title: '',
      excerpt: '',
      showExcerpt: false,
      needExcerpt: false,
    };
  }

  componentDidMount(): void { this.fetchContent(); }

  fetchContent = (): void => {
    getContent(this.props.sectionName)
      .then(({ body, title, uri }) => {
        const splitBody = body.split('\n\n');
        const needExcerpt = splitBody.length > 5;

        this.setState({ body, title, uri, needExcerpt });
      })
      .catch(console.error);
  }

  onShowMoreClick = (): void => this.setState({ showExcerpt: !this.state.showExcerpt });

  showMoreButton = (): React$Element<*> => {
    const { showExcerpt } = this.state;
    const { sectionName } = this.props;

    return (
      <ScrollLink
        onClick={this.onShowMoreClick}
        className={s.sectionShowButton}
        to={sectionName}
      >
        {showExcerpt ? 'Göm ↑' : 'Läs mer ↓'}
      </ScrollLink>
    );
  }

  render() {
    const { sectionName, reverse } = this.props;
    const { body, title, uri, showExcerpt, needExcerpt } = this.state;

    const cxContainer = {
      [s.section]: true,
      [`section-${sectionName}`]: true,
    };

    const cxSectionText = {
      [s.textContainer]: true,
      [s.textContainerExcerpt]: !showExcerpt,
    };

    return (
      <div id={sectionName} className={classNames(cxContainer)}>
        <SectionSidebar uri={uri} reverse={reverse} />
        <SectionText
          title={title}
          body={body}
          textContainerClass={classNames(cxSectionText)}
          showMoreButton={needExcerpt ? this.showMoreButton : undefined}
        />
      </div>
    );
  }
}
