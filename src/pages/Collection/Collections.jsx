import ProductCard from '@/components/common/ProductCard';
import { useProducts } from '@/features/products/hooks/useProducts';
import { Loader, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const Collections = () => {
  const { title } = useParams();
  const [searchParams] = useSearchParams();
  const filter = searchParams.toString();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(filter);

  const { data, isLoading, error } = useProducts({
    filter,
  });

  const products = data?.products;

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <Loader size='xl' variant='dots' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <Text color='red'>Something went wrong. Please try again later.</Text>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='w-full'
    >
      <div className='text-center mb-12'>
        <Title
          order={1}
          className='text-4xl capitalize font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-4 animate-pop'
        >
          {title}
        </Title>
      </div>

      <motion.div
        className='grid grid-cols-sm md:grid-cols-md gap-4'
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial='hidden'
        animate='show'
      >
        {products?.map((product) => (
          <motion.div
            key={product._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {products?.length === 0 && (
        <div className='text-center py-12'>
          <Text size='lg' color='dimmed'>
            No products found in the collection.
          </Text>
        </div>
      )}
    </motion.div>
  );
};

export default Collections;
