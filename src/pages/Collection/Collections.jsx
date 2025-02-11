import ProductCard from '@/components/common/ProductCard';
import ProductCardSkeleton from '@/components/common/ProductCardSkeleton';
import { useProducts } from '@/features/products/hooks/useProducts';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

export default function Collections() {
  const [searchParams] = useSearchParams();
  const { title } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5, // Only trigger when 50% of element is visible
    rootMargin: '100px', // Only trigger when element is 100px from viewport
  });
  const location = useLocation();

  // Reset state when route changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setProducts([]);
    setPage(null);
    setIsLoadingMore(false);
  }, [location.pathname, searchParams.toString()]); // Also reset when search params change

  const { data, isLoading, error } = useProducts(
    {
      filter: searchParams.toString() + (page ? `&page=${page}` : ''),
    },
    {
      staleTime: 0,
      refetchOnMount: 'always', // Force refetch on mount
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      onSuccess: (data) => {
        if (page === 1) {
          setProducts(data?.products || []);
        } else {
          const uniqueProducts = data?.products?.filter(
            (product) => !products.some((p) => p._id === product._id)
          );
          setProducts((prev) => [...prev, ...(uniqueProducts || [])]);
        }
        setIsLoadingMore(false);
      },
    }
  );

  // Get all products without filters for suggestions
  const { data: allProductsData } = useProducts(
    { filter: 'limit=50' },
    { enabled: !isLoading && data?.products && !data.products.length }
  );

  const hasNextPage = data?.pagination?.hasNextPage;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setProducts([]);
      setPage(1);
      setIsLoadingMore(false);
    };
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isLoadingMore && !isLoading) {
      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [inView, hasNextPage, isLoadingMore, isLoading]);

  if (isLoading && page === 1) {
    return (
      <div className='container mx-auto px-2 py-8'>
        <h1 className='text-4xl font-extrabold text-center my-8'>
          <div className='h-12 bg-gray-200 rounded animate-pulse w-1/3 mx-auto' />
        </h1>
        <div className='grid grid-cols-sm md:grid-cols-md gap-6 gap-y-8'>
          {[...Array(8)].map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <div className='text-red-500 text-xl font-semibold mb-4'>
          Oops! Something went wrong
        </div>
        <div className='text-gray-600'>{error?.message}</div>
      </div>
    );
  }

  // Show "No Products Found" and suggested products
  if (!isLoading && data?.products && !data.products.length) {
    return (
      <div className='container mx-auto px-2 py-8'>
        <div className='text-center mb-12'>
          <div className='text-3xl font-bold text-gray-400 mb-4'>
            No Products Found
          </div>
          <p className='text-gray-600'>
            We couldn't find any products matching your criteria.
          </p>
        </div>

        {allProductsData?.products && allProductsData.products.length > 0 && (
          <div>
            <h2 className='text-2xl font-bold text-center mb-8'>
              You might be interested in these products
            </h2>
            <div className='grid grid-cols-sm md:grid-cols-md gap-6 gap-y-8'>
              {allProductsData.products.map((product) => (
                <div
                  key={product._id}
                  className='transform transition-all duration-300 hover:scale-105'
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className=' mx-auto pb-8'>
      <h1 className='text-xl md:text-3xl font-extrabold text-center mb-8 '>
        <span className='relative bg-gradient-to-r group from-yellow-500 to-orange-400 bg-clip-text text-transparent uppercase tracking-wider'>
          {title || 'Collections'}
          <div className='h-[3px] w-1/3 group-hover:w-full transition-all duration-300 absolute -bottom-1 rounded-full left-0 bg-gradient-to-r from-yellow-500 to-orange-400' />
        </span>
      </h1>

      <div className='grid grid-cols-sm md:grid-cols-md gap-1 gap-y-8'>
        {products?.map((product) => (
          <div
            key={product._id}
            className='transform transition-all duration-300 hover:scale-105'
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {isLoadingMore && (
        <div className='grid grid-cols-sm md:grid-cols-md gap-2 gap-y-8 py-8'>
          {[...Array(4)].map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      <div ref={ref} className='h-20 mt-4' />
    </div>
  );
}
