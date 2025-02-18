import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr';
import { BsFillArchiveFill, BsFillBoxFill } from 'react-icons/bs';
// import { Tooltip, Button, Avatar } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { X, Menu, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Axios from '../../../api/axiosInstance';
import SearchBar from '../../Search/SearchBar';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useLogout } from '@/features/auth/hooks/useAuth';
import {
  useAddress,
  useCreateAddress,
} from '@/features/address/hooks/useAddress';
import Logo from '../Logo';
import CategoryDropdown from './_components/CategoryDropdown';
import CategoryDropdownMobileView from './_components/CategoryDropdownMobileView';
import NavItem from './_components/NavItem';
import { useAddToCart, useCart } from '@/features/cart/hooks/useCart';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';
import useCartStore from '@/store/useCartStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const { mutate: logout, isPending } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const { data: cart } = useCart();

  const { data: wishlist } = useWishlist();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className=' z-40 bg-white shadow-md px-5'>
      <div className='container mx-auto px-2'>
        <div className='flex items-center justify-between h-14'>
          <div className='flex items-center gap-4'>
            <Logo />
            <CategoryDropdown />
          </div>

          <div className='flex items-center gap-2'>
            <SearchBar />

            <div className='hidden md:flex items-center gap-5 text-xs'>
              {isAuthenticated && (
                <>
                  <NavItem
                    icon={<FaShoppingCart size={21} />}
                    title='Cart'
                    badgeCount={cart?.cart?.length}
                    to='/cart'
                  />
                  <NavItem
                    badgeCount={wishlist?.wishlist?.items?.length}
                    icon={<GrFavorite size={21} />}
                    title='Wishlist'
                    to='/wishlist'
                  />

                  <NavItem
                    icon={<BsFillArchiveFill size={21} />}
                    title='Orders'
                    to='/myorder'
                  />

                  {/* <NavItem
                    icon={<BsFillBoxFill size={21} />}
                    title='Become a Seller'
                    to='/sellOn'
                  /> */}
                </>
              )}

              <div className='relative group'>
                {isAuthenticated ? (
                  <div className='flex items-center gap-2'>
                    {/* <span className='text-sm text-gray-700'>{user?.email}</span> */}
                    <Avatar className='drop-shadow-md' key={user?.picture}>
                      <AvatarImage src={user?.picture} />
                      <AvatarFallback className='bg-orange-500 font-extrabold text-white'>
                        {user?.userName?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className='absolute group right-0 top-9 mt-2 w-72 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50'>
                      <div className='p-4 space-y-3'>
                        <h2 className='font-sans font-bold text-lg relative'>
                          My Profile
                          <span className='h-1 w-[40px] group-hover:w-[120px] bg-rose-500 absolute -bottom-1 left-0 transition-all duration-300' />
                        </h2>
                        <div className='flex items-center gap-3 pb-3 border-b border-gray-200'>
                          <Avatar className='drop-shadow-md bg-yellow-'>
                            <AvatarImage src={user?.picture} />
                            <AvatarFallback className='bg-orange-500 font-extrabold text-white'>
                              {user?.userName?.charAt(0)?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className='font-medium text-sm'>
                              {user?.userName || 'User'}
                            </p>
                            <p className='text-xs text-gray-500'>
                              {user?.email}
                            </p>
                          </div>
                        </div>

                        {/* <NavLink
                          to='/profile'
                          className='block text-sm text-gray-700 hover:text-red-500 transition-colors py-1.5'
                        >
                          My Profile
                        </NavLink>

                        <NavLink
                          to='/settings'
                          className='block text-sm text-gray-700 hover:text-red-500 transition-colors py-1.5'
                        >
                          Account Settings
                        </NavLink> */}

                        <button
                          type='button'
                          onClick={() => logout()}
                          disabled={isPending}
                          className='w-full text-center p-2 rounded-lg text-sm bg-rose-600 text-slate-100 hover:bg-rose-700 transition-colors py-1.5 font-medium'
                        >
                          {isPending ? 'Logging out...' : 'Sign Out'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink to='/login' className='cursor-pointer'>
                    <Avatar className='drop-shadow-md bg-yellow-'>
                      <AvatarImage src={null} />
                      <AvatarFallback className='bg-orange-500 font-extrabold text-white'>
                        <User size={20} />
                      </AvatarFallback>
                    </Avatar>
                    {/* <Avatar
                      src={null}
                      alt='User'
                      color='red'
                      size='sm'
                      className='cursor-pointer hover:scale-105 transition-transform'
                    /> */}
                  </NavLink>
                )}

                {!isAuthenticated && (
                  <div className='absolute right-0 top-9 mt-2 w-72 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50'>
                    <div className='p-4 space-y-3'>
                      <div className='text-center pb-3 border-b border-gray-200'>
                        <h3 className='font-medium text-gray-800'>
                          Welcome to Our Store
                        </h3>
                        <p className='text-xs text-gray-500 mt-1'>
                          Sign in for the best experience
                        </p>
                      </div>

                      <NavLink
                        to='/login'
                        className='block w-full text-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium'
                      >
                        Sign In
                      </NavLink>

                      <div className='text-center text-sm'>
                        <span className='text-gray-600'>New customer? </span>
                        <NavLink
                          to='/signup'
                          className='text-blue-500 hover:underline font-medium'
                        >
                          Start here
                        </NavLink>
                      </div>

                      <div className='pt-3 border-t border-gray-200'>
                        {/* <NavLink
                          to='/track-order'
                          className='block text-sm text-gray-700 hover:text-red-500 transition-colors py-1.5'
                        >
                          Track your order
                        </NavLink> */}
                        {/* <NavLink
                          to='/help'
                          className='block text-sm text-gray-700 hover:text-red-500 transition-colors py-1.5'
                        >
                          Help & Support
                        </NavLink> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              type='button'
              onClick={toggleSidebar}
              className='lg:hidden text-gray-600 hover:text-gray-900 transition-colors'
            >
              {!isOpen && <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden z-50 flex flex-col`}
      >
        <div className='p-3 border-b'>
          <div className='flex items-center justify-between'>
            <NavLink to='/' className='flex-shrink-0'>
              <img src='/eyong.png' alt='Logo' className='h-8 w-auto' />
            </NavLink>
            <button
              type='button'
              onClick={toggleSidebar}
              className='text-gray-500 hover:text-gray-700'
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className='flex-1 overflow-y-auto'>
          <nav className='p-3 space-y-1 text-sm'>
            <CategoryDropdownMobileView toggleSidebar={toggleSidebar} />

            {isAuthenticated && (
              <NavLink
                to='/cart'
                onClick={toggleSidebar}
                className='flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-500 transition-colors'
              >
                <FaShoppingCart size={16} />
                <span>Cart</span>
              </NavLink>
            )}

            {isAuthenticated ? (
              <>
                <NavLink
                  to='/wishlist'
                  onClick={toggleSidebar}
                  className='flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-500 transition-colors'
                >
                  <GrFavorite size={16} />
                  <span>Wishlist</span>
                </NavLink>

                <NavLink
                  to='/myorder'
                  onClick={toggleSidebar}
                  className='flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-500 transition-colors'
                >
                  <BsFillArchiveFill size={16} />
                  <span>Orders</span>
                </NavLink>

                {/* <NavLink
                  to='/sellOn'
                  onClick={toggleSidebar}
                  className='flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-500 transition-colors'
                >
                  <BsFillBoxFill size={16} />
                  <span>Become a Seller</span>
                </NavLink> */}

                <div className='flex items-center gap-2 p-2'>
                  <Avatar className='drop-shadow-md bg-yellow-'>
                    <AvatarImage src={user?.picture} />
                    <AvatarFallback className='bg-orange-500 font-extrabold text-white'>
                      {user?.userName?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user?.userName}</span>
                </div>

                <button
                  type='button'
                  onClick={() => {
                    logout();
                    toggleSidebar();
                  }}
                  className='w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-500 transition-colors'
                >
                  <X size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <NavLink
                to='/login'
                onClick={toggleSidebar}
                className='flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-500 transition-colors'
              >
                <Avatar size={20} color='red' src={null}>
                  <AvatarFallback className='bg-orange-500 font-extrabold text-white'>
                    <User size={20} />
                  </AvatarFallback>
                </Avatar>
                <span>Sign In</span>
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
