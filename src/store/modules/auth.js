import * as types from '../types';

const state = {
  userIdToken: null, // ID obtained from Google SSO
  user: null         // User object obtained from API
};

const getters = {
  userIdToken: currentState => currentState.userIdToken,
  user: currentState => currentState.user
};

const actions = {};

const mutations = {
  [types.AUTH_SET_USER_ID_TOKEN](currentState, payload) {
    currentState.userIdToken = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
