import React, { Component, PropTypes } from 'react';
import { SpringSystem } from 'rebound';

export default class ScrollLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.onClick = this.onClick.bind(this);
    this.onMount = this.onMount.bind(this);
    this.initSpring = this.initSpring.bind(this);
  }

  componentDidMount() { this.onMount(); }

  onClick(e) {
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

  onMount() {
    const { to } = this.props;
    const { isRelativeLink } = this.state;

    if (isRelativeLink) return this.setState({ node: undefined });

    let node = { offsetTop: 0 };

    if (to) {
      const id = to.replace(/^(#)/, '');
      node = document.getElementById(id);
    }

    return this.setState({ node }, this.initSpring);
  }

  initSpring() {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring(10, 4);
  }

  render() {
    const { to, className } = this.props;

    return (
      <a
        className={className}
        href={to}
        onClick={this.onClick}
      >
        {this.props.children}
      </a>
    );
  }
}
