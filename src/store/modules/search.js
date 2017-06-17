import * as types from '../types';

const state = {
  query: '',
  results: null
};

const getters = {};

const actions = {};

const mutations = {
  [types.SEARCH_SET_QUERY](currentState, payload) {
    currentState.query = payload;
  },
  [types.SEARCH_SET_RESULTS](currentState, payload) {
    currentState.results = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
