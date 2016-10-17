let callbacks = [];

const callback = (...args) => {
  if (callbacks) callbacks.forEach(cb => cb(...args));
};

const options = { threshold: 0.5 };

const io = new IntersectionObserver(callback, options);

export default (target, cb) => {
  io.observe(target);

  if (typeof cb !== 'function') {
    const e = new Error('interObs: Provided callback must be a function');
    throw e;
  }

  callbacks = [...callbacks, cb];

  return () => {
    io.unobserve(target);
    callbacks = callbacks.filter((fn) => fn !== cb);
  };
};
