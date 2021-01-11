import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3004/countries',
});

export default api;
