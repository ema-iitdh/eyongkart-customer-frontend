import Slider from 'react-slick';
import React, { useEffect, useState } from 'react';
import { CloudinaryConfig } from '../../../Cloudinary';
import Axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useCarouselProducts } from '@/features/products/hooks/useProducts';
import { ROUTES } from '@/constants/routes';

const CarouselSkeleton = () => {
  return (
    <div className='relative container w-[95svw] justify-self-center mx-auto sm:m-3 sm:mt-0 rounded-xl overflow-hidden py-5 bg-gradient-to-r from-orange-300 to-yellow-400 dark:from-gray-800 dark:to-gray-900'>
      <div className='p-2 mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-x-10 px-4 sm:px-8'>
          <div className='flex flex-col justify-center gap-4 sm:gap-6 order-2 sm:order-1 relative z-10'>
            <div className='h-6 sm:h-8 bg-gray-200 rounded-md animate-pulse w-1/2' />
            <div className='h-8 sm:h-12 bg-gray-200 rounded-md animate-pulse w-3/4' />
            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mt-2'>
              <div className='flex items-center gap-3'>
                <div className='h-6 sm:h-8 bg-gray-200 rounded-md animate-pulse w-24' />
                <div className='h-8 sm:h-10 bg-gray-200 rounded-md animate-pulse w-32' />
              </div>
              <div className='h-6 sm:h-8 bg-gray-200 rounded-full animate-pulse w-20' />
            </div>
          </div>
          <div className='order-1 sm:order-2 flex items-center justify-center'>
            <div className='w-[200px] h-[140px] xs:w-[240px] xs:h-[160px] sm:w-[280px] sm:h-[240px] md:w-[350px] md:h-[320px] bg-gray-200 rounded-lg animate-pulse' />
          </div>
        </div>
      </div>
    </div>
  );
};

const CarouselTraditional = () => {
  const navigate = useNavigate();
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data, isLoading: isProductsLoading } = useCarouselProducts();

  console.log(data?.products);

  const productsWithDiscount = data?.products
    .filter(
      (product) =>
        product?.variants?.[0]?.price.discount > 0 || product?.discount > 0
    )
    .slice(0, 6);

  // Only show arrows if there is more than 1 product
  const NextArrow = ({ onClick }) => {
    if (productsWithDiscount?.length <= 1) return null;
    return (
      <button
        onClick={onClick}
        type='button'
        className='absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center bg-black/20 hover:bg-black/70 rounded-full'
      >
        <ChevronRight className='w-8 h-8 text-white' />
      </button>
    );
  };

  const PrevArrow = ({ onClick }) => {
    if (productsWithDiscount?.length <= 1) return null;
    return (
      <button
        onClick={onClick}
        type='button'
        className='absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center bg-black/20 hover:bg-black/70 rounded-full'
      >
        <ChevronLeft className='w-8 h-8 text-white' />
      </button>
    );
  };

  // Configure slider settings based on number of products
  const settings = {
    dots: productsWithDiscount?.length > 1, // Only show dots if multiple products
    arrows: productsWithDiscount?.length > 1, // Only show arrows if multiple products
    infinite: productsWithDiscount?.length > 1, // Only enable infinite scroll if multiple products
    speed: 1000,
    slidesToShow: 1,
    autoplay: productsWithDiscount?.length > 1, // Only autoplay if multiple products
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    pauseOnHover: true,
    pauseOnFocus: true,
    dotsClass: 'slick-dots custom-dots',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // Fix vertical duplication by setting adaptiveHeight to true
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: productsWithDiscount?.length > 1,
          dots: productsWithDiscount?.length > 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: productsWithDiscount?.length > 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          dots: productsWithDiscount?.length > 1,
        },
      },
    ],
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  if (isProductsLoading) {
    return <CarouselSkeleton />;
  }

  if (!productsWithDiscount?.length) {
    return null;
  }

  return (
    <div className='relative container w-[95svw] justify-self-center mx-auto rounded-xl overflow-hidden py-5 bg-gradient-to-r from-orange-300 to-yellow-400 dark:from-gray-800 dark:to-gray-900'>
      <div className='p-2 mx-auto'>
        <Slider {...settings}>
          {productsWithDiscount?.map((product) => (
            <div key={product._id} className='outline-none'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-x-10 px-4 sm:px-8'>
                <div className='flex flex-col justify-center gap-2 sm:gap-3 md:gap-3 order-2 sm:order-1 relative z-10 text-center sm:text-left'>
                  <h2 className='text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors line-clamp-2'>
                    {product?.category?.name}
                  </h2>
                  <h1 className='text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-300 bg-clip-text text-transparent line-clamp-2'>
                    {product?.name}
                  </h1>

                  <div className='flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mt-2'>
                    <div className='flex items-center gap-3'>
                      <span className='text-xl sm:text-2xl text-gray-500 line-through'>
                        ₹
                        {product?.variants[0]?.price?.markedUpPrice ||
                          product?.price ||
                          '1499'}
                      </span>
                      <span className='text-3xl sm:text-4xl font-bold text-indigo-600'>
                        ₹
                        {product?.variants[0]?.price?.discountedPrice ||
                          product?.discountedPrice ||
                          '999'}
                      </span>
                    </div>
                    <span className='px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold'>
                      {product?.variants[0]?.price?.discount}% OFF
                    </span>
                  </div>

                  <button
                    type='button'
                    onClick={() =>
                      navigate(`${ROUTES.PRODUCT.LIST}/${product._id}`)
                    }
                    className='mt-4 inline-flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 w-fit mx-auto sm:mx-0'
                  >
                    View Product
                    <ArrowRight className='w-4 h-4' />
                  </button>
                </div>

                <div className='order-1 sm:order-2 transform transition-transform hover:scale-105 duration-500'>
                  <img
                    src={`${
                      CloudinaryConfig.CLOUDINARY_URL
                    }/image/upload/q_auto,f_auto/${
                      product?.variants[0]?.images?.[0]?.url ||
                      product?.baseImage?.url ||
                      product?.image_id?.[0]
                    }`}
                    alt={product?.name}
                    className='w-[400px] h-[200px] xs:w-[240px] xs:h-[160px] sm:w-[280px] sm:h-[240px] md:w-[350px] md:h-[320px] object-contain mx-auto drop-shadow-2xl'
                    loading='lazy'
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarouselTraditional;
