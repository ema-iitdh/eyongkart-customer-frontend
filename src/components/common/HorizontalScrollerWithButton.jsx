import React, { useRef, useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HorizontalScrollerWithButton = ({
  children,
  buttonPosition = 'middle',
  title = '',
  description = '',
  minDiscount = 0,
}) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setHasOverflow(scrollWidth > clientWidth);
      updateScrollButtons();
    }
  }, [children]);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  console.log(minDiscount);

  return (
    <div className='relative'>
      {(title || buttonPosition === 'top') && (
        <div className='flex justify-between items-center mb-6'>
          {!title && !description && <div />}
          {title && (
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-2xl font-bold text-gray-800'>
                {title}
                {minDiscount !== 0 && (
                  <span className='ml-2 text-lg font-medium text-red-500'>
                    ({minDiscount}%+ OFF)
                  </span>
                )}
              </h2>
            </div>
          )}
          {description && <p className='text-gray-600'>{description}</p>}
          {buttonPosition === 'top' && (
            <div className='flex gap-2'>
              <button
                type='button'
                onClick={() => scroll('left')}
                className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
              >
                <ChevronLeft className='w-6 h-6' />
              </button>
              <button
                type='button'
                onClick={() => scroll('right')}
                className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
              >
                <ChevronRight className='w-6 h-6' />
              </button>
            </div>
          )}
        </div>
      )}

      {buttonPosition === 'middle' && hasOverflow && canScrollLeft && (
        <button
          type='button'
          onClick={() => scroll('left')}
          className='absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors hidden md:block'
          aria-label='Scroll left'
        >
          <ChevronLeft className='w-5 h-5 text-gray-600' />
        </button>
      )}

      <div
        className='relative'
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 7%, black 93%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 7%, black 93%, transparent)',
        }}
      >
        <motion.div
          ref={scrollContainerRef}
          className='flex gap-1  overflow-x-auto scroll-smooth px-5 lg:px-14 py-4'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' },
          }}
          onScroll={updateScrollButtons}
        >
          {children}
        </motion.div>
      </div>

      {buttonPosition === 'middle' && hasOverflow && canScrollRight && (
        <button
          type='button'
          onClick={() => scroll('right')}
          className='absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 rounded-full shadow-md hover:bg-white transition-colors hidden md:block'
          aria-label='Scroll right'
        >
          <ChevronRight className='w-5 h-5 text-gray-600' />
        </button>
      )}
    </div>
  );
};

export default memo(HorizontalScrollerWithButton);
