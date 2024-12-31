import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = ({
  discount,
  title,
  date,
  imageUrl,
  title2,
  title3,
  bgColor,
  to = '#',
}) => {
  return (
    <div className='container mx-auto px-4 py-8 md:py-12 lg:py-16'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-full'
      >
        <div
          style={{ backgroundColor: bgColor }}
          className='relative overflow-hidden rounded-[2rem] shadow-2xl'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-[400px] lg:min-h-[450px]'>
            {/* First column - Text Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='p-6 md:p-12 flex flex-col justify-center'
            >
              <span className='inline-block px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-4'>
                {discount}% OFF
              </span>
              <h1 className='text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-4'>
                {title}
              </h1>
              <p className='text-white/90 mb-8'>{date}</p>
              <Link to={to}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='group relative inline-flex items-center px-8 py-3 bg-white rounded-full text-sm font-medium transition-all duration-300'
                  style={{ color: bgColor }}
                >
                  <span>Shop Now</span>
                  {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                  <svg
                    className='ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>

            {/* Second column - Image */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='flex items-center justify-center p-6 md:p-0'
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={imageUrl}
                alt='Banner'
                className='w-[280px] md:w-[320px] lg:w-[400px] h-auto object-contain drop-shadow-2xl'
              />
            </motion.div>

            {/* Third column - Additional Text */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className='p-6 md:p-12 flex flex-col justify-center'
            >
              <div className='space-y-4'>
                <h2 className='text-xl md:text-2xl font-bold text-white/90'>
                  {title2}
                </h2>
                <p className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
                  {title3}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Background decoration */}
          <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none' />
          <div className='absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl' />
          <div className='absolute -top-1/2 -left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl' />
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
