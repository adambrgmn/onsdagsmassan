import Home from './components/Home';
import Aktuellt from './components/Aktuellt';
import Information from './components/Information';
import Musik from './components/Musik';

export default [
  {
    exactly: true,
    pattern: '/',
    component: Home,
    title: 'Hem',
  },
  {
    pattern: '/aktuellt',
    component: Aktuellt,
    title: 'Aktuellt',
  },
  {
    pattern: '/information',
    component: Information,
    title: 'Information',
  },
  {
    pattern: '/musik',
    component: Musik,
    title: 'Musik',
  },
];
