import Slider from 'react-slick';
import React, { useEffect, useState } from 'react';
import { CloudinaryConfig } from '../../../Cloudinary';
import Axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
            <div className='w-[160px] h-[100px] xs:w-[200px] xs:h-[120px] sm:w-[280px] sm:h-[240px] md:w-[350px] md:h-[320px] bg-gray-200 rounded-lg animate-pulse' />
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

  const productsWithDiscount = data?.products
    .filter(
      (product) => product?.variants?.[0]?.discount > 0 || product?.discount > 0
    )
    .slice(0, 6);

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      type='button'
      className='absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center bg-black/20 hover:bg-black/70 rounded-full'
    >
      <ChevronRight className='w-8 h-8 text-white' />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      type='button'
      className='absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-14 h-14 flex items-center justify-center bg-black/20 hover:bg-black/70 rounded-full'
    >
      <ChevronLeft className='w-8 h-8 text-white' />
    </button>
  );

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    pauseOnHover: true,
    pauseOnFocus: true,
    dotsClass: 'slick-dots custom-dots',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const fetchCarouselData = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios({
        url: '/carousel',
        method: 'GET',
      });
      setCarouselData(data.list || []);
    } catch (error) {
      console.error('Error fetching carousel data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchCarouselData();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  if (isLoading || isProductsLoading) {
    return <CarouselSkeleton />;
  }

  if (!productsWithDiscount?.length) {
    return null;
  }

  return (
    <div className='relative container w-[95svw] justify-self-center mx-auto sm:m-3 sm:mt-0 rounded-xl overflow-hidden py-5 bg-gradient-to-r from-orange-300 to-yellow-400 dark:from-gray-800 dark:to-gray-900'>
      <div className='p-2 mx-auto'>
        <Slider {...settings}>
          {productsWithDiscount?.map((product) => (
            <div
              key={product._id}
              className='outline-none pb-[1rem] lg:pb-[3rem]'
              onClick={() => navigate(`${ROUTES.PRODUCT.LIST}/${product._id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`${ROUTES.PRODUCT.LIST}/${product._id}`);
                }
              }}
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-x-10 px-4 sm:px-8'>
                <div className='flex flex-col justify-center gap-2 sm:gap-3 md:gap-3 order-2 sm:order-1 relative z-10 text-center sm:text-left'>
                  <h2 className='text-base sm:text-lg lg:text-xl font-bold text-gray-800 dark:text-gray-100 transition-colors line-clamp-2'>
                    {product?.category?.name}
                  </h2>
                  <h1 className='text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-300 bg-clip-text text-transparent line-clamp-2'>
                    {product?.name}
                  </h1>
                  {/* <h1 className='text-2xl sm:text-4xl md:text-[65px] uppercase font-bold text-white drop-shadow-lg'>
                    {product?.title2}
                  </h1> */}

                  <div className='flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 mt-2'>
                    <div className='flex items-center gap-3'>
                      <span className='text-xl sm:text-2xl text-gray-500 line-through'>
                        ₹
                        {product?.variants[0]?.price ||
                          product?.price ||
                          '1499'}
                      </span>
                      <span className='text-3xl sm:text-4xl font-bold text-indigo-600'>
                        ₹
                        {product?.variants[0]?.discountedPrice ||
                          product?.discountedPrice ||
                          '999'}
                      </span>
                    </div>
                    <span className='px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold'>
                      {Math.round(
                        (((product?.variants[0]?.price || product?.price) -
                          (product?.variants[0]?.discountedPrice ||
                            product?.discountedPrice)) /
                          (product?.variants[0]?.price || product?.price)) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>
                </div>

                <div className='order-1 sm:order-2 transform transition-transform hover:scale-105 duration-500'>
                  <img
                    src={`${
                      CloudinaryConfig.CLOUDINARY_URL
                    }/image/upload/q_auto,f_auto/${
                      product?.variants[0]?.images?.[0]?.url ||
                      product?.image_id?.[0]
                    }`}
                    alt={product?.name}
                    className='w-[160px] h-[100px] xs:w-[200px] xs:h-[120px] sm:w-[280px] sm:h-[240px] md:w-[350px] md:h-[320px] object-contain mx-auto drop-shadow-2xl'
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
