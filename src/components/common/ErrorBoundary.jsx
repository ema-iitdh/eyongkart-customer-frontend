import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
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
                this.setState({ hasError: false });
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

export default ErrorBoundary;
