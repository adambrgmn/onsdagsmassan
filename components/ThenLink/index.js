import Link from 'next/link';

export default class ThenLink extends Link {
  linkClicked(e) {
    if ('transition' in this.props && typeof this.props.transition === 'function') {
      e.preventDefault();
      const event = Object.assign({}, e, { preventDefault: () => {} });

      Promise.resolve(this.props.transition())
        .then(() => super.linkClicked(event))
        .catch((err) => {
          console.error(err);
          return super.linkClicked(event);
        });
    } else {
      super.linkClicked(e);
    }
  }
}
