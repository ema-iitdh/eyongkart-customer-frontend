import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import React from 'react';

import { BrowserRouter, Outlet } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';
import { ROUTES } from './constants/routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ErrorBoundary from './components/common/ErrorBoundary';

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
          localStorage.clear();
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
  // Get Google client ID from environment variable
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Validate client ID exists
  if (!googleClientId) {
    console.error(
      'Missing Google OAuth client ID. Please check your .env file'
    );
    return null;
  }

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryclient}>
        <GoogleOAuthProvider clientId={googleClientId}>
          <MantineProvider>
            <ToastContainer
              position='top-center'
              toastStyle={{
                backgroundColor: 'hsl(210, 40%, 93%)',
                color: 'black',
                borderRadius: '10px',
                padding: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                maxWidth: '90vw',
                margin: '0 auto',
              }}
              autoClose={500}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </MantineProvider>
        </GoogleOAuthProvider>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
