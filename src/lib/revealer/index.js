import React from 'react';

export default (
  Component,
  options = {}
) => {
  const defaultOptions = {
    top: 0.25,
    bottom: 0.25,
    ...options,
  };

  const isInBottomFadeArea = ({ top }, { bottom }, windowHeight) => {
    const inWindow = top < windowHeight;
    const belowBreakpoint = top > bottom;

    return inWindow && belowBreakpoint;
  };

  const isInTopFadeArea = ({ bottom }, { top }, windowHeight) => {
    const inWindow = bottom < windowHeight && bottom > -1;
    const aboveBreakpoint = bottom < top;

    return inWindow && aboveBreakpoint;
  };

  const isBetweenFadeAreas = (componentRect, breakpoints) => {
    const aboveBottom = componentRect.top < breakpoints.bottom;
    const belowTop = componentRect.bottom > breakpoints.top;

    return aboveBottom && belowTop;
  };

  class Reveal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        reveal: 0,
        betweenBreakpoints: false,
      };

      this.onScroll = this._onScroll.bind(this);
      this.setPrefs = this._setPrefs.bind(this);
    }

    componentDidMount() {
      this.setPrefs()
        .then(() => this.addEventListener());
    }

    componentWillUnmount() { this.removeEventListener(); }

    addEventListener() {
      if (window) window.addEventListener('scroll', this.onScroll);
    }

    removeEventListener() {
      if (window) window.removeEventListener('scroll', this.onScroll);
    }

    _setPrefs() {
      return new Promise((resolve) => {
        const windowHeight = window.innerHeight;
        const breakpoints = {
          top: windowHeight * defaultOptions.top,
          bottom: windowHeight - (windowHeight * defaultOptions.bottom),
        };

        this.setState({
          windowHeight,
          breakpoints,
        }, resolve)
      });
    }

    _onScroll() {
      const { wrappedComponent } = this;
      const { breakpoints, windowHeight } = this.state;
      const componentRect = wrappedComponent.getBoundingClientRect();
      let reveal = 0;
      let betweenBreakpoints = false;

      if (isBetweenFadeAreas(componentRect, breakpoints)) {
        reveal = 1;
        betweenBreakpoints = true;
      }

      if (isInBottomFadeArea(componentRect, breakpoints, windowHeight)) {
        const distanceBetweenBreakpointAndWindow = windowHeight - breakpoints.bottom;
        const distanceToBreakpoint = componentRect.top - breakpoints.bottom;
        reveal = 1 - (distanceToBreakpoint / distanceBetweenBreakpointAndWindow);
      }

      if (isInTopFadeArea(componentRect, breakpoints, windowHeight)) {
        const distanceBetweenBreakpointAndWindow = breakpoints.top;
        reveal = componentRect.bottom / distanceBetweenBreakpointAndWindow;
      }

      return this.setState({ reveal, betweenBreakpoints });
    }

    render() {
      return (
        <div ref={(ref) => this.wrappedComponent = ref}>
          <Component
            reveal={this.state.reveal}
            betweenBreakpoints={this.state.betweenBreakpoints}
            {...this.props}
          />
        </div>
      );
    }
  }

  return Reveal;
}
