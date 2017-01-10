import React, { Component, Children, cloneElement } from 'react';
import Link from 'next/link';
import { SpringSystem } from 'rebound';
import ThenLink from '../ThenLink';

export default class ScrollLink extends Component {
  constructor(props) {
    super(props);
    this.state = { node: null };
  }

  componentDidMount() { this.onMount(); }

  onClick = (e): any => {
    e.preventDefault();
    this.props.onClick();
    if (!this.spring) return null;

    const body = document.scrollingElement || document.documentElement;
    const { node } = this.state;

    const startPos = body.scrollTop;
    const endPos = node.offsetTop;
    const diff = endPos - startPos;

    const scrollTo = (val) => {
      const newPos = Math.round(startPos + (diff * val));
      body.scrollTop = newPos;

      if (this.spring.isAtRest()) {
        this.spring.removeAllListeners();
        this.spring.setEndValue(0);
      }
    };

    this.spring.addListener({
      onSpringUpdate: (spring) => {
        const val = spring.getCurrentValue();
        scrollTo(val);

        if (this.spring.isAtRest()) {
          this.spring.removeAllListeners();
          this.spring.setEndValue(0);
        }
      },
    });

    return this.spring.setEndValue(1);
  }

  onMount = () => {
    const { to } = this.props;
    let node = null;

    if (to) {
      const id = to.replace(/^(#)/, '');
      node = document.getElementById(id);
    }

    return this.setState({ node }, this.initSpring);
  }

  initSpring = () => {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring(10, 4);
  }

  render() {
    const { to, children, transition } = this.props;

    if (this.props.href) {
      return (
        <ThenLink href={this.props.href} transition={transition}>{children}</ThenLink>
      );
    }

    const childrenMap = Children.map(children, (child) => {
      const props = { onClick: this.onClick };
      const { href, ...childProps } = child.props;
      const isAnchor = child && child.type === 'a';

      if (!isAnchor || !href) props.href = `/${to}`;
      if (isAnchor) return cloneElement(child, props);

      return <a {...props} {...childProps}>{child}</a>;
    });

    return childrenMap[0];
  }
}
