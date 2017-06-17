import * as types from '../types';

const state = {
  userIdToken: null
};

const getters = {
  user: currentState => currentState.userIdToken
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
