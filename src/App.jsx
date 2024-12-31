import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';
import './App.css';

import { BrowserRouter } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';
import { ROUTES } from './constants/routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryclient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 5 * 1000,
      onError: (error) => {
        // toast.error(error?.response?.data?.message || error?.message);
        console.error('Query error:', error);
        if (error.response?.status === 401) {
          // Handle unauthorized error
          window.location.href = '/login';
        } else if (error.response?.status === 404) {
          // Handle not found error
          console.error('Resource not found');
        } else if (error.response?.status >= 500) {
          // Handle server errors
          console.error('Server error occurred');
        }
      },
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        // toast.error(error?.response?.data?.message || error?.message);
        console.error('Mutation error:', error);
        if (error.response?.status === 401) {
          window.location.href = ROUTES.LOGIN;
        }
      },
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryclient}>
      <MantineProvider>
        <ToastContainer />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
};

export default App;
