import scrollDir from './utils/scroll-dir';
import infotext from './infotext';
import parallax from './utils/parallax';

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  scrollDir(nav);

  const readMoreLink = document.querySelector('.js-read-more');
  const moreText = document.createElement('div');
  moreText.innerHTML = infotext;

  readMoreLink.addEventListener('click', e => {
    e.preventDefault();
    const parent = readMoreLink.parentElement;
    readMoreLink.remove();
    parent.appendChild(moreText);
  });

  [...document.querySelectorAll('.parallax')].forEach(parallax);
});
