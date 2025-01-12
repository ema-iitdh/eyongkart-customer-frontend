import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { v4 } from 'uuid';
import { useEyongkartInfo } from '@/features/eyongkartInfo/hooks/useEyongkartInfo';
import { ROUTES } from '@/constants/routes';

const Footer = () => {
  const { data, isLoading, error } = useEyongkartInfo();

  if (isLoading)
    return (
      <div className='animate-pulse bg-gradient-to-b from-gray-50 to-gray-100 min-h-[400px]'>
        <div className='container mx-auto px-4 pt-16 pb-8'>
          <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-12'>
            <div className='space-y-4'>
              <div className='h-[100px] w-[180px] bg-gray-200 rounded animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse' />
              <div className='flex space-x-4 pt-4'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='h-6 w-6 bg-gray-200 rounded-full animate-pulse'
                  />
                ))}
              </div>
            </div>
            {[1, 2, 3].map((section) => (
              <div key={section} className='space-y-4'>
                <div className='h-6 bg-gray-200 rounded w-1/3 animate-pulse' />
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className='h-4 bg-gray-200 rounded w-1/2 animate-pulse'
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className='text-red-500 p-4 rounded-lg bg-red-50 border border-red-200'>
        <p className='font-medium'>Error loading footer content</p>
        <p className='text-sm'>{error.message}</p>
      </div>
    );

  const customerService = [
    ['shippingPolicy', 'Shipping & Delivery', '/shipping'],
    ['returnsAndRefunds', 'Returns & Refunds', '/cancel'],
    ['termsAndConditions', 'Terms & Conditions', '/tac'],
    ['privacyPolicy', 'Privacy Policy', '/privacypolicy'],
  ].filter(([dbKey]) => data?.eyongkartInfo?.[0]?.[dbKey]?.content);

  const quickLinks = [
    ['Home', '/'],
    ['Products', `${ROUTES.COLLECTIONS}/Products`],
    ['About Us', ROUTES.ABOUT_US],
  ];

  return (
    <footer className='bg-gradient-to-b from-gray-50 to-gray-10'>
      <div className='container mx-auto px-4 pt-16 pb-8'>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-12'>
          {/* Brand Section */}
          <div className='col-span-1'>
            <div className='flex flex-col space-y-4'>
              <img
                className='w-[180px] h-[100px] object-contain hover:opacity-90 transition-opacity'
                src={data?.eyongkartInfo?.[0]?.companyInfo?.logo}
                alt='EyongKart Logo'
              />
              <p className='text-gray-600 text-sm leading-relaxed line-clamp-4 hover:line-clamp-none transition-all duration-300'>
                {data?.eyongkartInfo?.[0]?.companyInfo?.description}
              </p>
              <div className='flex space-x-4 pt-4'>
                {data?.eyongkartInfo?.[0]?.socialLinks?.facebook && (
                  <Link
                    to={data?.eyongkartInfo?.[0]?.socialLinks?.facebook}
                    className='text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all'
                    aria-label='Facebook'
                  >
                    <FaFacebook size={24} />
                  </Link>
                )}
                {data?.eyongkartInfo?.[0]?.socialLinks?.twitter && (
                  <Link
                    to={data?.eyongkartInfo?.[0]?.socialLinks?.twitter}
                    className='text-gray-600 hover:text-blue-400 transform hover:scale-110 transition-all'
                    aria-label='Twitter'
                  >
                    <FaTwitter size={24} />
                  </Link>
                )}
                {data?.eyongkartInfo?.[0]?.socialLinks?.instagram && (
                  <Link
                    to={data?.eyongkartInfo?.[0]?.socialLinks?.instagram}
                    className='text-gray-600 hover:text-pink-600 transform hover:scale-110 transition-all'
                    aria-label='Instagram'
                  >
                    <FaInstagram size={24} />
                  </Link>
                )}
                {data?.eyongkartInfo?.[0]?.socialLinks?.linkedin && (
                  <Link
                    to={data?.eyongkartInfo?.[0]?.socialLinks?.linkedin}
                    className='text-gray-600 hover:text-blue-800 transform hover:scale-110 transition-all'
                    aria-label='LinkedIn'
                  >
                    <FaLinkedin size={24} />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          {quickLinks.length > 0 && (
            <div className='col-span-1'>
              <h3 className='text-lg font-bold mb-6 text-gray-900 relative after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-red-500'>
                Quick Links
              </h3>
              <ul className='space-y-3'>
                {quickLinks.map(([text, link]) => (
                  <li key={v4()}>
                    <Link
                      to={link}
                      className='text-gray-600 hover:text-red-500 transition-colors duration-300 text-sm flex items-center group'
                    >
                      <span className='transform group-hover:translate-x-2 transition-transform duration-300 ease-in-out'>
                        {text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Customer Service */}
          {customerService.length > 0 && (
            <div className='col-span-1'>
              <h3 className='text-lg font-bold mb-6 text-gray-900 relative after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-red-500'>
                Customer Service
              </h3>
              <ul className='space-y-3'>
                {customerService.map(([dbKey, text, link]) => {
                  return (
                    <li key={v4()}>
                      <Link
                        to={link}
                        className='text-gray-600 hover:text-red-500 transition-colors duration-300 text-sm flex items-center group'
                      >
                        <span className='transform group-hover:translate-x-2 transition-transform duration-300 ease-in-out'>
                          {text}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          {data?.eyongkartInfo?.[0]?.contactInfo && (
            <div className='col-span-1'>
              <h3 className='text-lg font-bold mb-6 text-gray-900 relative after:content-[""] after:absolute after:-bottom-2 after:left-0 after:w-12 after:h-1 after:bg-red-500'>
                Get In Touch
              </h3>
              <div className='space-y-4'>
                {data?.eyongkartInfo?.[0]?.contactInfo?.email && (
                  <div className='flex items-center space-x-3'>
                    <div className='min-w-[24px] text-red-500'>📧</div>
                    <div>
                      <p className='text-gray-600 text-sm'>
                        <a
                          href={`mailto:${data?.eyongkartInfo?.[0]?.contactInfo?.email}`}
                          className='hover:underline'
                        >
                          {data?.eyongkartInfo?.[0]?.contactInfo?.email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {data?.eyongkartInfo?.[0]?.contactInfo?.phone && (
                  <div className='flex items-center space-x-3'>
                    <div className='min-w-[24px] text-red-500'>📞</div>
                    <div>
                      <p className='text-gray-600 text-sm'>
                        <a
                          href={`tel:${data?.eyongkartInfo?.[0]?.contactInfo?.phone}`}
                          className='hover:underline'
                        >
                          {data?.eyongkartInfo?.[0]?.contactInfo?.phone}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {data?.eyongkartInfo?.[0]?.contactInfo?.address && (
                  <div className='flex items-center space-x-3'>
                    <div className='min-w-[24px] text-red-500'>📍</div>
                    <div>
                      <p className='text-gray-600 text-sm'>
                        <a
                          href={
                            data?.eyongkartInfo?.[0]?.contactInfo?.mapURL || '#'
                          }
                          target='_blank'
                          rel='noopener noreferrer'
                          className='hover:underline'
                        >
                          {data?.eyongkartInfo?.[0]?.contactInfo?.address}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        {data?.eyongkartInfo?.[0]?.copyright && (
          <div className='mt-16 pt-8 border-t border-gray-200'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
              {data?.eyongkartInfo?.[0]?.copyright && (
                <p className='text-gray-600 text-sm'>
                  © {new Date().getFullYear()}{' '}
                  {data?.eyongkartInfo?.[0]?.copyright}
                </p>
              )}
              {data?.eyongkartInfo?.[0]?.developersMessage && (
                <div className='mt-4 md:mt-0'>
                  <p className='text-gray-500 text-sm flex items-center gap-2'>
                    {data?.eyongkartInfo?.[0]?.developersMessage}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
