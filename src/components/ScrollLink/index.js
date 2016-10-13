import React, { Component } from 'react';
import { Link } from 'react-router';
import { SpringSystem } from 'rebound';

export default class ScrollLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRelativeLink: this.props.to.indexOf('/') > -1,
    };

    this.onClick = this._onClick.bind(this);
    this.initSpring = this._initSpring.bind(this);
  }

  componentDidMount() {
    const { to } = this.props;
    const { isRelativeLink } = this.state;

    if (isRelativeLink) return this.setState({ node: undefined });

    const id = to.replace(/^(#)/, '');
    const node = document.getElementById(id) || { offsetTop: 0 };

    return this.setState({ node }, this.initSpring);
  }

  _initSpring() {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring(10, 4);
  }

  _onClick(e) {
    e.preventDefault();
    if (!this.spring) return null;

    const { body } = document;
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
      }
    });

    return this.spring.setEndValue(1);
  }

  render() {
    const { to, className } = this.props;
    const { isRelativeLink } = this.state;

    if (isRelativeLink) {
      return (
        <Link
          className={className}
          to={to}
        >
          {this.props.children}
        </Link>
      );
    }

    return (
      <a
        className={this.props.className}
        href={to}
        onClick={this.onClick}
      >
        {this.props.children}
      </a>
    );
  }
}
