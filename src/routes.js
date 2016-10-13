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
    pattern: '/aktuellt',
    component: Section,
  },
  {
    pattern: '/information',
    component: Section,
  },
  {
    pattern: '/musik',
    component: Section,
  },
];
