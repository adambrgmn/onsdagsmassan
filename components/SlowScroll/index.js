import React, { Component } from 'react';
import { aboveTablet } from '../../utils/mediaQuery';

export default class SlowScroll extends Component {
  constructor(props) {
    super(props);
    this.state = { windowHeight: 0 };
    this.ref = null;
    this.paretn = null;
  }

  componentDidMount() {
    if (aboveTablet()) {
      this.onMount();
      this.eventListeners(true);
    }
  }

  componentWillUnmount() {
    if (aboveTablet()) this.eventListeners(false);
  }

  eventListeners = (add) => {
    const selector = add ? 'addEventListener' : 'removeEventListener';

    window[selector]('scroll', this.onScroll);
    window[selector]('resize', this.onResize);
  }

  onMount = () => this.setState({ windowHeight: window.innerHeight })
  onResize = () => this.onMount()

  onScroll = () => {
    const translateY = (val) => () => (this.ref.style.transform = `translateY(${val}%)`);

    const { windowHeight } = this.state;
    const { maxTranslate } = this.props;
    const parentRect = this.parent.getBoundingClientRect();
    const distanceFromTop = parentRect.top / windowHeight;

    window.requestAnimationFrame(translateY(maxTranslate * distanceFromTop));
  }

  setRef = (ref) => {
    this.ref = ref;
    this.parent = ref.parentNode.parentNode;
  }

  render() {
    const { className, children } = this.props;
    return (<div className={className} ref={this.setRef}>{children}</div>);
  }
}
