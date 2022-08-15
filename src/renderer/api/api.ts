import axios from 'axios';
import { QueryClient } from 'react-query';

export const queryClient = new QueryClient();

// Set config defaults when creating the instance
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export default api;
