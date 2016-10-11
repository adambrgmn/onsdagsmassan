import Home from './components/Home';
import Section from './components/Section';

export default [
  {
    exactly: true,
    pattern: '/',
    component: Home,
    title: 'Hem',
  },
  {
    pattern: '/:section',
    component: Section,
  },
];
