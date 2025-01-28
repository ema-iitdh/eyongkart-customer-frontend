import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '@/features/products/hooks/useProducts';
import HorizontalScrollerWithButton from '../common/HorizontalScrollerWithButton';
import ProductCard from '../common/ProductCard';
import HorizontalScrollWithViewMore from '../common/HorizontalScrollWithViewMore';
import { useNavigate } from 'react-router-dom';

const TopSales = () => {
  const [minDiscount, setMinDiscount] = useState(10);
  const navigate = useNavigate();
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useProducts({ filter: '' });

  const filteredProducts = useMemo(() => {
    return productData?.products
      ?.filter((product) =>
        product?.variants.some(
          (variant) => variant.price.discount >= minDiscount
        )
      )
      .sort((a, b) => {
        const maxDiscountA = Math.max(
          ...a.variants.map((variant) => variant.price.discount)
        );
        const maxDiscountB = Math.max(
          ...b.variants.map((variant) => variant.price.discount)
        );

        if (maxDiscountB !== maxDiscountA) {
          return maxDiscountB - maxDiscountA;
        }
        return a?.name?.localeCompare(b?.name);
      });
  }, [productData, minDiscount]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[440px]'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center h-[440px] text-red-500'>
        Error: {error.message}
      </div>
    );
  }

  if (!filteredProducts?.length) {
    return null;
  }

  return (
    <section className='py-8 bg-gradient-to-b from-gray-50 to-white'>
      <div className='flex justify-center items-center mb-6'>
        <h2 className='text-lg md:text-2xl font-bold text-gray-700 drop-shadow-lg'>
          Top Sales <span className='text-red-500'>({minDiscount}%+ OFF)</span>
        </h2>
      </div>
      <div className='container mx-auto px-4'>
        <HorizontalScrollWithViewMore
          initialItemsToShow={4}
          itemClassName='w-[280px]'
          onViewMore={() =>
            navigate(
              `${ROUTES.COLLECTIONS}/TopSales?variants.price.discount_gte=${minDiscount}`
            )
          }
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className='flex-shrink-0 w-[280px]'
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </HorizontalScrollWithViewMore>
      </div>
    </section>
  );
};

export default TopSales;
