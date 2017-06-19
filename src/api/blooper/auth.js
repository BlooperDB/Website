import store from '../../store';
import { AUTH_SET_USER } from '../../store/types';
import axios from '.';

export function authUser(firebaseToken) {
  axios
    .post('/user/signin', {
      data: {
        'firebase-token': firebaseToken
      }
    })
    .then((response) => {
      store.commit(AUTH_SET_USER, response);
    });
}

export function logout() {}
