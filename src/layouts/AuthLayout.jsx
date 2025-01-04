import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function AuthLayout() {
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='min-h-screen bg-gray-100'>
      <Outlet />
    </div>
  );
}
