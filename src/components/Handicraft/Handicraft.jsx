import { ROUTES } from '@/constants/routes';
import { useProducts } from '@/features/products/hooks/useProducts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Heading from '../Shared/Heading';
import HorizontalScrollWithViewMore from '../common/HorizontalScrollWithViewMore';
import ProductCard from '../common/ProductCard';

const Handicraft = () => {
  // Add stale time and cache time to reduce API calls
  const { data: handicraftData, isLoading: isProductsLoading } = useProducts({
    // ! NEED TO CHANGE
    filter: 'gender=Neutral',
  });

  const navigate = useNavigate();

  const handicraftLists = handicraftData?.products || [];

  // // Simplified animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: { duration: 0.3, staggerChildren: 0.05 },
  //   },
  // };

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 10 },
  //   visible: { opacity: 1, y: 0 },
  // };

  if (isProductsLoading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500' />
      </div>
    );
  }

  if (handicraftLists.length === 0) {
    return null;
  }

  return (
    <section className='py-12 bg-gradient-to-b from-gray-50 to-white'>
      <div className='container mx-auto px-4'>
        <Heading
          title='Handicraft Products'
          subtitle='Discover unique handcrafted treasures'
        />

        {/* Products Grid */}
        <motion.div
          // variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='mt-8'
        >
          {handicraftLists.length > 0 ? (
            <HorizontalScrollWithViewMore
              initialItemsToShow={4}
              className='gap-6'
              itemClassName='w-[280px]'
              onViewMore={() => {
                navigate(
                  `${ROUTES.COLLECTIONS}/Handicraft Products?gender=Neutral`
                );
              }}
            >
              {handicraftLists.map((product) => (
                <motion.div
                  key={product._id}
                  // variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className='h-full'
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </HorizontalScrollWithViewMore>
          ) : (
            <div className='col-span-full flex flex-col items-center justify-center py-12 px-4'>
              <img
                src='/empty-box.svg'
                alt='No products'
                className='w-32 h-32 mb-4 opacity-50'
              />
              <p className='text-gray-500 text-lg font-medium text-center'>
                No products available in this category yet.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Handicraft;
