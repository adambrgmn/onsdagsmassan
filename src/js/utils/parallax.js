/* eslint-disable no-param-reassign */
import raf from 'raf-schd';

const parallax = (selector = '.js-parallax') => {
  const elements = document.querySelectorAll(selector);
  const els = [...elements].map(el => {
    const { speed } = el.dataset;
    return [el, Number.parseFloat(speed, 10)];
  });

  els.forEach(([el, speed]) => {
    el.style.transform = 'translateY(calc(var(--scrollparallax) * 1px))';

    window.addEventListener(
      'scroll',
      raf(() => {
        el.style.setProperty(
          '--scrollparallax',
          (document.body.scrollTop || document.documentElement.scrollTop) *
            speed,
        );
      }),
    );
  });
};

export { parallax as default };
