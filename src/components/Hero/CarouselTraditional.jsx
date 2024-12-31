import Slider from 'react-slick';
import React, { useEffect, useState } from 'react';
import { CloudinaryConfig } from '../../../Cloudinary';
import Axios from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CarouselTraditional = () => {
  const navigate = useNavigate();
  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className='min-h-[180px] sm:min-h-[320px] md:min-h-[440px] flex items-center justify-center'>
        <div className='animate-pulse w-full h-full bg-gray-200 rounded-xl' />
      </div>
    );
  }

  return (
    <div className='relative mx-2 sm:m-3 sm:mt-0 rounded-xl overflow-hidden pb-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900'>
      <div className='p-2 w-full'>
        <Slider {...settings}>
          {carouselData.map((data) => (
            <div key={data._id} className='outline-none pb-[1rem] lg:pb-[3rem]'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-10 px-4 sm:px-8'>
                <div className='flex flex-col justify-center gap-3 sm:gap-4 md:gap-6 order-2 sm:order-1 relative z-10 text-center sm:text-left'>
                  <h2 className='text-xl sm:text-3xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 transition-colors'>
                    {data.subtitle}
                  </h2>
                  <h1 className='text-2xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-blue-300 bg-clip-text text-transparent'>
                    {data.title}
                  </h1>
                  <h1 className='text-2xl sm:text-4xl md:text-[65px] uppercase font-bold text-white drop-shadow-lg '>
                    {data.title2}
                  </h1>
                </div>

                <div className='order-1 sm:order-2 transform transition-transform hover:scale-105 duration-500'>
                  <img
                    src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/q_auto,f_auto/${data.img_id}`}
                    alt={data.title}
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
