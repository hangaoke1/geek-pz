import routemap from './routemap';
import App from '../view/App';
import Login from '../view/Login';
import Register from '../view/Register';
// import Auth from '@auth';
import Dashboard from '../view/Dashboard';

export default [
  {
    path: '/',
    component: App,
    indexRoute: {
      component: Dashboard
    },
    onEnter: async (nextState, replace) => {
      // if (!Auth.isLogin()) {
      //   replace('/login');
      // }
    },
    childRoutes: routemap
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
];
