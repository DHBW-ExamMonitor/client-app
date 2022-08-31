import axios from 'axios';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();

// const baseUrl = env.production ? env.prod.apiUrl : env.dev.apiUrl;
const baseUrl = localStorage.getItem('apiUrl');

// Set config defaults when creating the instance
const api = axios.create({
  baseURL: baseUrl!,
});

console.log(baseUrl);

export default api;
