import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ScrollLink extends Component {
  constructor(props) {
    super(props);
    this.state = { node: undefined };

    this.onClick = this._onClick.bind(this);
  }

  componentDidMount() {
    const { to } = this.props;

    if (to.indexOf('/') > -1) return this.setState({ node: undefined });

    const id = to.replace(/^(#)/, '');
    const node = document.getElementById(id);

    if (node) return this.setState({ node });
    return this.setState({ node: { offsetTop: 0 } });
  }

  scrollTo(to, duration) {
    const scrollFallback = (cb) => setTimeout(cb, 1000 / 60);
    const scroll = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      scrollFallback;

    const from = document.body.scrollTop;
    const distanceToScroll = to - from;
    const isNegativeScroll = distanceToScroll < 0;
    const step = Math.round(distanceToScroll / (duration / 60));

    const scrollWindow = () => {
      const currentPos = document.body.scrollTop;
      if (
        (isNegativeScroll && currentPos <= to) ||
        (!isNegativeScroll && currentPos >= to)
      ) {
        return false;
      }

      document.body.scrollTop = currentPos + step;
      return scroll(scrollWindow);
    };

    scrollWindow();
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
