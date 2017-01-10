import axios from 'axios';

const firebaseUrl = (path) => `https://onsdagsmassan-e0d2b.firebaseio.com/${path}.json`;

export const getSections = () => axios.get(firebaseUrl('sections'))
  .then((res) => res.data);

export const getSection = (section) => axios.get(firebaseUrl(`sections/${section}`))
  .then((res) => res.data);
