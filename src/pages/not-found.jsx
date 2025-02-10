import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const NotFound = () => {
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
        <Link
          to={ROUTES.HOME}
          className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
