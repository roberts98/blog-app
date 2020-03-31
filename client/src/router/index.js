import Vue from 'vue';
import Router from 'vue-router';

import Register from '../views/Register';
import Home from '../views/Home';
import Login from '../views/Login';
import CreatePost from '../views/CreatePost';
import Post from '../views/Post';

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
      component: Register,
      meta: {
        publicRoute: true
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        publicRoute: true
      }
    },
    {
      path: '/add-post',
      component: CreatePost,
      meta: {
        privateRoute: true
      }
    },
    {
      path: '/post/:id',
      component: Post
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.privateRoute) {
    if (localStorage.getItem('token')) {
      return next();
    } else {
      return next('/login');
    }
  } else if (to.meta.publicRoute) {
    if (localStorage.getItem('token')) {
      return next('/');
    } else {
      return next();
    }
  }

  next();
});

export default router;
