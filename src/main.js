// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import App from './App';
import router from './router';
import store from './store';

import { AUTH_SET_USER_ID_TOKEN } from './store/types';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

// Initialize Google SSO
window.gapi.load('auth2', () => {
  window.gapi.auth2.init({
    client_id: '434311178684-mfgopcabm17e6vdk4c3fih0moblcl0kr.apps.googleusercontent.com'
  }).then((auth) => {
    auth.currentUser.listen((user) => {
      store.commit(AUTH_SET_USER_ID_TOKEN, user.getAuthResponse().id_token);
    });
    window.gapi.load('signin2');
  });
});
