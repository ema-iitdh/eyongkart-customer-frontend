import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/features/products/hooks/useProducts';
import { debounce } from 'lodash';
import { ROUTES } from '@/constants/routes';

const SearchBar = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [searchInputValue, setSearchInputValue] = useState(''); // New state for input value
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const { data } = useProducts({
    filter: searchProduct ? `search=${searchProduct}` : '',
    enabled: searchProduct.length > 0,
  });

  const filteredProducts = data?.products?.slice(0, 5) || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchProduct('');
        setSearchInputValue('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      debouncedSetSearch.cancel(); // Cancel any pending debounce on unmount
    };
  }, []);

  const debouncedSetSearch = debounce((value) => {
    setSearchProduct(value);
  }, 300);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value); // Update input value immediately
    debouncedSetSearch(value);
  };

  const handleSearch = () => {
    if (searchInputValue.trim()) {
      navigate(
        `${ROUTES.COLLECTIONS}/Result?search=${searchInputValue.trim()}`
      );
      setSearchProduct('');
      setSearchInputValue('');
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    // Changed from handleKeyUp to handleKeyDown
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission
      handleSearch();
    }
  };

  const handleProductClick = (product) => {
    if (!product?._id) return; // Guard against invalid product data
    setSearchProduct('');
    setSearchInputValue('');
    setIsSearchOpen(false);
    navigate(`${ROUTES.PRODUCT.LIST}/${product._id}`);
  };

  const clearSearch = () => {
    setSearchProduct('');
    setSearchInputValue('');
  };

  return (
    <div ref={searchRef} className='relative'>
      {/* Search Icon - Only shown below xl breakpoint (1280px) for mobile/tablet */}
      <div className='block xl:hidden'>
        <button
          type='button'
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className='p-1.5 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center'
          aria-label='Search'
        >
          <FaSearch className='w-4 h-4 text-gray-600' />
        </button>
      </div>

      {/* Desktop Search Bar & Mobile Search Modal 
          - On desktop (xl/1280px+): Always shown as a search bar
          - On mobile/tablet: Shows as a modal when search icon is clicked */}
      <AnimatePresence>
        {(isSearchOpen || window.innerWidth >= 1280) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`${
              isSearchOpen
                ? 'fixed inset-0 bg-white z-50 xl:relative xl:bg-transparent xl:inset-auto'
                : 'hidden xl:block'
            }`}
          >
            {isSearchOpen && (
              <div className='flex items-center justify-between p-3 border-b xl:hidden'>
                <h2 className='text-base font-medium'>Search</h2>
                <button
                  type='button'
                  onClick={() => setIsSearchOpen(false)}
                  className='p-1.5 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center'
                >
                  <IoMdClose className='w-4 h-4' />
                </button>
              </div>
            )}

            <div className='p-3 xl:p-0'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search for products'
                  value={searchInputValue}
                  className='w-full xl:w-48 py-1.5 px-4 pr-8 rounded-full border border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none text-sm'
                  onChange={handleOnChange}
                  onKeyDown={handleKeyDown}
                  aria-label='Search products'
                />
                <button
                  type='button'
                  onClick={searchInputValue ? clearSearch : handleSearch}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500 transition-colors flex items-center justify-center'
                  aria-label={searchInputValue ? 'Clear search' : 'Search'}
                >
                  {searchInputValue ? (
                    <IoMdClose className='w-4 h-4 cursor-pointer' />
                  ) : (
                    <FaSearch className='w-4 h-4' />
                  )}
                </button>
              </div>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchProduct && filteredProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[250px] overflow-y-auto z-50 ${
                    isSearchOpen ? 'mx-3 xl:mx-0' : ''
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <button
                      type='button'
                      key={product.id || product._id}
                      className='w-full px-3 py-1.5 text-left hover:bg-red-50 transition-colors flex items-center gap-2 text-sm'
                      onClick={() => handleProductClick(product)}
                    >
                      <FaSearch className='w-3.5 h-3.5 text-gray-400' />
                      <span className='truncate'>{product.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
