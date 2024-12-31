import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const CollectionLayout = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='min-h-screen bg-gray-50'
    >
      <div className='container mx-auto px-4 py-8'>
        <Outlet />
      </div>
    </motion.div>
  );
};

export default CollectionLayout;
