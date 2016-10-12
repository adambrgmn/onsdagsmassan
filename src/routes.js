import App from './components/App';
import Section from './components/Section';

export default [
  {
    exactly: true,
    pattern: '/',
    component: App,
    title: 'Hem',
  },
  {
    pattern: '/:section',
    component: Section,
  },
];
