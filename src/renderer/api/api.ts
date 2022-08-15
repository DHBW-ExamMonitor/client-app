import axios from 'axios';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://em.kevinludwig.dev';

// Set config defaults when creating the instance
const api = axios.create({
  baseURL: baseUrl,
});

export default api;
