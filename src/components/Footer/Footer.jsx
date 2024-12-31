import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { v4 } from 'uuid';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-b from-gray-50 to-gray-100'>
      <div className='container mx-auto px-4 pt-16 pb-8'>
        <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-12'>
          {/* Brand Section */}
          <div className='col-span-1'>
            <div className='flex flex-col space-y-4'>
              <img
                className='w-[180px] h-[100px] object-contain'
                src='/logo_latest.jpeg'
                alt='EyongKart Logo'
              />
              <p className='text-gray-600 text-sm leading-relaxed'>
                Discover the rich heritage of handloom products at EyongKart. We
                bring you authentic, handcrafted treasures that celebrate
                traditional artisanship and cultural excellence.
              </p>
              <div className='flex space-x-4 pt-4'>
                <Link
                  to='/facebook'
                  className='text-gray-600 hover:text-blue-600 transition-colors'
                >
                  <FaFacebook size={24} />
                </Link>
                <Link
                  to='/twitter'
                  className='text-gray-600 hover:text-blue-400 transition-colors'
                >
                  <FaTwitter size={24} />
                </Link>
                <Link
                  to='/instagram'
                  className='text-gray-600 hover:text-pink-600 transition-colors'
                >
                  <FaInstagram size={24} />
                </Link>
                <Link
                  to='/linkedin'
                  className='text-gray-600 hover:text-blue-800 transition-colors'
                >
                  <FaLinkedin size={24} />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className='col-span-1'>
            <h3 className='text-lg font-bold mb-6 text-gray-900'>
              Quick Links
            </h3>
            <ul className='space-y-3'>
              {['Home', 'About Us', 'Products', 'Contact'].map(
                (item, index) => (
                  <li key={v4()}>
                    <Link
                      to={
                        item === 'Home'
                          ? '/'
                          : `/${item.toLowerCase().replace(' ', '')}`
                      }
                      className='text-gray-600 hover:text-red-500 transition-colors duration-300 text-sm flex items-center'
                    >
                      <span className='hover:translate-x-1 transition-transform duration-300'>
                        {item}
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Service */}
          <div className='col-span-1'>
            <h3 className='text-lg font-bold mb-6 text-gray-900'>
              Customer Service
            </h3>
            <ul className='space-y-3'>
              {[
                ['Shipping & Delivery', '/shipping'],
                ['Returns & Refunds', '/cancel'],
                ['Terms & Conditions', '/tac'],
                ['Privacy Policy', '/privacypolicy'],
              ].map(([text, path], index) => (
                <li key={v4()}>
                  <Link
                    to={path}
                    className='text-gray-600 hover:text-red-500 transition-colors duration-300 text-sm flex items-center'
                  >
                    <span className='hover:translate-x-1 transition-transform duration-300'>
                      {text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className='col-span-1'>
            <h3 className='text-lg font-bold mb-6 text-gray-900'>
              Get In Touch
            </h3>
            <div className='space-y-4'>
              <div className='flex items-start space-x-3'>
                <div className='min-w-[24px] text-red-500'>📧</div>
                <div>
                  <p className='text-gray-600 text-sm'>support@eyongkart.com</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='min-w-[24px] text-red-500'>📞</div>
                <div>
                  <p className='text-gray-600 text-sm'>+91 123 456 7890</p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <div className='min-w-[24px] text-red-500'>📍</div>
                <div>
                  <p className='text-gray-600 text-sm'>
                    Uripok,
                    <br />
                    Manipur, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-16 pt-8 border-t border-gray-200'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-600 text-sm'>
              © {new Date().getFullYear()} EyongKart. All rights reserved.
            </p>
            <div className='mt-4 md:mt-0'>
              <p className='text-gray-500 text-sm'>
                Crafted with ❤️ for Manipur (Relief Camp) Artisans
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
