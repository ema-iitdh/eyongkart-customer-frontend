import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/features/products/hooks/useProducts';
import ProductCard from '../common/ProductCard';

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
      <div className='grid grid-cols-sm sm:grid-cols-md gap-2 gap-y-6 auto-rows-auto'>
        {latestProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
