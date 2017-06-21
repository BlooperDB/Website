import axios from '.';
import store from '../../store';
import { auth } from '../firebase/auth';
import { AUTH_SET_BLOOPER_TOKEN, AUTH_SET_FIREBASE_ID_TOKEN, AUTH_SET_USER } from '../../store/types';

function getSelf(blooperToken) {
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
        getSelf(blooperToken);
        if (firstLogin) {
          // TODO show create user dialog
        }
      } else {
        // failed to sign in
      }
    });
}

export function getUser(user) {
  return axios
    .get(`/v1/user/${user}`)
    .then(response => response.data.data);
}

export function logout(func) {
  auth.signOut()
    .then(() => {
      store.commit(AUTH_SET_FIREBASE_ID_TOKEN, null);
      store.commit(AUTH_SET_BLOOPER_TOKEN, null);
      store.commit(AUTH_SET_USER, null);
      delete axios.defaults.headers.common['Blooper-Token'];

      if (func) {
        func();
      }
    });
}
