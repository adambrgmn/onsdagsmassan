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

  scrollTo(to, time) {
    const start = new Date().getTime();
    const from = document.body.scrollTop;

    const timer = setInterval(() => {
      const step = Math.min(1, (new Date().getTime() - start) / time);
      document.body.scrollTop = (from + step * (to - from));

      if (step === 1) clearInterval(timer);
    }, 25);
  }

  _onClick(e) {
    e.preventDefault();

    const { node } = this.state;
    if (node) {
      this.scrollTo(
        node.offsetTop,
        500
      );
    }
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
