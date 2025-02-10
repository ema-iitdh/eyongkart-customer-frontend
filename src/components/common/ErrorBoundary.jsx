import { useLogout } from '@/features/auth/hooks/useAuth';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function NotFound({ onBack }) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-lg w-full text-center px-4'>
        <h1 className='text-9xl font-bold text-gray-900 mb-2'>404</h1>
        <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
          Page Not Found
        </h2>
        <p className='text-gray-600 mb-8'>
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>
        <button
          type='button'
          onClick={onBack}
          className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Check for 401 status in axios error response
    if (error?.response?.status === 401 || error?.status === 401) {
      this.props.onUnauthorized();
      return;
    }

    // You can log the error to an error reporting service here
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.error?.response?.status === 401) {
      return (
        <Dialog
          open={
            this.state.error?.response?.status === 401 ||
            this.state.error?.status === 401
          }
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Session Expired</DialogTitle>
              <DialogDescription>
                Your login session may have expired or you are unauthorized.
                Please login again.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                type='button'
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Refresh Page
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

    if (this.state.error?.response?.status === 404) {
      return (
        <NotFound
          onBack={() => {
            this.setState({ hasError: false, error: null });
            window.history.back();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }}
        />
      );
    }

    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4'>
          <div className='max-w-lg w-full text-center'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
              Something went wrong
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mb-8'>
              We're sorry - something has gone wrong on our end. Please refresh
              the page or try again later.
            </p>
            <button
              type='button'
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className='mt-8 text-left p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-auto'>
                <p className='text-red-600 dark:text-red-400 font-mono text-sm'>
                  {this.state.error.toString()}
                </p>
                <pre className='mt-2 text-gray-700 dark:text-gray-300 font-mono text-sm'>
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ErrorBoundaryWrapper = (props) => {
  const { mutate: logout } = useLogout();

  return (
    <ErrorBoundary {...props} onUnauthorized={logout}>
      {props.children}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
