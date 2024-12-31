import { useAddToCart } from '@/features/cart/hooks/useCart';
import { Rating } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { memo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudinaryConfig } from '../../../Cloudinary';
import {
  useToggleWishlist,
  useWishlist,
} from '@/features/wishlist/hooks/useWishlist';
import useCartStore from '@/store/useCartStore';
const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const {
    _id,
    name,
    price,
    discountedPrice,
    discount,
    image_id,
    averageRating,
    totalReviews,
    purchaseCount,
    images = [],
    variants = [],
  } = product;

  const { mutate: toggleWishlistApi } = useToggleWishlist();
  const { data: wishlist } = useWishlist();
  const { addToCart: addToCartStore } = useCartStore();

  const isWishlisted = wishlist?.wishlist?.items?.some(
    (item) => item.product === _id
  );

  const { mutate: addToCart } = useAddToCart();

  const toggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlistApi({
      productId: _id,
      variantId: variants?.[0]?._id || 'none',
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation
    addToCartStore({ productId: _id, quantity: 1 });
    addToCart({
      productId: _id,
      quantity: 1,
      variantId: variants?.[0]?._id || 'none',
    });
  };

  const imageUrl = image_id?.[0]?.replace(/"/g, '') || images?.[0]?.url || '';
  const dynamicPrice = variants?.[0]?.price?.discountedPrice || price;
  const dynamicDiscount = variants?.[0]?.price?.discount || discount;
  const dynamicBasePrice = variants?.[0]?.price?.basePrice || price;

  return (
    <Link to={`/product/${_id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative bg-gradient-to-br from-pink-50 via-white to-blue-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 max-w-[12.5rem] sm:h-[420px] h-[380px] flex flex-col group'
      >
        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleWishlist}
          className='absolute top-3 right-3 z-10 bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm p-2 rounded-full shadow-sm transition-opacity duration-300'
        >
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <Heart
                fill={isWishlisted ? '#ef4444' : 'none'}
                stroke={isWishlisted ? '#ef4444' : 'currentColor'}
                className='w-5 h-5 transition-colors'
              />
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* Product Image Container */}
        <div className='w-full sm:h-[220px] h-[180px] relative overflow-hidden bg-gradient-to-b from-gray-50 to-white'>
          <button
            type='button'
            onClick={() => navigate(`/product/${_id}`)}
            className='w-full h-full cursor-pointer'
          >
            <img
              src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/f_auto,q_auto,w_400,h_400/${imageUrl}`}
              alt={name}
              className='w-full h-full object-cover  transform group-hover:scale-110 transition-transform duration-500'
            />
            {discount > 0 && (
              <div className='absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg'>
                {discount}% OFF
              </div>
            )}
          </button>
        </div>

        {/* Product Details */}
        <div className='p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent via-white to-gray-50'>
          <div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <h3
              className='font-medium text-gray-800 sm:text-sm text-xs h-10 line-clamp-2 hover:text-red-500 cursor-pointer transition-colors duration-200'
              onClick={() => navigate(`/product/${_id}`)}
            >
              {name}
            </h3>

            <div className='flex items-center gap-2 mt-2'>
              <Rating value={averageRating} fractions={2} readOnly size='xs' />
              <span className='text-xs text-gray-500'>({totalReviews})</span>
            </div>

            <div className='flex items-center justify-between mt-3'>
              <div className='flex items-center gap-2 flex-wrap'>
                {discount > 0 ? (
                  <>
                    <span className='text-gray-400 line-through sm:text-xs text-[10px]'>
                      ₹{dynamicBasePrice}
                    </span>
                    <span className='sm:text-lg text-base font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                      ₹{dynamicPrice}
                    </span>
                    <span className='text-xs bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent font-medium'>
                      ({dynamicDiscount}% off)
                    </span>
                  </>
                ) : (
                  <span className='sm:text-lg text-base font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                    ₹{dynamicPrice}
                  </span>
                )}
              </div>
              {purchaseCount > 0 && (
                <span className='text-xs text-gray-500 bg-gradient-to-r from-gray-100 to-gray-50 px-2 py-1 rounded-full'>
                  {purchaseCount} bought
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600 text-white sm:py-2 py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 mt-3 shadow-md hover:shadow-lg sm:text-base text-sm font-medium'
          >
            <ShoppingCart className='sm:w-4 sm:h-4 w-3.5 h-3.5' />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};

export default memo(ProductCard);
