import * as types from '../types';

const state = {
  accountPopup: false
};

const mutations = {
  [types.UI_ACCOUNT_POPUP](currentState, payload) {
    currentState.accountPopup = payload;
  }
};

export default {
  state,
  mutations
};
