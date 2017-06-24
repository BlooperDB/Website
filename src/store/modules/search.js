import * as types from '../types';

const state = {
  query: '',
  results: null,
  loadingResults: false
};

const getters = {
  query: currentState => currentState.query,
  results: currentState => currentState.results,
  loadingResults: currentState => currentState.loadingResults
};

const actions = {};

const mutations = {
  [types.SEARCH_SET_QUERY](currentState, payload) {
    currentState.query = payload;
  },
  [types.SEARCH_SET_RESULTS](currentState, payload) {
    currentState.results = payload;
  },
  [types.SEARCH_SET_LOADING_RESULTS](currentState, payload) {
    currentState.loadingResults = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
