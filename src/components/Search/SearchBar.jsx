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
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { data, isLoading } = useProducts({
    filter: searchProduct ? `search=${searchProduct}` : '',
    enabled: searchProduct.length > 0,
  });

  const filteredProducts = data?.products?.slice(0, 8) || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchProduct('');
        setSearchInputValue('');
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      debouncedSetSearch.cancel();
    };
  }, []);

  const debouncedSetSearch = debounce((value) => {
    setSearchProduct(value);
  }, 300);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);
    setSelectedIndex(-1);
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
      setSelectedIndex(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredProducts.length) {
        const selectedProduct = filteredProducts[selectedIndex];
        handleProductClick(selectedProduct, selectedProduct?.variants?.[0]?.id);
      } else {
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredProducts.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchProduct('');
      setSearchInputValue('');
      setSelectedIndex(-1);
      inputRef.current?.blur();
    }
  };

  const handleProductClick = (product, variantId) => {
    if (!product?._id) return;
    setSearchProduct('');
    setSearchInputValue('');
    setIsSearchOpen(false);
    setSelectedIndex(-1);
    navigate(`${ROUTES.PRODUCT.LIST}/${product._id}/${variantId}`);
  };

  const clearSearch = () => {
    setSearchProduct('');
    setSearchInputValue('');
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };
  return (
    <div ref={searchRef} className='relative'>
      <div className='block xl:hidden'>
        <button
          type='button'
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className='p-1.5 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center'
          aria-label='Toggle search'
          aria-expanded={isSearchOpen}
        >
          <FaSearch className='w-4 h-4 text-gray-600' />
        </button>
      </div>

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
                  aria-label='Close search'
                >
                  <IoMdClose className='w-4 h-4' />
                </button>
              </div>
            )}

            <div className='p-3 xl:p-0'>
              <div className='relative'>
                <label htmlFor='search-input' className='sr-only'>
                  Search for products
                </label>
                <input
                  ref={inputRef}
                  id='search-input'
                  type='text'
                  placeholder='Search for products'
                  value={searchInputValue}
                  className='w-full xl:w-48 py-1.5 px-4 pr-8 rounded-full border border-gray-300 focus:ring-1 focus:ring-gray-300 focus:outline-none text-sm'
                  onChange={handleOnChange}
                  onKeyDown={handleKeyDown}
                  role='combobox'
                  aria-expanded={searchProduct && filteredProducts.length > 0}
                  aria-controls='search-listbox'
                  aria-activedescendant={
                    selectedIndex >= 0
                      ? `search-option-${selectedIndex}`
                      : undefined
                  }
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

            <AnimatePresence>
              {searchInputValue && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[350px] overflow-y-auto z-50 xl:w-[400px] ${
                    isSearchOpen ? 'mx-3 xl:mx-0' : ''
                  }`}
                  id='search-listbox'
                  aria-label='Search suggestions'
                >
                  {isLoading ? (
                    <div className='p-4 text-center text-gray-500'>
                      <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-gray-500 mx-auto' />
                      <p className='mt-2 text-sm'>Searching...</p>
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <button
                        type='button'
                        key={product.id || product._id}
                        id={`search-option-${index}`}
                        className={`w-full px-3 py-2 text-left transition-colors flex items-center gap-2 text-sm ${
                          selectedIndex === index
                            ? 'bg-red-50 text-red-700'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() =>
                          handleProductClick(
                            product,
                            product?.variants?.[0]?.id
                          )
                        }
                        aria-selected={selectedIndex === index}
                      >
                        <FaSearch className='w-3.5 h-3.5 text-gray-400 flex-shrink-0' />
                        <div className='flex flex-col overflow-hidden w-full'>
                          <span className='truncate font-medium'>
                            {product.name}
                          </span>
                          {product.category && (
                            <span className='text-xs text-gray-500 truncate'>
                              in {product.category.name}
                            </span>
                          )}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className='p-4 text-center text-gray-500'>
                      <p className='text-sm'>No products found</p>
                    </div>
                  )}
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
