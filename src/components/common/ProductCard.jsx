import { useAddToCart } from '@/features/cart/hooks/useCart';
import {
  useToggleWishlist,
  useWishlist,
} from '@/features/wishlist/hooks/useWishlist';
import useCartStore from '@/store/useCartStore';
import { Rating } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudinaryConfig } from '../../../Cloudinary';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const {
    _id,
    name,
    averageRating,
    totalReviews,
    purchaseCount,
    image_id,
    baseImage,
    variants = [],
    price,
    discount,
    discountedPrice,
  } = product;

  const { mutate: toggleWishlistApi } = useToggleWishlist();
  const { data: wishlist } = useWishlist();
  const { addToCart: addToCartStore } = useCartStore();

  const isWishlisted = wishlist?.wishlist?.items?.some(
    (item) => item?.product === _id
  );

  const { mutate: addToCart } = useAddToCart();

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlistApi({
      productId: _id,
      variantId: variants?.[0]?._id || 'none',
    });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCartStore({ productId: _id, quantity: 1 });
    addToCart({
      productId: _id,
      quantity: 1,
      variantId: variants?.[0]?._id || 'none',
    });
  };

  const imageUrl = baseImage?.url || image_id?.[0];
  const dynamicPrice = variants?.[0]?.price?.discountedPrice || price;
  const dynamicDiscount = variants?.[0]?.price?.discount || discount;
  const dynamicBasePrice =
    variants?.[0]?.price?.markedUpPrice || discountedPrice;

  return (
    <Link to={`/product/${_id}/${variants?.[0]?._id}`} className='block w-full'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col group overflow-hidden'
      >
        {/* Discount Badge */}
        {dynamicDiscount > 0 && (
          <div className='absolute top-2 left-2 z-10'>
            <div className='bg-red-600 text-white px-2 py-1 rounded-sm text-xs font-bold'>
              {dynamicDiscount}% OFF
            </div>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type='button'
          onClick={toggleWishlist}
          className='absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-all duration-200'
        >
          <Heart
            size={18}
            fill={isWishlisted ? '#dc2626' : 'none'}
            stroke={isWishlisted ? '#dc2626' : '#374151'}
            strokeWidth={2}
          />
        </button>

        {/* Image Container */}
        <div className='relative pt-[75%] bg-gray-50'>
          <img
            src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/f_auto,q_auto,w_400,h_300/${imageUrl}`}
            alt={name}
            className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
            loading='lazy'
          />
        </div>

        {/* Product Details */}
        <div className='p-3 flex flex-col flex-1'>
          <div className='flex-1'>
            <h3 className='text-sm font-medium text-gray-900 line-clamp-2 mb-1'>
              {name}
            </h3>

            {/* Rating & Reviews */}
            <div className='flex items-center gap-2 mb-1'>
              <Rating value={averageRating} fractions={2} readOnly size='xs' />
              <span className='text-xs text-gray-500'>
                {totalReviews?.toLocaleString() || 0}
              </span>
            </div>

            {/* Price Section */}
            <div className='space-y-0.5'>
              <div className='flex items-baseline gap-2'>
                <span className='text-lg font-bold text-gray-900'>
                  ₹{dynamicPrice?.toLocaleString()}
                </span>
                {dynamicDiscount > 0 && (
                  <span className='text-sm text-gray-500 line-through'>
                    ₹{dynamicBasePrice?.toLocaleString()}
                  </span>
                )}
              </div>

              <div className='text-xs text-gray-600'>
                {dynamicDiscount > 0 ? (
                  <span className='text-green-600 font-medium'>
                    Save ₹{dynamicBasePrice - dynamicPrice}
                  </span>
                ) : (
                  <span className='text-gray-400'>Best Price</span>
                )}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          {/* <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            className='mt-2 w-full bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-sm font-medium text-gray-900 py-2 px-4 rounded-md shadow-sm hover:shadow flex items-center justify-center gap-2 transition-colors duration-200'
          >
            <ShoppingCart size={16} />
            Add to Cart
          </motion.button> */}
        </div>
      </motion.div>
    </Link>
  );
};

export default memo(ProductCard);
