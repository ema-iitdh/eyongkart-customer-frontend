import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/features/products/hooks/useProducts';
import ProductCard from '../common/ProductCard';
import HorizontalScrollWithViewMore from '../common/HorizontalScrollWithViewMore';
import { ROUTES } from '@/constants/routes';

export default function MenProduct() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts({ filter: 'gender=Male' });

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900' />
      </div>
    );
  }

  const menProducts = products?.products?.slice(0, 15);

  return (
    <div className='py-8'>
      <div className='flex justify-center items-center mb-6'>
        <h2 className='text-3xl font-bold text-gray-700 drop-shadow-lg'>
          Men's Collection
        </h2>
      </div>

      <HorizontalScrollWithViewMore
        initialItemsToShow={4}
        itemClassName='w-[280px]'
        onViewMore={() => navigate(`${ROUTES.COLLECTIONS}/Men?gender=Male`)}
      >
        {menProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </HorizontalScrollWithViewMore>
    </div>
  );
}
