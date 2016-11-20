import React, { Component } from 'react';
import { aboveTablet } from '../../utils/mediaQuery';

const registerEventListener = (fn) => {
  window.addEventListener('scroll', fn);
  return () => window.removeEventListener('scroll', fn);
};

export default class SlowScroll extends Component {
  constructor(props) {
    super(props);
    this.state = { windowHeight: 0, error: false, translate: 0 };
    this.ref = null;
    this.parent = null;
  }

  componentDidMount() {
    const { ignoreMobile } = this.props;
    const { error } = this.state;

    if ((aboveTablet() || ignoreMobile) && !error) {
      this.onMount();
      this.unregisterEventListener = registerEventListener(this.onScroll);
    }
  }

  componentWillUnmount() {
    if ('unregisterEventListener' in this) this.unregisterEventListener();
  }

  onMount = () => this.setState({ windowHeight: window.innerHeight })

  onScroll = () => {
    const translateY = (val) => (this.ref.style.transform = `translateY(${val}%)`);
    const { windowHeight } = this.state;
    const { maxTranslate } = this.props;
    const parentRect = this.parent.getBoundingClientRect();

    const slowScroll = () => {
      const distanceFromTop = parentRect.top / windowHeight;
      translateY(-maxTranslate * distanceFromTop);
    };

    if (parentRect.top > windowHeight || parentRect.bottom < 0) return null;
    return window.requestAnimationFrame(slowScroll);
  }

  setRef = (ref) => {
    try {
      this.ref = ref;
      this.parent = ref.parentNode.parentNode;
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { className, children } = this.props;
    return (<div {...className} ref={this.setRef}>{children}</div>);
  }
}
