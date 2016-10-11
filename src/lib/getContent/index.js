import content from '../../content.json';

export default (path) => {
  const section = path.replace('/', '');
  return content[section];
};
