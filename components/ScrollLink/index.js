import React, { Component } from 'react';
import Link from 'next/link';
import { SpringSystem } from 'rebound';

export default class ScrollLink extends Component {
  constructor(props) {
    super(props);
    this.state = { node: { offsetTop: 0 } };
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

    let node = { offsetTop: 0 };

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
    const { href, children } = this.props;

    if (href) {
      return (
        <Link href={href}>{children}</Link>
      );
    }

    return (
      <a href={href} onClick={this.onClick}>
        {children}
      </a>
    );
  }
}

// const children = Children.map(this.props.children, (child) => {
//       const props = {
//         onClick: this.linkClicked
//       }
//
//       const isAnchor = child && child.type === 'a'
//
//       // if child does not specify a href, specify it
//       // so that repetition is not needed by the user
//       if (!isAnchor || !('href' in child.props)) {
//         props.href = this.props.href
//       }
//
//       if (isAnchor) {
//         return React.cloneElement(child, props)
//       } else {
//         return <a {...props}>{child}</a>
//       }
//     })
//
//     return children[0]
//   }
