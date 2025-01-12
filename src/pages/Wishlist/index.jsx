import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaShoppingBag, FaHeart } from 'react-icons/fa';
import { Button } from '@mantine/core';
import { CloudinaryConfig } from '../../../Cloudinary';
import {
  useWishlist,
  useToggleWishlist,
} from '@/features/wishlist/hooks/useWishlist';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/api/services/product.service';
import Navbar from '@/components/common/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ChatBox from '@/components/Chat/ChatBox';

export default function Wishlist() {
  const { data: wishlistData, isLoading: isWishlistLoading } = useWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();
  const [localWishlist, setLocalWishlist] = useState([]);

  // Get product details for each wishlist item
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ['wishlist-products', wishlistData?.wishlist?.items],
    queryFn: async () => {
      // Return early if no items
      if (!wishlistData?.wishlist?.items?.length) {
        return [];
      }

      // Fetch products
      try {
        const productPromises = wishlistData.wishlist.items.map((item) =>
          productService.getProductById(item.product)
        );

        const responses = await Promise.allSettled(productPromises);

        // Filter out any failed requests and map to product data
        const validProducts = responses
          .filter(
            (response) =>
              response.status === 'fulfilled' && response.value?.product
          )
          .map((response) => response.value.product);

        if (validProducts.length === 0) {
          throw new Error('No valid products found');
        }

        return validProducts;
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
        throw error; // Let React Query handle the error state
      }
    },
    enabled: !!wishlistData?.wishlist?.items?.length,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 2, // Retry failed requests twice
  });

  useEffect(() => {
    if (wishlistData?.wishlist?.items && products) {
      const enrichedWishlist = wishlistData.wishlist.items
        .map((item) => {
          const productData = products.find((p) => p._id === item.product);
          if (!productData) return null;

          return {
            ...item,
            product: productData,
            variant: productData.variants?.find(
              (variant) => variant._id === item?.variantId?.[0]
            ),
          };
        })
        .filter(Boolean); // Remove any null items

      setLocalWishlist(enrichedWishlist);
    } else {
      setLocalWishlist([]);
    }
  }, [wishlistData, products]);

  const handleRemoveItem = (productId) => {
    // Optimistically remove item from local state first
    setLocalWishlist((prev) =>
      prev.filter((item) => item.product._id !== productId.productId)
    );
    // Then call API
    toggleWishlist(productId);
  };

  if (
    isWishlistLoading ||
    (isProductsLoading && wishlistData?.wishlist?.items?.length > 0)
  ) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin' />
          <div className='text-lg font-medium text-gray-600 dark:text-gray-300'>
            Loading your wishlist...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900 dark:text-white duration-200'>
      <div className='flex-grow w-full px-4 sm:px-6 lg:px-8 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6'
        >
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6'>
            <h1 className='text-xl sm:text-2xl font-bold flex items-center gap-2 mb-2 sm:mb-0'>
              <FaHeart className='text-red-500' />
              My Wishlist
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>
              {localWishlist?.length || 0} items
            </p>
          </div>

          <div className='space-y-4'>
            <AnimatePresence mode='popLayout'>
              {localWishlist?.map((item) => (
                <motion.div
                  key={item?.product?._id}
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    marginBottom: 0,
                    transition: { duration: 0.2 },
                  }}
                  className='flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
                >
                  <div className='w-full sm:w-24 h-48 sm:h-24 relative'>
                    <img
                      src={`${
                        CloudinaryConfig.CLOUDINARY_URL
                      }/image/upload/v1700463893/${
                        item?.product?.images?.[0]?.url ||
                        item?.product?.image_id?.[0]
                      }`}
                      alt={item?.product?.name}
                      className='w-full h-full object-cover rounded-md'
                    />
                  </div>

                  <div className='flex-1'>
                    <h3 className='font-semibold text-base sm:text-lg mb-1'>
                      {item?.product?.name}
                    </h3>
                    <p className='text-violet-600 font-bold text-sm sm:text-base'>
                      ₹
                      {item?.product?.price?.toLocaleString?.() ||
                        item?.variant?.price?.discountedPrice?.toLocaleString?.()}
                    </p>
                  </div>

                  <div className='flex flex-row sm:flex-col md:flex-row gap-2 w-full sm:w-auto'>
                    <Link
                      to={`/product/${item?.product?._id}`}
                      className='flex-1 sm:flex-none'
                    >
                      <Button
                        variant='light'
                        color='violet'
                        size='sm'
                        leftIcon={<FaShoppingBag size={14} />}
                        fullWidth
                        className='whitespace-nowrap'
                      >
                        View Product
                      </Button>
                    </Link>
                    <Button
                      variant='subtle'
                      color='red'
                      size='sm'
                      onClick={() =>
                        handleRemoveItem({
                          productId: item?.product?._id,
                          variantId: item?.variantId?.[0],
                        })
                      }
                      className='hover:bg-red-50'
                    >
                      <FaTrash size={14} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {(!localWishlist || localWishlist.length === 0) && (
              <div className='text-center py-8'>
                <FaHeart className='mx-auto text-gray-300 text-4xl sm:text-5xl mb-4' />
                <p className='text-gray-500 text-base sm:text-lg'>
                  Your wishlist is empty
                </p>
                <Link to='/' className='mt-4 inline-block'>
                  <Button
                    variant='gradient'
                    gradient={{ from: 'violet', to: 'fuchsia' }}
                    size='sm'
                  >
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <ChatBox />
    </div>
  );
}
