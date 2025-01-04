import Navbar from '@/components/common/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
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
    <div className='w-full'>
      <div className='sticky top-0 z-40'>
        <Navbar />
      </div>
      <main className='w-full'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
