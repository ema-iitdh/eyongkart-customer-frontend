import React, { useEffect, useState, useMemo } from 'react';
import { useProducts } from '@/features/products/hooks/useProducts';
import ProductCard from '../common/ProductCard';
import HorizontalScrollWithViewMore from '../common/HorizontalScrollWithViewMore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import ImageOnlyCard from '../common/ImageOnlyCard';
import ImageAndNameCard from '../common/ImageAndNameCard';

const PriceStores = () => {
  const maxPrice = 1000;
  const navigate = useNavigate();

  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useProducts({ filter: '' });

  const productLists = productData?.products || [];

  // Memoize filtered items to prevent recalculation on every render
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const filterItems = useMemo(() => {
    return productLists
      .filter(
        (product) =>
          (product?.variants?.[0]?.price?.discountedPrice ||
            product?.discountedPrice) <= maxPrice
      )
      .sort(
        (a, b) =>
          (a?.variants?.[0]?.price?.discountedPrice || a?.discountedPrice) -
          (b?.variants?.[0]?.price?.discountedPrice || b?.discountedPrice)
      );
  }, [productLists, maxPrice]);

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

  if (filterItems.length === 0) {
    return null;
  }

  return (
    <section className='py-8'>
      <div className='container mx-auto px-4'>
        <div className='flex  items-center justify-center mb-2'>
          <h2 className='text-2xl items-center flex drop-shadow-lg text-center font-bold text-gray-800'>
            Budget Friendly
            <span className='ml-2 text-lg font-medium text-red-500'>
              (Under ₹{maxPrice})
            </span>
          </h2>
        </div>

        <HorizontalScrollWithViewMore
          initialItemsToShow={4}
          onViewMore={() => {
            navigate(
              `${ROUTES.COLLECTIONS}/Budget Friendly?variants.price.discountedPrice_lte=2000`
            );
          }}
        >
          {filterItems?.map((item) => (
            <ImageAndNameCard key={item._id} product={item} />
          ))}
        </HorizontalScrollWithViewMore>
      </div>
    </section>
  );
};

export default PriceStores;
