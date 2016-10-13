import React, { Component } from 'react';
import { Link } from 'react-router';

const requestAnimationFrame = (callback) => {
  const animationFrameFallback = (cb) => setTimeout(cb, 1000 / 60)

  return window.requestAnimationFrame(callback) ||
    window.webkitRequestAnimationFrame(callback) ||
    window.mozRequestAnimationFrame(callback) ||
    window.msRequestAnimationFrame(callback) ||
    window.oRequestAnimationFrame(callback) ||
    animationFrameFallback(callback);
}

export default class ScrollLink extends Component {
  constructor(props) {
    super(props);
    this.state = { node: undefined };

    this.onClick = this._onClick.bind(this);
    this.scrollTo = this._scrollTo.bind(this);
  }

  componentDidMount() {
    const { to } = this.props;

    if (to.indexOf('/') > -1) return this.setState({ node: undefined });

    const id = to.replace(/^(#)/, '');
    const node = document.getElementById(id);

    if (node) return this.setState({ node });
    return this.setState({ node: { offsetTop: 0 } });
  }

  _scrollTo(to, duration) {
    const startPoint = document.body.scrollTop;
    const distance = to - startPoint;
    const startTime = Date.now();
    const endTime = startTime + duration;

    const smoothStep = (start, end, now) => {
      const x = (now - start) / (end - start);
      return x * x * (3 - 2 * x);
    };

    const scrollFrame = () => {
      const now = Date.now();
      if (now > endTime) return null;

      const pointToGo = Math.round(startPoint + (distance * smoothStep(startTime, endTime, now)));
      document.body.scrollTop = pointToGo;

      return requestAnimationFrame(scrollFrame);
    };

    return requestAnimationFrame(scrollFrame);
  }

  _onClick(e) {
    e.preventDefault();
    if (this.state.node) this.scrollTo(this.state.node.offsetTop, 500);
  }

  render() {
    if (this.state.node) {
      return (
        <a className={this.props.className} href={this.props.to} onClick={this.onClick}>
          {this.props.children}
        </a>
      )
    }

    return (
      <Link className={this.props.className} to={this.props.to}>
        {this.props.children}
      </Link>
    );
  }
}
