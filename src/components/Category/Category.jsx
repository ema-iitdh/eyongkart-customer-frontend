import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCategory } from '@/features/category/hooks/useCategory';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HorizontalScrollerWithButton from '../common/HorizontalScrollerWithButton';
import { ROUTES } from '@/constants/routes';

const Category = () => {
  const { data, isLoading } = useCategory({ filter: '' });
  const scrollContainerRef = React.useRef(null);

  const categoryList = data?.categories?.sort((a, b) =>
    a?.name?.localeCompare(b?.name)
  );

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      // Scroll by roughly 1/3 of the container width for smoother navigation
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='bg-[#EFF4FF] py-4'>
      <div className='container mx-auto px-4'>
        <h2 className='text-xl font-bold text-gray-800 text-center'>
          Browse Categories
        </h2>

        {isLoading ? (
          <div className='flex justify-center gap-3'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className='animate-pulse w-24 h-8 rounded-full bg-gray-200'
              />
            ))}
          </div>
        ) : (
          <HorizontalScrollerWithButton>
            <Link
              to={`${ROUTES.COLLECTIONS}/All Products`}
              key={'all-products'}
              className='flex-shrink-0'
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  background:
                    'linear-gradient(to right, #EEF2FF, #E0E7FF, #C7D2FE)',
                }}
                whileTap={{ scale: 0.95 }}
                className='px-4 py-2 bg-gradient-to-r from-white via-blue-50 to-indigo-50 rounded-full shadow hover:shadow-md transition-all border border-blue-50'
              >
                <span className='text-xs font-medium text-gray-700 whitespace-nowrap tracking-wide'>
                  All Products
                </span>
              </motion.div>
            </Link>
            {categoryList?.map((item) => (
              <Link
                to={`${ROUTES.COLLECTIONS}/${item.name}?category=${item._id}`}
                key={item._id}
                className='flex-shrink-0'
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    background:
                      'linear-gradient(to right, #EEF2FF, #E0E7FF, #C7D2FE)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className='px-4 py-2 bg-gradient-to-r from-white via-blue-50 to-indigo-50 rounded-full shadow hover:shadow-md transition-all border border-blue-50'
                >
                  <span className='text-xs font-medium text-gray-700 whitespace-nowrap tracking-wide'>
                    {item.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </HorizontalScrollerWithButton>
        )}
      </div>
    </div>
  );
};

export default Category;
