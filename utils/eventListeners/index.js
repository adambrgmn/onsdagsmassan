export default (type, fn) => {
  window.addEventListener(type, fn);
  return () => window.removeEventListener(type, fn);
};
