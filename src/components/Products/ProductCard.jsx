import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { CloudinaryConfig } from '../../../Cloudinary';
import { Rating } from '@mantine/core';
import { useWishlist } from '../../hooks/useWistlist';

const ProductCard = ({ filteredWomenProductList }) => {
  const navigate = useNavigate();

  const { isInWishlists, toggleWishlist } = useWishlist();

  const displayedWomenProducts = filteredWomenProductList?.slice(0, 15);
  const sortedProductList = displayedWomenProducts?.sort((a, b) =>
    a?.name?.localeCompare(b?.name)
  );

  return (
    <div className='mb-6 sm:mt-2 p-3'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 p-2 gap-3'>
        {sortedProductList?.map((p) => {
          return (
            <div
              className='group shadow-md hover:shadow-lg border border-gray-400 sm:p-3 p-2 rounded-md flex flex-col'
              key={p._id}
            >
              <div className='relative'>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <img
                  onClick={() => navigate(`/product/${p._id}`)}
                  src={`${
                    CloudinaryConfig.CLOUDINARY_URL
                  }/image/upload/${p?.image_id[0]?.replace(/"/g, '')}`}
                  alt={p.name}
                  className='w-full h-[150px] sm:h-[200px] md:h-[220px] object-cover rounded-md'
                />
                <button
                  onClick={() => toggleWishlist(p._id)}
                  type='button'
                  className='absolute top-2 right-2 bg-slate-50 p-[5px] sm:p-[8px] rounded-full'
                >
                  <FaHeart
                    className={
                      isInWishlists(p._id) ? 'text-red-600' : 'text-gray-400'
                    }
                  />
                </button>
              </div>
              <div className='flex-1 flex flex-col justify-between mt-2 sm:p-2'>
                <div className='space-y-2'>
                  <h3 className='text-xs sm:text-sm md:text-base font-medium text-gray-800 line-clamp-2 min-h-[32px] sm:min-h-[40px]'>
                    {p.name}
                  </h3>

                  <div className='flex items-center gap-1 sm:gap-2'>
                    <Rating
                      value={p?.averageRating}
                      fractions={2}
                      size='xs'
                      className='scale-75 sm:scale-90 md:scale-100'
                    />
                    <span className='text-[10px] sm:text-xs text-orange-500'>
                      ({p?.totalReviews})
                    </span>
                  </div>

                  <div className='flex flex-wrap items-center gap-1 sm:gap-2'>
                    <span className='text-[11px] sm:text-sm text-gray-500 line-through'>
                      ₹{p.price}
                    </span>
                    <span className='text-xs sm:text-base font-semibold text-gray-900'>
                      ₹{p.discountedPrice}
                    </span>
                    <span className='text-[10px] sm:text-xs text-emerald-600 font-medium'>
                      ({p.discount}% OFF)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCard;
