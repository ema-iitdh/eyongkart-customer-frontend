import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaArrowLeft,
} from 'react-icons/fa';
import { Button, NumberInput, Badge } from '@mantine/core';
import { CloudinaryConfig } from '../../../Cloudinary';
import debounce from 'lodash/debounce';
import {
  useCart,
  useUpdateCart,
  useRemoveFromCart,
  useClearCart,
} from '@/features/cart/hooks/useCart';
import { useQueryClient } from '@tanstack/react-query';
import { productService } from '@/api/services/product.service';

export default function Cart() {
  const queryClient = useQueryClient();
  const { data: cartData, isLoading } = useCart();
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: clearCart } = useClearCart();

  const [localCart, setLocalCart] = useState([]);
  const [cartItemProducts, setCartItemProducts] = useState([]);
  const [productsFetched, setProductsFetched] = useState(false);

  useEffect(() => {
    if (cartData?.cart) {
      setLocalCart(cartData.cart);
    }
  }, [cartData]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const updatedCartItems = await Promise.all(
        localCart?.map?.(async (item) => {
          try {
            const response = await productService.getProductById(
              item?.product?._id
            );
            const productData = response?.product;
            queryClient.setQueryData(
              ['product', item?.product?._id],
              productData
            );

            const variant = productData?.variants?.find(
              (v) => v?._id === item?.variantId?.[0]
            );

            const imageId =
              productData?.images?.[0]?.url || productData?.image_id?.[0];
            const imageUrl = imageId
              ? `${CloudinaryConfig.CLOUDINARY_URL}/image/upload/c_fill,w_400,h_400/${imageId}`
              : '/placeholder-image.jpg';

            return {
              ...item,
              product: productData,
              variant,
              price: variant?.price?.discountedPrice || productData?.price,
              imageUrl,
            };
          } catch (error) {
            console.error('Error fetching product:', error);
            return {
              ...item,
              imageUrl: '/placeholder-image.jpg',
            };
          }
        })
      );

      setCartItemProducts(updatedCartItems.filter(Boolean));
      setProductsFetched(true);
    };

    if (localCart?.length) {
      fetchProductDetails();
    }
  }, [localCart, queryClient]);

  const totalAmount = useMemo(() => {
    if (!cartItemProducts?.length) return 0;
    return cartItemProducts.reduce((acc, item) => {
      return (
        acc +
        (item?.product?.variants?.price?.discountedPrice ||
          item?.product?.discountedPrice ||
          0) *
          (item?.quantity || 0)
      );
    }, 0);
  }, [cartItemProducts]);

  const debouncedUpdateCart = useMemo(
    () =>
      debounce((productId, variantId, quantity) => {
        updateCart({ productId, variantId, quantity });
      }, 500),
    [updateCart]
  );

  const handleQuantityChange = (item, newQuantity) => {
    setLocalCart((prev) =>
      prev?.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
    debouncedUpdateCart(item?.product?._id, item?.variant?._id, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    // Update local state first
    setLocalCart((prev) =>
      prev?.filter((item) => item?.product?._id !== productId)
    );
    setCartItemProducts((prev) =>
      prev?.filter((item) => item?.product?._id !== productId)
    );
    // Then call API
    removeFromCart(productId);
  };

  if (isLoading || (cartData?.cart?.length && !productsFetched)) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-violet-50 to-fuchsia-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-violet-600' />
      </div>
    );
  }

  if (!isLoading && !cartData?.cart?.length) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 flex flex-col items-center justify-center p-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className='text-center space-y-4 w-full max-w-sm mx-auto px-4'
        >
          <FaShoppingBag className='mx-auto text-violet-400 w-8 sm:w-12 h-8 sm:h-12' />
          <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
            Your cart is empty
          </h2>
          <p className='text-gray-600 text-xs sm:text-sm'>
            Looks like you haven't added anything to your cart yet. Start
            shopping to fill it up!
          </p>
          <Link to='/'>
            <Button
              size='sm'
              variant='gradient'
              gradient={{ from: 'violet', to: 'fuchsia' }}
              className='mt-4 w-full sm:w-auto'
              leftIcon={<FaArrowLeft size={14} />}
            >
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-violet-50 to-fuchsia-50 py-4 sm:py-8'>
      <div className='container mx-auto px-2 sm:px-4 max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg'
        >
          <div className='flex justify-between items-center mb-4 sm:mb-6'>
            <h1 className='text-xl sm:text-2xl font-bold text-gray-800'>
              Shopping Cart
            </h1>
            <Badge
              size='md'
              variant='gradient'
              gradient={{ from: 'violet', to: 'fuchsia' }}
            >
              {cartItemProducts.length}{' '}
              {cartItemProducts.length === 1 ? 'Item' : 'Items'}
            </Badge>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <AnimatePresence mode='popLayout'>
              {cartItemProducts.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className='flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow transition-shadow'
                >
                  <div className='relative group w-full sm:w-auto'>
                    <img
                      src={item.imageUrl}
                      alt={item?.product?.name || 'Product image'}
                      className='w-full sm:w-24 lg:w-32 h-32 sm:h-24 lg:h-32 object-cover rounded-lg mx-auto sm:mx-0'
                      loading='lazy'
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg' />
                  </div>

                  <div className='flex-1 space-y-1 sm:space-y-2 text-center sm:text-left'>
                    <div>
                      <h3 className='text-base sm:text-lg  text-gray-800'>
                        {item?.product?.name}
                      </h3>
                      {item?.variant && (
                        <Badge
                          variant='light'
                          color='violet'
                          size='sm'
                          className='mt-1'
                        >
                          {item?.variant?.color?.name} -{' '}
                          {item?.variant?.size?.value}
                        </Badge>
                      )}
                    </div>
                    <p className='text-lg sm:text-xl font-bold text-gray-800'>
                      ₹
                      {item?.product?.variants?.price?.discountedPrice?.toLocaleString?.() ||
                        item?.product?.discountedPrice?.toLocaleString?.()}
                    </p>
                  </div>

                  <div className='flex flex-row sm:flex-col items-center justify-between gap-2 sm:gap-3'>
                    <div className='flex items-center gap-2 bg-gray-50 rounded-full p-1'>
                      <Button
                        variant='subtle'
                        color='violet'
                        compact
                        size='xs'
                        onClick={() =>
                          handleQuantityChange(
                            item,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        <FaMinus size={10} />
                      </Button>
                      <span className='w-5 sm:w-6 text-center font-medium text-xs sm:text-sm'>
                        {item.quantity}
                      </span>
                      <Button
                        variant='subtle'
                        color='violet'
                        compact
                        size='xs'
                        onClick={() =>
                          handleQuantityChange(
                            item,
                            Math.min(99, item.quantity + 1)
                          )
                        }
                      >
                        <FaPlus size={10} />
                      </Button>
                    </div>

                    <Button
                      variant='light'
                      color='red'
                      size='xs'
                      onClick={() => handleRemoveItem(item?.product?._id)}
                      className='hover:bg-red-50'
                    >
                      <FaTrash size={10} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className='mt-6 sm:mt-8 border-t border-gray-100 pt-4 sm:pt-6'>
            <div className='flex flex-col gap-4'>
              <div className='space-y-1 text-center sm:text-left'>
                <p className='text-gray-600 text-xs sm:text-sm'>Total Amount</p>
                <p className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 text-transparent bg-clip-text'>
                  ₹{totalAmount?.toLocaleString?.()}
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 w-full'>
                <Link to='/' className='w-full sm:w-auto'>
                  <Button
                    variant='light'
                    color='violet'
                    size='sm'
                    leftIcon={<FaArrowLeft size={12} />}
                    fullWidth
                  >
                    Continue Shopping
                  </Button>
                </Link>
                <Link to='/checkout' className='w-full sm:w-auto'>
                  <Button
                    variant='gradient'
                    gradient={{ from: 'violet', to: 'fuchsia' }}
                    size='sm'
                    fullWidth
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
