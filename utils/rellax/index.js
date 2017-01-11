import Rellax from 'rellax';

export default () => {
  const rellax = new Rellax('.rellax');
  const rellaxCenter = new Rellax('.rellax-center', { center: true });

  return () => {
    rellax.destroy();
    rellaxCenter.destroy();
  };
};
