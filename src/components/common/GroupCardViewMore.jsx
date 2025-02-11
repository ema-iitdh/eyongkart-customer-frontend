import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { v4 } from 'uuid';

export default function GroupCardViewMore({
  products = [],
  seeMoreLink = null,
  title,
  loading = false,
}) {
  // filter products to get only 4 products
  const filteredProducts = products?.slice(0, 4);

  if (filteredProducts.length === 0) {
    return null;
  }

  const LoadingSkeleton = () => (
    <div className='animate-pulse'>
      <div className='flex justify-between items-center p-2'>
        <div className='h-6 w-48 bg-gray-300 rounded' />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {[...Array(4)].map((_, index) => (
          <div key={v4()} className='bg-white rounded-lg h-[300px]'>
            <div className='h-[180px] bg-gray-300 rounded-t-lg' />
            <div className='p-3 space-y-2'>
              <div className='h-4 bg-gray-300 rounded w-3/4' />
              <div className='h-4 bg-gray-300 rounded w-1/2' />
              <div className='h-4 bg-gray-300 rounded w-1/4' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className='bg-slate-200 p-2 lg:max-w-md xl:max-w-sm 2xl:max-w-md w-full'>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className='bg-slate-200 p-2 lg:max-w-md xl:max-w-sm 2xl:max-w-md w-full'>
      <div className='flex justify-between items-center p-2'>
        <h2 className='text-xl font-semibold'>{title}</h2>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {filteredProducts?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className='flex h-5 justify-center mt-4'>
        {seeMoreLink && products.length > 4 && (
          <Link
            to={seeMoreLink}
            className='inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors'
          >
            See More
            <span className='text-lg'>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
