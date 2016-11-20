import Link from 'next/link';

function isLocal(href) {
  const origin = window.location.origin;
  return !/^https?:\/\//.test(href) || origin === href.substr(0, origin.length);
}

export default class ThenLink extends Link {
  static defaultProps = {
    transition: () => Promise.resolve(),
  }

  linkClicked(e) {
    if (e.target.nodeName === 'A' &&
      (e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent.which === 2)) {
      // ignore click for new tab / new window behavior
      return;
    }

    const { href, scroll } = this.props;

    if (!isLocal(href)) {
      // ignore click if it's outside our scope
      return;
    }

    e.preventDefault();

    this.props.transition()
      .then(() => {
        // straight up redirect
        this.context.router.push(null, href)
          .then((success) => {
            if (!success) return;
            if (scroll !== false) window.scrollTo(0, 0);
          })
          .catch((err) => {
            if (this.props.onError) this.props.onError(err);
          });
      });
  }
}
