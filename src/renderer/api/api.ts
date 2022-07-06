import axios from 'axios';

// Set config defaults when creating the instance
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default api;
