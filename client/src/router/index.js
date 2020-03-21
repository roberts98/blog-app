import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';
import { UPDATE_ACCESS_TOKEN } from '../store/modules/auth/types';
import Register from '../views/Register';
import Home from '../views/Home';
import Login from '../views/Login';

Vue.use(Router);

const router = new Router({
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
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    if (to.fullPath === '/login' || to.fullPath === '/register') {
      return next('/');
    }
  }

  next();
});

export default router;
