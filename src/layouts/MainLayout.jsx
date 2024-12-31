import Navbar from '@/components/common/Navbar/Navbar';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function MainLayout() {
  // scroll to top when route changes
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className='min-h-screen bg-gray-100 relative'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
