import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '@/features/products/hooks/useProducts';
import ProductCard from '../common/ProductCard';
import HorizontalScrollWithViewMore from '../common/HorizontalScrollWithViewMore';
import { ROUTES } from '@/constants/routes';
import ImageAndNameCard from '../common/ImageAndNameCard';

export default function WomenProduct() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts({
    filter: 'gender=Female',
  });

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-[200px]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900' />
      </div>
    );
  }

  const womenProducts = products?.products?.slice(0, 15);

  if (womenProducts?.length === 0) {
    return null;
  }

  return (
    <section className='py-8'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-center items-center mb-6'>
          <h2 className='text-3xl font-bold text-gray-700 drop-shadow-lg'>
            Women's Collection
          </h2>
        </div>

        <HorizontalScrollWithViewMore
          initialItemsToShow={4}
          onViewMore={() =>
            navigate(`${ROUTES.COLLECTIONS}/Women?gender=Female`)
          }
        >
          {womenProducts?.map((product) => (
            <ImageAndNameCard key={product._id} product={product} />
          ))}
        </HorizontalScrollWithViewMore>
      </div>
    </section>
  );
}
