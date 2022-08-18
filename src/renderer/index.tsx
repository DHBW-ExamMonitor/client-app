import { render } from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/api';
import App from './App';

render(
  <>
    <Toaster position="bottom-right" />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </>,
  document.getElementById('root')
);
