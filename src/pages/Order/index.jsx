import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBox, FaCheckCircle, FaClock, FaShoppingBag } from 'react-icons/fa';
import { Button, Badge } from '@mantine/core';
import { Link } from 'react-router-dom';
import { CloudinaryConfig } from '../../../Cloudinary';
import { useGetMyOrders } from '@/features/orders/hooks/userOrders';
import Navbar from '@/components/common/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ChatBox from '@/components/Chat/ChatBox';

export default function Orders() {
  const { data: ordersData, isLoading } = useGetMyOrders();
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    if (ordersData?.orders) {
      setDeliveredOrders(
        ordersData.orders.filter((order) => order.status === 'Delivered')
      );
      setPendingOrders(
        ordersData.orders.filter((order) => order.status === 'Pending')
      );
    }
  }, [ordersData]);

  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-pink-500/20'>
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          className='w-16 h-16 border-4 border-violet-500 rounded-full border-t-transparent'
        />
      </div>
    );
  }

  return (
    <div className='min-h-screen flex flex-col bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 dark:from-gray-900 dark:to-gray-800 dark:text-white duration-200'>
      <div className='flex-grow container mx-auto px-4 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='max-w-4xl mx-auto'
        >
          <div className='mb-8'>
            <motion.h1
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className='text-3xl font-bold flex items-center gap-2 mb-6 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent'
            >
              <FaShoppingBag className='text-violet-500' />
              My Orders
            </motion.h1>

            {/* Pending Orders Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='mb-8'
            >
              <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
                <FaClock className='text-orange-500' />
                Pending Orders ({pendingOrders.length})
              </h2>

              <div className='space-y-4'>
                <AnimatePresence mode='popLayout'>
                  {pendingOrders?.map((order, index) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: index * 0.1,
                        },
                      }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      className='bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4'
                    >
                      <div className='flex flex-col sm:flex-row justify-between gap-4'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-2'>
                            <Badge color='orange' className='animate-pulse'>
                              {order.status.toUpperCase()}
                            </Badge>
                            <span className='text-sm text-gray-500'>
                              Order #{order._id.slice(-8)}
                            </span>
                          </div>

                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {order?.products?.map((item) => (
                              <motion.div
                                key={item._id}
                                className='flex gap-3'
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className='w-20 h-20 flex-shrink-0'>
                                  <img
                                    src={`${
                                      CloudinaryConfig.CLOUDINARY_URL
                                    }/image/upload/v1700463893/${
                                      item?.product?.images?.[0]?.url ||
                                      item?.product?.image_id?.[0]
                                    }`}
                                    alt={item?.product?.name}
                                    className='w-full h-full object-cover rounded-lg shadow-md'
                                  />
                                </div>
                                <div>
                                  <p className='font-medium'>{item.name}</p>
                                  <p className='text-sm text-gray-500'>
                                    Qty: {item.quantity}
                                  </p>
                                  <p className='text-violet-600 font-semibold'>
                                    ₹{item.price.toLocaleString()}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className='flex flex-col gap-2 sm:text-right'>
                          <p className='text-gray-500'>
                            Ordered on{' '}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className='font-bold text-lg bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent'>
                            Total: ₹{order?.amount?.toLocaleString()}
                          </p>
                          <Link to={`/order/${order._id}`}>
                            <Button
                              variant='gradient'
                              gradient={{ from: 'violet', to: 'fuchsia' }}
                              size='sm'
                              fullWidth
                              className='transition-transform hover:scale-105'
                            >
                              Track Order
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Delivered Orders Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className='text-xl font-semibold flex items-center gap-2 mb-4'>
                <FaCheckCircle className='text-green-500' />
                Delivered Orders ({deliveredOrders.length})
              </h2>

              <div className='space-y-4'>
                <AnimatePresence mode='popLayout'>
                  {deliveredOrders?.map((order, index) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: index * 0.1,
                        },
                      }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      className='bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-4'
                    >
                      <div className='flex flex-col sm:flex-row justify-between gap-4'>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-2'>
                            <Badge color='green'>DELIVERED</Badge>
                            <span className='text-sm text-gray-500'>
                              Order #{order._id.slice(-8)}
                            </span>
                          </div>

                          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {order?.products?.map((item) => (
                              <motion.div
                                key={item._id}
                                className='flex gap-3'
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className='w-20 h-20 flex-shrink-0'>
                                  <img
                                    src={`${
                                      CloudinaryConfig.CLOUDINARY_URL
                                    }/image/upload/v1700463893/${
                                      item?.product?.images?.[0]?.url ||
                                      item?.product?.image_id?.[0]
                                    }`}
                                    alt={item?.product?.name}
                                    className='w-full h-full object-cover rounded-lg shadow-md'
                                  />
                                </div>
                                <div>
                                  <p className='font-medium'>{item.name}</p>
                                  <p className='text-sm text-gray-500'>
                                    Qty: {item.quantity}
                                  </p>
                                  <p className='text-violet-600 font-semibold'>
                                    ₹{item.price.toLocaleString()}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className='flex flex-col gap-2 sm:text-right'>
                          <p className='text-gray-500'>
                            Delivered on{' '}
                            {new Date(order?.updatedAt).toLocaleDateString()}
                          </p>
                          <p className='font-bold text-lg bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent'>
                            Total: ₹{order?.amount?.toLocaleString()}
                          </p>
                          <Link to={`/order/${order._id}`}>
                            <Button
                              variant='gradient'
                              gradient={{ from: 'violet', to: 'fuchsia' }}
                              size='sm'
                              fullWidth
                              className='transition-transform hover:scale-105'
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {deliveredOrders?.length === 0 &&
                  pendingOrders?.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className='text-center py-12'
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: 'easeInOut',
                        }}
                      >
                        <FaBox className='mx-auto text-gray-300 text-6xl mb-4' />
                      </motion.div>
                      <p className='text-gray-500 text-lg mb-4'>
                        No orders found
                      </p>
                      <Link to='/' className='mt-4 inline-block'>
                        <Button
                          variant='gradient'
                          gradient={{ from: 'violet', to: 'fuchsia' }}
                          size='md'
                          className='transition-transform hover:scale-105'
                        >
                          Start Shopping
                        </Button>
                      </Link>
                    </motion.div>
                  )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <ChatBox />
      <Footer />
    </div>
  );
}
