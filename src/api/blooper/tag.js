import axios from '.';

// eslint-disable-next-line
export function searchTags(query) {
  return axios
    .get(`/v1/tags/autocomplete/${query}`)
    .then(response => response.data.data.tags);
}
