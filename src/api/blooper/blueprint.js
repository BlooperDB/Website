import axios from '.';
import store from '../../store';
import { SEARCH_SET_RESULTS } from '../../store/types';

export function searchBlueprints(query) {
  axios
    .get(`/v1/blueprints/search/${query}`)
    .then((response) => {
      store.commit(SEARCH_SET_RESULTS, response.data.data);
    });
}

export function getBlueprint(blueprint) {
  return axios
    .get(`/v1/blueprint/${blueprint}`)
    .then(response => response.data.data);
}
