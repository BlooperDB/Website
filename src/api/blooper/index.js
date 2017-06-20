import axios from 'axios';
import config from '../config/config';

const instance = axios.create({
  baseURL: config.endpoint,
  validateStatus: status => (status >= 200 && status < 300) || (status >= 400 && status < 500)
});

export default instance;
