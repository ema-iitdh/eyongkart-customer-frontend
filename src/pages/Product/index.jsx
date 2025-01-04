import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating, Button, Select, NumberInput } from '@mantine/core';
import { FaHeart, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudinaryConfig } from '../../../Cloudinary';
import { useProductById } from '@/features/products/hooks/useProducts';
import { v4 } from 'uuid';
import {
  useToggleWishlist,
  useWishlist,
} from '@/features/wishlist/hooks/useWishlist';
import {
  useAddToCart,
  useUpdateCart,
  useCart,
  useRemoveFromCart,
} from '@/features/cart/hooks/useCart';

export default function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { data: wishlist } = useWishlist();
  const { mutate: toggleWishlist } = useToggleWishlist();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { data: cartData } = useCart();

  const { data: productResponse, isLoading } = useProductById(productId);

  const product = productResponse?.product;

  const isInCart = useMemo(() => {
    return cartData?.cart?.some((item) => item.product._id === productId);
  }, [cartData, productId]);

  const variants = useMemo(() => {
    if (!product?.variants) return [];
    return product?.variants?.map((variant) => ({
      value: variant._id,
      label: `${variant.color.name} - ${variant.size.value} - ₹${variant.price.discountedPrice}`,
      variant,
    }));
  }, [product]);

  // Set default selected variant to first available variant
  const [selectedVariant, setSelectedVariant] = useState(null);

  // Update selected variant when variants are loaded
  useEffect(() => {
    if (variants.length > 0 && !selectedVariant) {
      const inStockVariant = variants.find(
        (v) => v.variant.stock.status === 'in_stock'
      );
      setSelectedVariant(
        inStockVariant ? inStockVariant.value : variants[0].value
      );
    }
  }, [variants, selectedVariant]);

  const currentVariant = useMemo(() => {
    if (!selectedVariant) return null;
    return variants.find((v) => v.value === selectedVariant)?.variant;
  }, [selectedVariant, variants]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600' />
      </div>
    );
  }

  const dynamicImageId =
    productResponse?.product?.images?.[selectedImage]?.url?.replace(/"/g, '') ||
    productResponse?.product?.image_id?.[selectedImage]?.replace(/"/g, '');

  const dynamicImageUrl = `${CloudinaryConfig.CLOUDINARY_URL}/image/upload/${dynamicImageId}`;

  const dynamicImages = (() => {
    if (productResponse?.product?.images?.length > 0) {
      return productResponse?.product?.images?.map((img) => ({
        url: `${
          CloudinaryConfig.CLOUDINARY_URL
        }/image/upload/${img?.url?.replace(/"/g, '')}`,
        id: img,
      }));
    }

    if (productResponse?.product?.image_id?.length > 0) {
      return productResponse?.product?.image_id?.map((img) => ({
        url: `${CloudinaryConfig.CLOUDINARY_URL}/image/upload/${img?.replace(
          /"/g,
          ''
        )}`,
        id: img,
      }));
    }

    return [];
  })();

  console.log(
    dynamicImages,
    'dynamicImages',
    dynamicImageUrl,
    'dynamicImageUrl'
  );

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
    if (isInCart) {
      updateCart({
        productId: product._id,
        quantity: newQuantity,
        variantId: currentVariant?._id || 'none',
      });
    }
  };

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(product._id);
    } else {
      if (currentVariant) {
        addToCart({
          productId: product._id,
          variantId: currentVariant?._id || 'none',
          quantity,
        });
      } else {
        addToCart({
          productId: product._id,
          quantity,
          variantId: currentVariant?._id || 'none',
        });
      }
    }
  };

  const handleBuyNow = () => {
    navigate(
      `/checkout/${product._id}/${currentVariant?._id || 'none'}/${quantity}`
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid md:grid-cols-2 gap-8 bg-white/40 backdrop-blur-sm rounded-3xl p-6 md:shadow-xl'>
          {/* Image Gallery */}
          <div className='space-y-4'>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='relative w-4/5 mx-auto aspect-square rounded-2xl overflow-hidden md:shadow-lg'
            >
              <AnimatePresence mode='wait'>
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={dynamicImageUrl}
                  alt={product?.name}
                  className='w-full h-full object-cover'
                />
              </AnimatePresence>
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist({
                    productId: product?._id,
                    variantId: selectedVariant || 'none',
                  });
                }}
                className='absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-full md:shadow-lg'
                type='button'
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{
                    scale: wishlist?.wishlist?.items?.some(
                      (item) => item.product === product?._id
                    )
                      ? [1, 1.2, 1]
                      : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <FaHeart
                    className={
                      wishlist?.wishlist?.items?.some(
                        (item) => item.product === product?._id
                      )
                        ? 'text-red-500'
                        : 'text-gray-400'
                    }
                    size={24}
                  />
                </motion.div>
              </motion.button>
            </motion.div>

            <div className='grid grid-cols-4 gap-3'>
              {dynamicImages.map((img, index) => (
                <button
                  type='button'
                  key={v4()}
                  onClick={() => setSelectedImage(index)}
                  disabled={currentVariant?.stock.status === 'out_of_stock'}
                  className={`aspect-square rounded-lg overflow-hidden transition-all ${
                    selectedImage === index
                      ? 'ring-2 ring-purple-500 scale-105'
                      : 'hover:ring-2 hover:ring-purple-300'
                  } ${
                    currentVariant?.stock.status === 'out_of_stock'
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`${product?.name} view ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            <div>
              <h1 className='font-serif text-3xl font-bold bg-gradient-to-r from-gray-800 to-orange-600 bg-clip-text text-transparent'>
                {product?.name}
              </h1>
              <div className='flex items-center gap-4 mt-2'>
                <Rating
                  value={product?.averageRating}
                  fractions={2}
                  size='md'
                />
                <span className='text-gray-600'>
                  ({product?.totalReviews} reviews)
                </span>
              </div>
            </div>

            {variants.length > 0 && (
              <Select
                label='Select Variant'
                placeholder='Choose size and color'
                data={variants}
                value={selectedVariant}
                onChange={setSelectedVariant}
                className='w-full'
              />
            )}

            <div>
              <p className='text-3xl font-bold bg-gray-800 bg-clip-text text-transparent'>
                ₹
                {currentVariant
                  ? currentVariant.price.discountedPrice
                  : product?.discountedPrice}
              </p>
              {(currentVariant?.price.discount > 0 ||
                product?.discount > 0) && (
                <div className='flex items-center gap-3 mt-1'>
                  <span className='text-gray-500 line-through'>
                    ₹
                    {currentVariant
                      ? currentVariant.price.basePrice
                      : product?.price}
                  </span>
                  <span className='text-green-500 font-semibold'>
                    ({currentVariant?.price.discount || product?.discount}% OFF)
                  </span>
                </div>
              )}
            </div>

            <p className='text-gray-600 leading-relaxed text-sm'>
              {product?.description}
            </p>

            <div className='flex items-center gap-4 mb-4'>
              <motion.div
                className='flex items-center gap-2 bg-white/80 backdrop-blur-sm p-1 rounded-lg md:shadow-md'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='p-2 rounded-lg bg-purple-100 text-gray-600 hover:bg-purple-200 transition-colors'
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <FaMinus size={12} />
                </motion.button>

                <NumberInput
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  max={99}
                  className='w-16 text-center'
                  hideControls
                  styles={{
                    input: {
                      textAlign: 'center',
                      fontWeight: 'bold',
                      backgroundColor: 'transparent',
                      border: 'none',
                    },
                  }}
                />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='p-2 rounded-lg bg-purple-100 text-gray-600 hover:bg-purple-200 transition-colors'
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 99}
                >
                  <FaPlus size={12} />
                </motion.button>
              </motion.div>
            </div>

            <div className='flex flex-col md:flex-row gap-3'>
              <Button
                size='md'
                className={`flex-1 py-3 px-4 bg-gradient-to-r ${
                  isInCart
                    ? 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                    : 'from-yellow-800 to-orange-800 hover:from-yellow-700 hover:to-orange-700'
                } text-white font-semibold transform hover:scale-105 transition-all duration-200 md:shadow-lg hover:shadow-xl rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                leftIcon={<FaShoppingCart />}
                disabled={currentVariant?.stock.status === 'out_of_stock'}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </Button>
              <Button
                size='md'
                className='flex-1 py-3 px-4 bg-gradient-to-r from-green-800 to-green-700 hover:from-green-900 hover:to-black text-white font-semibold transform hover:scale-105 transition-all duration-200 md:shadow-lg hover:shadow-xl rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                disabled={currentVariant?.stock.status === 'out_of_stock'}
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            <div className='border-t border-gray-200/50 pt-4'>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <p className='text-gray-500'>Category</p>
                  <p className='font-medium text-gray-900'>
                    {product?.category?.name || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className='text-gray-500'>Availability</p>
                  <p className='font-medium text-gray-900'>
                    {currentVariant
                      ? currentVariant.stock.status === 'in_stock'
                        ? 'In Stock'
                        : currentVariant.stock.status === 'low_stock'
                        ? 'Low Stock'
                        : currentVariant.stock.status === 'out_of_stock'
                        ? 'Out of Stock'
                        : 'Not provided'
                      : 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className='text-gray-500'>Material</p>
                  <p className='font-medium text-gray-900'>
                    {product?.material || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className='text-gray-500'>Handcrafted</p>
                  <p className='font-medium text-gray-900'>
                    {product?.handcrafted ? 'Yes' : 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
