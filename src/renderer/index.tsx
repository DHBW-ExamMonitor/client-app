import { render } from 'react-dom';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/api';
import App from './App';

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);
