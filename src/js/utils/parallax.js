/* eslint-disable no-param-reassign */
import raf from 'raf-schd';

const parallax = (el, reverse) => {
  const elRect = el.getBoundingClientRect();
  const elMid = elRect.top + window.scrollY + elRect.height / 2;

  const windowHeight = window.innerHeight;

  const updatePos = () => {
    const scrollPos = window.scrollY + windowHeight / 2;
    const distance = elMid - scrollPos;
    const translate = distance / elMid * 100;
    el.style.transform = `translateY(${reverse ? -translate : translate}%)`;
  };

  if (window.matchMedia('screen and (min-width: 480px)').matches) {
    updatePos();
    document.addEventListener('scroll', raf(updatePos));
  }
};

export { parallax as default };
