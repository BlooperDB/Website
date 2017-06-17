import * as types from '../types';

const state = {
  user: null
};

const getters = {
  user: currentState => currentState.user
};

const actions = {};

const mutations = {
  [types.SET_USER](currentState, payload) {
    currentState.user = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
