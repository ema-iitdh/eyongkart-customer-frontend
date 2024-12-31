import {
  useAddress,
  useCreateAddress,
} from '@/features/address/hooks/useAddress';
import { useCart } from '@/features/cart/hooks/useCart';
import { useProductById } from '@/features/products/hooks/useProducts';
import { Button, Select, TextInput } from '@mantine/core';
import { CloudinaryConfig } from '@/constants/Cloudinary';
import { useQueryClient } from '@tanstack/react-query';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '@/api/services/product.service';
import {
  useShippingDetails,
  useCreateOrder,
} from '@/features/orders/hooks/userOrders';

export default function Checkout() {
  const { productId, variantId, quantity } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: cartData, isLoading: isCartLoading } = useCart();
  const { data: addressesResponse, isLoading: isAddressLoading } = useAddress();
  const addresses = addressesResponse?.data;
  const { mutate: createAddress } = useCreateAddress();
  const {
    mutate: getShippingDetails,
    data: shippingDetailsResponse,
    isLoading: isShippingDetailsLoading,
  } = useShippingDetails();
  const { mutate: createOrder } = useCreateOrder();

  const { data: singleProductResponse, isLoading: isProductLoading } =
    useProductById(productId);

  const singleProduct = singleProductResponse?.product;
  const selectedVariant = singleProduct?.variants?.find(
    (variant) => variant._id === variantId
  );

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    shippingAddress: {
      deliveredToWhom: '',
      address: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      landmark: '',
      district: '',
    },
    paymentMethod: 'cod',
  });

  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    if (selectedAddress) {
      const selectedAddr = addresses?.find(
        (addr) => addr._id === selectedAddress
      );
      if (selectedAddr) {
        getShippingDetails({
          pincode: selectedAddr.pincode,
          state: selectedAddr.state,
          city: 'Imphal',
        });
      }
    }
  }, [selectedAddress, getShippingDetails, addresses]);

  const shippingDetails = shippingDetailsResponse?.shippingDetails;

  console.log(selectedAddress, showAddressForm);

  useEffect(() => {
    if (addresses?.length > 0 && !selectedAddress && !showAddressForm) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress._id);
      } else {
        setSelectedAddress(addresses[0]._id);
      }
    }

    if (addresses?.length === 0) {
      setShowAddressForm(true);
    }
  }, [addresses, selectedAddress, showAddressForm]);

  // Fetch detailed product information for each item
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchItemDetails = async () => {
      if (productId && singleProduct) {
        // Single product checkout flow
        const item = {
          product: singleProduct,
          quantity: Number.parseInt(quantity),
          ...(variantId && {
            variant: selectedVariant,
          }),
        };
        setItems([item]);
        const price =
          item.variant?.price?.discountedPrice || Number(item?.product?.price);

        setTotalAmount(
          price * item.quantity + (shippingDetails?.shippingCost || 0)
        );
      } else if (!productId && cartData?.cart) {
        // Cart checkout flow
        const details = {};
        const fetchPromises = cartData.cart.map(async (item) => {
          try {
            // Try to get from cache first
            const cachedData = queryClient.getQueryData([
              'product',
              item.product._id,
            ]);
            if (cachedData) {
              details[item.product._id] = cachedData;
              return;
            }

            // If not in cache, fetch from API
            const response = await productService.getProductById(
              item.product._id
            );
            details[item.product._id] = response.product;
            // Update cache
            queryClient.setQueryData(
              ['product', item.product._id],
              response.product
            );
          } catch (error) {
            console.error(
              `Error fetching details for product ${item.product._id}:`,
              error
            );
          }
        });

        await Promise.all(fetchPromises);
        setItemDetails(details);

        const cartItems = cartData.cart.map((item) => {
          const productDetails = details[item.product._id] || item.product;
          // Find the variant that matches the one in the cart
          const matchingVariant = productDetails.variants?.find(
            (variant) => variant._id === item.variantId?.[0]
          );
          return {
            ...item,
            product: productDetails,
            variant: matchingVariant || null,
            variantId: item.variantId || 'none',
          };
        });

        setItems(cartItems);
        const total =
          cartItems.reduce((acc, item) => {
            const productDetails = details[item.product._id] || item.product;
            const price =
              item.variant?.price?.discountedPrice ||
              productDetails.discountedPrice ||
              productDetails.price;
            console.log(price, item);
            return acc + price * item.quantity;
          }, 0) + (shippingDetails?.shippingCost || 0);
        setTotalAmount(total);
      }
    };

    fetchItemDetails();
  }, [
    productId,
    cartData,
    singleProduct,
    selectedVariant,
    queryClient,
    shippingDetailsResponse,
  ]);

  if (isCartLoading || isAddressLoading || (productId && isProductLoading)) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600' />
      </div>
    );
  }

  const handleInputChange = (field, value) => {
    setOrderDetails((prev) => ({
      ...prev,
      shippingAddress: {
        ...prev.shippingAddress,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let shippingAddress;
    if (showAddressForm) {
      shippingAddress = {
        full_name: orderDetails.shippingAddress.deliveredToWhom,
        address_line1: orderDetails.shippingAddress.address,
        address_line2: orderDetails.shippingAddress.street,
        landmark: orderDetails.shippingAddress.landmark,
        city: orderDetails.shippingAddress.city || 'Imphal',
        state: orderDetails.shippingAddress.state,
        pincode: orderDetails.shippingAddress.pincode,
        phone: orderDetails.shippingAddress.phone,
      };
    } else {
      const selectedAddr = addresses.find(
        (addr) => addr._id === selectedAddress
      );
      shippingAddress = {
        full_name: selectedAddr.deliveredToWhom,
        address_line1: selectedAddr.address,
        address_line2: selectedAddr.street,
        landmark: selectedAddr.landmark,
        city: selectedAddr.city || 'Imphal',
        state: selectedAddr.state,
        pincode: selectedAddr.pincode,
        phone: selectedAddr.phone,
      };
    }

    const orderProducts = items.map((item) => ({
      productId: item.product._id,
      variantId: item.variant?._id,
      quantity: item.quantity,
    }));

    createOrder(
      {
        amount: totalAmount,
        payment_type: orderDetails.paymentMethod === 'cod' ? 'COD' : 'Online',
        products: orderProducts,
        shipping_address: shippingAddress,
      },
      {
        onSuccess: (response) => {
          console.log(response);
          navigate(`/order/${response.order._id}`);
        },
        onError: (error) => {
          console.error('Error creating order:', error);
        },
      }
    );
  };

  const handleAddAddress = () => {
    if (showAddressForm) {
      // Submit the new address
      createAddress(
        {
          deliveredToWhom: orderDetails.shippingAddress.deliveredToWhom,
          address: orderDetails.shippingAddress.address,
          street: orderDetails.shippingAddress.street,
          landmark: orderDetails.shippingAddress.landmark,
          city: orderDetails.shippingAddress.city || 'Imphal',
          state: orderDetails.shippingAddress.state,
          pincode: orderDetails.shippingAddress.pincode,
          phone: orderDetails.shippingAddress.phone,
          district: orderDetails.shippingAddress.district,
        },
        {
          onSuccess: (response) => {
            queryClient.invalidateQueries(['addresses']).then(() => {
              setShowAddressForm(false);
              // Auto select the newly added address
              setSelectedAddress(response.data._id);
              // Reset form
              setOrderDetails((prev) => ({
                ...prev,
                shippingAddress: {
                  deliveredToWhom: '',
                  address: '',
                  street: '',
                  city: '',
                  state: '',
                  pincode: '',
                  phone: '',
                  landmark: '',
                  district: '',
                },
              }));
            });
          },
        }
      );
    } else {
      setSelectedAddress(null); // Clear selected address when showing form
      setShowAddressForm(true);
    }
  };

  const handleCancelAddAddress = () => {
    setShowAddressForm(false);
    // Restore previously selected address if exists
    if (addresses?.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      setSelectedAddress(defaultAddress?._id || addresses[0]._id);
    }
  };

  const selectedAddressDetails = addresses?.find(
    (addr) => addr._id === selectedAddress
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-4 sm:py-8'>
      <div className='container mx-auto px-2 sm:px-4 max-w-6xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-xl'
        >
          <h1 className='text-xl sm:text-2xl font-bold mb-4 sm:mb-8 text-gray-800'>
            Checkout
          </h1>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8'>
            <div className='space-y-4 sm:space-y-6'>
              <div className='bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
                  <h2 className='text-lg sm:text-xl font-semibold text-gray-800'>
                    Shipping Information
                  </h2>
                  <div className='flex gap-2 w-full sm:w-auto'>
                    {showAddressForm && addresses?.length > 0 && (
                      <Button
                        variant='light'
                        color='red'
                        onClick={handleCancelAddAddress}
                        className='flex-1 sm:flex-none'
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      variant='light'
                      color={showAddressForm ? 'green' : 'blue'}
                      onClick={handleAddAddress}
                      className='flex-1 sm:flex-none'
                    >
                      {showAddressForm ? 'Save Address' : 'Add New Address'}
                    </Button>
                  </div>
                </div>

                {!showAddressForm && addresses?.length > 0 && (
                  <>
                    <Select
                      placeholder='Select Delivery Address'
                      label='Select Delivery Address'
                      value={selectedAddress}
                      onChange={setSelectedAddress}
                      data={addresses?.map((addr) => ({
                        value: addr._id,
                        label: `${addr.deliveredToWhom} - ${addr.address}, ${addr.district}, ${addr.state}, ${addr.pincode}, ${addr.phone}, ${addr.street}, ${addr.landmark}`,
                      }))}
                      className='w-full'
                    />

                    {selectedAddressDetails && (
                      <div className='mt-3 sm:mt-4 p-2 sm:p-3 bg-white/60 rounded-lg text-sm'>
                        <h3 className='font-medium text-gray-800 mb-1.5 text-xs uppercase tracking-wide'>
                          Selected Address Details
                        </h3>
                        <div className='space-y-0.5 font-light'>
                          <p className='text-gray-700'>
                            {selectedAddressDetails.deliveredToWhom}
                          </p>
                          <p className='text-gray-600 text-xs'>
                            {selectedAddressDetails.address}
                          </p>
                          <p className='text-gray-600 text-xs'>
                            {selectedAddressDetails.street},{' '}
                            {selectedAddressDetails.landmark}
                          </p>
                          <p className='text-gray-600 text-xs'>
                            {selectedAddressDetails.city},{' '}
                            {selectedAddressDetails.district}
                          </p>
                          <p className='text-gray-600 text-xs'>
                            {selectedAddressDetails.state} -{' '}
                            {selectedAddressDetails.pincode}
                          </p>
                          <p className='text-gray-600 text-xs'>
                            Phone: {selectedAddressDetails.phone}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {showAddressForm && (
                  <div className='space-y-3 sm:space-y-4'>
                    <TextInput
                      label='Full Name'
                      value={orderDetails.shippingAddress.deliveredToWhom}
                      onChange={(e) =>
                        handleInputChange('deliveredToWhom', e.target.value)
                      }
                      required
                      className='w-full'
                    />

                    <TextInput
                      label='Phone Number'
                      value={orderDetails.shippingAddress.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      required
                      className='w-full'
                    />

                    <TextInput
                      label='Address'
                      value={orderDetails.shippingAddress.address}
                      onChange={(e) =>
                        handleInputChange('address', e.target.value)
                      }
                      required
                      className='w-full'
                    />

                    <TextInput
                      label='Street'
                      value={orderDetails.shippingAddress.street}
                      onChange={(e) =>
                        handleInputChange('street', e.target.value)
                      }
                      required
                      className='w-full'
                    />

                    <TextInput
                      label='Landmark'
                      value={orderDetails.shippingAddress.landmark}
                      onChange={(e) =>
                        handleInputChange('landmark', e.target.value)
                      }
                      required
                      className='w-full'
                    />

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                      <TextInput
                        label='City'
                        value={orderDetails.shippingAddress.city}
                        onChange={(e) =>
                          handleInputChange('city', e.target.value)
                        }
                        required
                        className='w-full'
                      />

                      <TextInput
                        label='District'
                        value={orderDetails.shippingAddress.district}
                        onChange={(e) =>
                          handleInputChange('district', e.target.value)
                        }
                        required
                        className='w-full'
                      />
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                      <TextInput
                        label='State'
                        value={orderDetails.shippingAddress.state}
                        onChange={(e) =>
                          handleInputChange('state', e.target.value)
                        }
                        required
                        className='w-full'
                      />

                      <TextInput
                        label='Pincode'
                        value={orderDetails.shippingAddress.pincode}
                        onChange={(e) =>
                          handleInputChange('pincode', e.target.value)
                        }
                        required
                        className='w-full'
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className='bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6'>
                <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4'>
                  Payment Method
                </h2>
                <Select
                  value={orderDetails.paymentMethod}
                  onChange={(value) =>
                    setOrderDetails((prev) => ({
                      ...prev,
                      paymentMethod: value,
                    }))
                  }
                  data={[
                    { value: 'cod', label: 'Cash on Delivery' },
                    { value: 'online', label: 'Online Payment' },
                  ]}
                  className='w-full'
                />
              </div>
            </div>

            <div className='space-y-4 sm:space-y-6'>
              <div className='bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6'>
                <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4'>
                  Order Summary
                </h2>
                <div className='space-y-3 sm:space-y-4'>
                  {items?.map((item) => {
                    const productDetails =
                      itemDetails[item.product._id]?.product || item.product;
                    return (
                      <div
                        key={item._id}
                        className='flex gap-3 sm:gap-4 py-2 border-b border-gray-200 last:border-0'
                      >
                        <img
                          src={`${
                            CloudinaryConfig.CLOUDINARY_URL
                          }/image/upload/v1700463893/${
                            productDetails.images?.[0]?.url ||
                            productDetails.image_id?.[0]
                          }`}
                          alt={productDetails.name}
                          className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg'
                        />
                        <div className='flex-1'>
                          <h3 className='font-medium text-gray-800 text-sm sm:text-base'>
                            {productDetails.name}
                          </h3>
                          {item.variant && (
                            <p className='text-xs sm:text-sm text-gray-600'>
                              {item.variant.color?.name} -{' '}
                              {item.variant.size?.value}
                            </p>
                          )}
                          <div className='flex justify-between items-center mt-1 sm:mt-2'>
                            <p className='text-purple-600 font-medium text-sm sm:text-base'>
                              ₹
                              {item.variant?.price?.discountedPrice ||
                                productDetails.discountedPrice ||
                                productDetails.price}
                            </p>
                            <p className='text-gray-600 text-sm'>
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className='mt-4 sm:mt-6 space-y-2'>
                  <div className='flex justify-between text-gray-600 text-sm sm:text-base'>
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className='flex justify-between text-gray-600 text-sm sm:text-base'>
                    <span>Shipping</span>
                    <span>₹{shippingDetails?.shippingCost || 0}</span>
                  </div>
                  <div className='flex justify-between font-semibold text-base sm:text-lg pt-3 sm:pt-4 border-t'>
                    <span>Total</span>
                    <span className='text-purple-600'>₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              <Button
                variant='gradient'
                gradient={{ from: 'indigo', to: 'purple' }}
                size='lg'
                fullWidth
                onClick={handleSubmit}
                disabled={!selectedAddress || showAddressForm}
                className='h-10 sm:h-12 text-sm sm:text-base'
              >
                Place Order
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
