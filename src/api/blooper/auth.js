import axios from '.';
import store from '../../store';
import { auth } from '../firebase/auth';
import { AUTH_SET_BLOOPER_TOKEN, AUTH_SET_FIREBASE_ID_TOKEN, AUTH_SET_USER } from '../../store/types';

function retrieveUser(blooperToken) {
  store.commit(AUTH_SET_BLOOPER_TOKEN, blooperToken);
  axios.defaults.headers.common['Blooper-Token'] = blooperToken;
  axios
    .get('/v1/user/self')
    .then((response) => {
      const data = response.data;
      if (data.success) {
        const user = data.data;
        store.commit(AUTH_SET_USER, user);
      } else {
        // that definitely shouldn't have happened
      }
    });
}

export function authUser(firebaseToken) {
  store.commit(AUTH_SET_FIREBASE_ID_TOKEN, firebaseToken);
  axios
    .post('/v1/user/signin', {
      'firebase-token': firebaseToken
    })
    .then((response) => {
      const data = response.data;
      if (data.success) {
        const payload = data.data;
        const blooperToken = payload['blooper-token'];
        const firstLogin = payload['first-login'];
        if (firstLogin) {
          // TODO show create user dialog
        } else {
          retrieveUser(blooperToken);
        }
      } else {
        // memes
      }
    });
}

export function logout() {
  auth.signOut()
    .then(() => {
      store.commit(AUTH_SET_FIREBASE_ID_TOKEN, null);
      store.commit(AUTH_SET_BLOOPER_TOKEN, null);
      store.commit(AUTH_SET_USER, null);
      delete axios.defaults.headers.common['Blooper-Token'];
    });
}
