import axios from '.';
import store from '../../store';
import { SEARCH_SET_RESULTS, SEARCH_SET_LOADING_RESULTS } from '../../store/types';

export function searchBlueprints(query) {
  axios
    .get(`/v1/blueprints/search/${query}`)
    .then((response) => {
      store.commit(SEARCH_SET_RESULTS, response.data.data.blueprints);
      store.commit(SEARCH_SET_LOADING_RESULTS, false);
    })
    .catch(() => {
      store.commit(SEARCH_SET_RESULTS, []);
      store.commit(SEARCH_SET_LOADING_RESULTS, false);
    });
}

export function getBlueprint(blueprint) {
  return axios
    .get(`/v1/blueprint/${blueprint}`)
    .then(response => response.data.data);
}

export function getRevisions(blueprint) {
  return axios
    .get(`/v1/blueprint/${blueprint}/revisions`)
    .then(response => response.data.data.revisions);
}
