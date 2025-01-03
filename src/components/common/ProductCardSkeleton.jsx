export default function ProductCardSkeleton() {
  return (
    <div className='relative bg-gradient-to-br from-pink-50 via-white to-blue-50 rounded-xl shadow-md overflow-hidden md:mx-[1rem] sm:h-[420px] h-[380px] flex flex-col'>
      {/* Wishlist Button Skeleton */}
      <div className='absolute top-3 right-3 z-10 bg-gray-200 p-2 rounded-full w-9 h-9' />

      {/* Image Skeleton */}
      <div className='w-full sm:h-[220px] h-[180px] relative overflow-hidden bg-gray-200 animate-pulse' />

      {/* Content Skeleton */}
      <div className='p-4 flex-1 flex flex-col justify-between'>
        <div>
          {/* Title Skeleton */}
          <div className='h-10 bg-gray-200 rounded-md animate-pulse mb-2' />

          {/* Rating Skeleton */}
          <div className='flex items-center gap-2 mt-2'>
            <div className='h-4 w-24 bg-gray-200 rounded animate-pulse' />
            <div className='h-4 w-8 bg-gray-200 rounded animate-pulse' />
          </div>

          {/* Price Skeleton */}
          <div className='flex items-center justify-between mt-3'>
            <div className='flex items-center gap-2'>
              <div className='h-6 w-16 bg-gray-200 rounded animate-pulse' />
              <div className='h-6 w-20 bg-gray-200 rounded animate-pulse' />
            </div>
            <div className='h-6 w-20 bg-gray-200 rounded-full animate-pulse' />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className='w-full h-10 bg-gray-200 rounded-lg mt-3 animate-pulse' />
      </div>
    </div>
  );
}
