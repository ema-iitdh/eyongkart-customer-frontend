import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '@/features/products/hooks/useProducts';
import ProductCard from '../common/ProductCard';
import Button from '../Shared/Button';
import { ROUTES } from '@/constants/routes';

export default function LatestProducts() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts({ filter: '' });

  const sortedProducts = products?.products
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
    ?.slice(0, 10);

  // const latestProducts = sortedProducts?.filter((product) => {
  //   const productDate = new Date(product.createdAt);
  //   const sevenDaysAgo = new Date(sortedProducts[0].createdAt);
  //   sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  //   return productDate >= sevenDaysAgo;
  // });

  const latestProducts = sortedProducts?.slice(0, 10);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900' />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='text-3xl uppercase text-center my-10 drop-shadow-lg tracking-wider font-bold'>
        Latest Products
      </h2>
      <Link
        to={`${ROUTES.COLLECTIONS}/All Products`}
        className='flex justify-end pr-10 py-4'
      >
        <button
          type='button'
          className='inline-flex items-center px-4 py-2 text-sm font-semibold text-purple-600 bg-purple-100 rounded-lg hover:bg-purple-200 hover:text-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg'
        >
          View All Products
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            className='w-4 h-4 ml-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 7l5 5m0 0l-5 5m5-5H6'
            />
          </svg>
        </button>
      </Link>
      <div className='grid grid-cols-sm sm:grid-cols-md gap-2 gap-y-6 auto-rows-auto'>
        {latestProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
