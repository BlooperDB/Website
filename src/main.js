// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueAnalytics from 'vue-analytics';
import VueClipboards from 'vue-clipboards';

import App from './App';
import router from './router';
import store from './store';
import './i18n';

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VueClipboards);

Vue.use(VueAnalytics, {
  id: 'UA-103522646-1',
  router
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
