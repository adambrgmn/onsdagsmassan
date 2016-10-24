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
      this.interObs = interObs(target, ({ intersectionRatio }) => {
        this.setState({
          inView: intersectionRatio > 0,
        });
      });
    }

    componentWillUnmount() {
      this.interObs();
    }

    render() {
      return (
        <div ref={(ref) => (this.wrappedComponent = ref)}>
          <Component
            inView={this.state.inView}
            {...this.props}
          />
        </div>
      );
    }
  }

  return Reveal;
};
