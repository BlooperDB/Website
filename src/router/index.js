import Vue from 'vue';
import Router from 'vue-router';

/* eslint-disable global-require */
const Index = resolve => require(['../components/views/Index'], resolve);

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
});
