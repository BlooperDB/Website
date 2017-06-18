import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';

/* eslint-disable global-require */
const Index = resolve => require(['../components/views/Index'], resolve);
const Add = resolve => require(['../components/views/Add'], resolve);
const Login = resolve => require(['../components/views/Login'], resolve);
const Search = resolve => require(['../components/views/Search'], resolve);
const View = resolve => require(['../components/views/View'], resolve);

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/add',
      name: 'add',
      component: Add,
      meta: { auth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/search/:query?',
      name: 'search',
      component: Search,
      props: true
    },
    {
      path: '/view/:id',
      name: 'view',
      component: View
    }

  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });

      return;
    }
  } else if (to.name === 'login') {
    // If user is already logged in, redirect them home
    if (store.getters.user) {
      next({
        path: '/'
      });
      return;
    }
  }

  next();
});

export default router;
