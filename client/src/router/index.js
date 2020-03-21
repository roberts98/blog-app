import Vue from 'vue';
import Router from 'vue-router';

import Register from '../views/Register';
import Home from '../views/Home';
import Login from '../views/Login';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/login',
      component:Login
    }
  ]
});
