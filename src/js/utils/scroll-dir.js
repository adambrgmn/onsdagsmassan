import raf from 'raf-schd';

const toggleClasses = (el, className) => {
  const classNames = ['up', 'down', 'stop'];
  classNames.forEach(c => {
    const cName = `scroll-dir-${c}`;

    if (c === className) {
      el.classList.add(cName);
    } else {
      el.classList.remove(cName);
    }
  });
};

const scrollDir = (el, wait = 500) => {
  let lastPos = window.scrollY;
  let onTimeout = false;

  const onScroll = () => {
    if (onTimeout) return;

    onTimeout = true;
    window.setTimeout(() => {
      const currentPos = window.scrollY;

      if (currentPos > lastPos) {
        toggleClasses(el, 'down');
      } else if (currentPos < lastPos) {
        toggleClasses(el, 'up');
      } else {
        toggleClasses(el, 'stop');
      }

      lastPos = window.scrollY;
      onTimeout = false;
    }, wait);
  };

  document.addEventListener('scroll', raf(onScroll));
};

export { scrollDir as default };
