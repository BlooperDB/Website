import Vue from 'vue';
import i18n from 'vuex-i18n';

import languages from './languages.json';
import store from '../store';

Vue.use(i18n.plugin, store);

// Default to the browser language
const language = localStorage.getItem('language') || window.navigator.userLanguage || window.navigator.language;

import('./en-US.json')
  .then((langFile) => {
    Vue.i18n.add(language, langFile);
    Vue.i18n.set(language);
  });

if (language !== 'en-US') {
  if (language in languages) {
    import(`./${language}.json`)
      .then((langFile) => {
        Vue.i18n.add(language, langFile);
        Vue.i18n.set(language);
        Vue.i18n.fallback('en-US');
      });
  }
}

function changeLanguage(languageCode) {
  if (Vue.i18n.exists(languageCode)) {
    Vue.i18n.set(languageCode);
    localStorage.setItem('language', languageCode);
    return;
  }

  if (language in languages) {
    import(`./${languageCode}.json`)
      .then((langFile) => {
        Vue.i18n.add(languageCode, langFile);
        Vue.i18n.set(languageCode);
        localStorage.setItem('language', languageCode);
      });
  }
}

export default changeLanguage;
