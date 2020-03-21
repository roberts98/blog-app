import Vue from 'vue';
import Router from 'vue-router';

import Register from '../views/Register';
import Home from '../views/Home';
import Login from '../views/Login';
import CreatePost from '../views/CreatePost';

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
    },
    {
      path: '/add-post',
      component: CreatePost,
      meta: {
        privateRoute: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/') {
    return next();
  }

  if (to.meta.privateRoute) {
    if (localStorage.getItem('token')) {
      return next();
    } else {
      return next('/login');
    }
  } else {
    if (localStorage.getItem('token')) {
      return next('/');
    } else {
      return next();
    }
  }
});

export default router;
