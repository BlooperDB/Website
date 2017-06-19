import Vue from 'vue';
import i18n from 'vuex-i18n';

import languages from './languages.json';
import store from '../store';

Vue.use(i18n.plugin, store);

// Default to the browser language
const storedLanguage = localStorage.getItem('language');
const userLanguages = (storedLanguage && [storedLanguage]) || window.navigator.languages || [];

import('./languages/en-US.json')
  .then((langFile) => {
    Vue.i18n.add('en-US', langFile);
    Vue.i18n.set('en-US');
  });

userLanguages.some((language) => {
  if (language in languages) {
    import(`./languages/${language}.json`)
      .then((langFile) => {
        Vue.i18n.add(language, langFile);
        Vue.i18n.set(language);
        Vue.i18n.fallback('en-US');
      });
    return true;
  }
  return false;
});

function changeLanguage(languageCode) {
  if (Vue.i18n.exists(languageCode)) {
    Vue.i18n.set(languageCode);
    localStorage.setItem('language', languageCode);
    return;
  }

  if (languageCode in languages) {
    import(`./languages/${languageCode}.json`)
      .then((langFile) => {
        Vue.i18n.add(languageCode, langFile);
        Vue.i18n.set(languageCode);
        localStorage.setItem('language', languageCode);
      });
  }
}

export default changeLanguage;
