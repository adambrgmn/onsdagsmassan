// @flow

import React, { Component } from 'react';
import getContent from '../../lib/getContent';

import Menu from '../Menu';
import Home from '../Home';
import Footer from '../Footer';
import Section from '../Section';

type SectionContent = {
  title: string;
  body: string;
  uri: string;
}

type Route = {
  path: string;
  title: string;
}

type State = {
  sections: SectionContent[];
  routes: Route[];
};

export default class App extends Component {
  state: State;
  props: {};

  constructor(props: {}) {
    super(props);

    this.state = {
      sections: [],
      routes: [{
        path: '',
        title: 'Hem',
      }],
    };
  }

  componentDidMount(): void {
    this.fetchContent();
  }

  fetchContent = (): void => {
    const sections = ['aktuellt', 'information', 'musik'];
    const promises = sections.map((section) => getContent(section));

    Promise.all(promises)
      .then((sectionsContent) => {
        const sortedSectionsContent = sectionsContent
          .sort((currSection, prevSection) => (currSection.title < prevSection.title ? 0 : 1));

        sortedSectionsContent.forEach((sectionContent) => {
          const section = sectionContent;
          const route = {
            path: sectionContent.title.toLowerCase(),
            title: sectionContent.title,
          };

          this.setState(() => ({
            sections: [...this.state.sections, section],
            routes: [...this.state.routes, route],
          }));
        });
      });
  }

  render() {
    const { routes, sections } = this.state;

    return (
      <div className="container">
        <Menu routes={routes} />
        <Home />
        {sections.map((section, index) => {
          let reverse = false;
          if (index % 2) reverse = true;

          return (
            <Section
              key={section.title}
              content={section}
              sectionName={section.title.toLowerCase()}
              reverse={reverse}
            />
          );
        })}
        <Footer />
      </div>
    );
  }
}
