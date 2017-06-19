import * as types from '../types';

const state = {
  firebaseIdToken: null, // ID obtained from Google SSO
  user: null         // User object obtained from API
};

const getters = {
  firebaseIdToken: currentState => currentState.firebaseIdToken,
  user: currentState => currentState.user
};

const actions = {};

const mutations = {
  [types.AUTH_SET_FIREBASE_ID_TOKEN](currentState, payload) {
    currentState.firebaseIdToken = payload;
  },
  [types.AUTH_SET_USER](currentState, payload) {
    currentState.user = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
