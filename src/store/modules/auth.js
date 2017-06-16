import * as types from '../types';

const state = {
  jwt: null
};

const mutations = {
  [types.AUTH_JWT](currentState, payload) {
    currentState.jwt = payload;
  }
};

export default {
  state,
  mutations
};
