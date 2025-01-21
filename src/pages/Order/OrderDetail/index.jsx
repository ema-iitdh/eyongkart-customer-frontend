import { useParams } from 'react-router-dom';
import { useGetOrderById } from '@/features/orders/hooks/userOrders';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudinaryConfig } from '@/constants/Cloudinary';

export default function OrderDetail() {
  const { orderId } = useParams();
  const { data: orderResponse, isLoading } = useGetOrderById(orderId);
  const order = orderResponse?.order;

  if (isLoading) {
    return (
      <div className='min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className='rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-purple-600'
        />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 py-4 sm:py-8 animate-gradient-xy'>
      <div className='container mx-auto px-2 sm:px-4 max-w-4xl'>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className='bg-white/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300'
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6'
            >
              <h1 className='text-xl sm:text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>
                Order Details
              </h1>
              <div className='flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-0'>
                <p className='text-xs sm:text-sm text-gray-600'>Order ID:</p>
                <p className='font-mono text-sm sm:text-base text-gray-800'>
                  {order?._id}
                </p>
              </div>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
              {/* Shipping Information */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/70 transition-colors duration-300'
              >
                <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4'>
                  Shipping Information
                </h2>
                <div className='space-y-1.5 sm:space-y-2 text-sm sm:text-base'>
                  <p className='font-medium text-gray-800'>
                    {order?.shipping_address.full_name}
                  </p>
                  <p className='text-gray-600'>
                    {order?.shipping_address.address_line1}
                  </p>
                  <p className='text-gray-600'>
                    {order?.shipping_address.address_line2}
                  </p>
                  <p className='text-gray-600'>
                    Near {order?.shipping_address.landmark}
                  </p>
                  <p className='text-gray-600'>
                    {order?.shipping_address.city},{' '}
                    {order?.shipping_address.state} -{' '}
                    {order?.shipping_address.pincode}
                  </p>
                  <p className='text-gray-600'>
                    Phone: {order?.shipping_address.phone}
                  </p>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className='bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/70 transition-colors duration-300'
              >
                <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4'>
                  Order Summary
                </h2>
                <div className='space-y-2 sm:space-y-3 text-sm sm:text-base'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Order Status</span>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`font-medium ${
                        order?.status === 'Delivered'
                          ? 'text-green-600'
                          : order?.status === 'Pending'
                          ? 'text-yellow-600'
                          : 'text-gray-800'
                      }`}
                    >
                      {order?.status}
                    </motion.span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Payment Method</span>
                    <span className='font-medium text-gray-800'>
                      {order?.payment_type}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Payment Status</span>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`font-medium ${
                        order?.payment.status === 'Paid'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {order?.payment.status}
                    </motion.span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Total Amount</span>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className='font-medium text-gray-800'
                    >
                      ₹{order?.amount}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Items */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className='mt-4 sm:mt-6 bg-white/60 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white/70 transition-colors duration-300'
            >
              <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4'>
                Order Items
              </h2>
              <div className='space-y-3 sm:space-y-4'>
                {order?.products.map((item, index) => (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    key={item._id}
                    className='flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-3 sm:pb-4 gap-2 sm:gap-4 hover:bg-white/40 rounded-lg transition-colors duration-300 p-2'
                  >
                    <div className='flex gap-3 flex-1'>
                      <div className='w-16 h-16 flex-shrink-0'>
                        <img
                          src={`${
                            CloudinaryConfig.CLOUDINARY_URL
                          }/image/upload/v1700463893/${
                            item?.product?.baseImage?.url ||
                            item?.product?.image_id?.[0]
                          }`}
                          alt={item.name}
                          className='w-full h-full object-cover rounded-lg shadow-md'
                        />
                      </div>
                      <div>
                        <h3 className='font-medium text-gray-800 text-sm sm:text-base'>
                          {item.name}
                        </h3>
                        <p className='text-xs sm:text-sm text-gray-600'>
                          Variant: {item.variant?.size?.value},{' '}
                          {item.variant?.color?.name}
                        </p>
                        <p className='text-xs sm:text-sm text-gray-600'>
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-medium text-gray-800 text-sm sm:text-base'>
                        ₹{item.price}
                      </p>
                      <p className='text-xs sm:text-sm text-gray-600'>
                        Total: ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
