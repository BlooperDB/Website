import * as firebase from 'firebase';
import firebaseui from 'firebaseui';

import router from '../../router/index';
import store from '../../store/index';
import { AUTH_SET_FIREBASE_ID_TOKEN } from '../../store/types';

import { authUser } from '../blooper/auth';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBdFTFjxmNm_sHSW_I3xUzfylujravBuTc',
  authDomain: 'blooper-1.firebaseapp.com',
  databaseURL: 'https://blooper-1.firebaseio.com',
  projectId: 'blooper-1',
  storageBucket: 'blooper-1.appspot.com',
  messagingSenderId: '434311178684'
};

firebase.initializeApp(config);

export const uiConfig = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess(user) {
      user.getIdToken().then((accessToken) => {
        store.commit(AUTH_SET_FIREBASE_ID_TOKEN, accessToken);

        authUser(accessToken);
      });

      router.push(router.currentRoute.query.redirect ? router.currentRoute.query.redirect : '/');

      return false;
    }
  },
  signInFlow: 'popup'
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());


export { firebase, ui };
