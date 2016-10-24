import stampit from 'stampit';

const Callbacks = stampit()
  .props({
    callbacks: [],
  })
  .methods({
    add({ target, cb }) {
      if (typeof cb !== 'function') {
        throw new Error('observer: provided callback must be a function');
      }

      this.callbacks = [...this.callbacks, { target, cb }];
    },
    remove(cb) {
      this.callbacks = this.callbacks.filter((callback) => callback.cb !== cb);
    },
    run(entries) {
      entries.forEach((entry) => {
        const { cb } = this.callbacks.find((callback) => callback.target === entry.target);
        if (cb) cb(entry);
      });
    },
  });


const callbacks = Callbacks();

const io = new IntersectionObserver(
  (entries) => callbacks.run(entries),
  { rootMargin: '-35% 0% -35% 0%' }
);

export default (target, cb) => {
  io.observe(target);
  callbacks.add({ target, cb });

  return () => {
    io.unobserve(target);
    callbacks.remove(cb);
  };
};
