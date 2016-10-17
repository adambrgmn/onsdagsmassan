import React from 'react';
import interObs from '../interObs';

export default (Component) => {
  class Reveal extends React.Component {
    constructor(props) {
      super(props);
      this.state = { inView: false };
    }

    componentDidMount() {
      const target = this.wrappedComponent;
      this.interObs = interObs(target, (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.target === target && entry.intersectionRatio >= 0.5) {
            this.setState({ inView: true });
          }

          if (entry.target === target && entry.intersectionRatio < 0.5) {
            this.setState({ inView: false });
          }
        });
      });
    }

    componentWillUnmount() {
      this.interObs();
    }

    render() {
      return (
        <div ref={(ref) => this.wrappedComponent = ref}>
          <Component
            inView={this.state.inView}
            {...this.props}
          />
        </div>
      );
    }
  }

  return Reveal;
}
