import React, { useRef, useState, useEffect, memo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { v4 } from 'uuid';

const SCROLL_ANIMATION_DURATION = 300;

const HorizontalScrollerWithButton = ({
  children,
  title = '',
  description = '',
  viewAllLink,
  items = [],
  buttonStyle = 'rounded', // 'rounded' or 'rectangle'
}) => {
  const scrollContainerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Responsive scroll amount calculation
  const getScrollAmount = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || !container.children[0]) return 0;

    const itemWidth = container.children[0].offsetWidth;
    const gap = 16; // gap-4 equals 16px
    const width = window.innerWidth;

    // Calculate how many items to scroll based on screen size
    if (width < 640) return itemWidth + gap; // Scroll 1 item on mobile
    if (width < 1024) return (itemWidth + gap) * 2; // Scroll 2 items on tablet
    return (itemWidth + gap) * 3; // Scroll 3 items on desktop
  }, []);

  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;

    // Calculate current page based on scroll position
    const newCurrentPage =
      Math.ceil((scrollLeft / maxScroll) * totalPages) || 1;
    setCurrentPage(newCurrentPage);

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, [totalPages]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) {
      setCurrentPage(1);
      return;
    }

    const progress = scrollLeft / maxScroll;
    const newPage = Math.min(
      totalPages,
      Math.max(1, Math.ceil(progress * totalPages))
    );
    setCurrentPage(newPage);

    // Update scroll buttons visibility
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, [totalPages]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScrollability);
    checkScrollability();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [handleScroll, checkScrollability]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const totalItems = items.length || React.Children.count(children);
    const firstChild = container.querySelector('.scroll-item'); // Add this class to items

    if (!firstChild) {
      setTotalPages(1);
      return;
    }

    const itemWidth = firstChild.offsetWidth;
    const gap = 16; // gap-4
    const containerWidth = container.clientWidth - 32; // Account for padding
    const itemsPerView = Math.floor((containerWidth + gap) / (itemWidth + gap));

    // Ensure at least 1 page and accurate total pages
    const calculatedPages = Math.max(
      1,
      Math.ceil(totalItems / Math.max(1, itemsPerView))
    );
    setTotalPages(calculatedPages);
  }, [items, children]);

  const smoothScroll = useCallback(
    (direction) => {
      const container = scrollContainerRef.current;
      if (!container || isAnimating) return;

      const scrollAmount = getScrollAmount();
      setIsAnimating(true);

      if (direction === 'left') {
        container.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth',
        });
      } else {
        container.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });
      }

      setTimeout(() => setIsAnimating(false), SCROLL_ANIMATION_DURATION);
    },
    [getScrollAmount, isAnimating]
  );

  const getButtonStyles = useCallback(
    (direction) => {
      const baseStyles =
        'absolute top-1/2 -translate-y-1/2 bg-white shadow-lg transition-all flex items-center justify-center';

      if (buttonStyle === 'rounded') {
        return cn(
          baseStyles,
          direction === 'left' ? 'left-2' : 'right-2',
          'p-2 rounded-full w-10 h-10'
        );
      }

      return cn(
        baseStyles,
        direction === 'left' ? 'left-2' : 'right-2',
        'h-20 w-10 rounded-lg'
      );
    },
    [buttonStyle]
  );

  return (
    <div className='relative max-w-[1500px] mx-auto'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center gap-4'>
          {title && (
            <h2 className='text-xl font-bold text-gray-900'>{title}</h2>
          )}
        </div>
        {viewAllLink && (
          <a
            href={viewAllLink}
            className='text-sm text-blue-500 hover:text-blue-600 hover:underline whitespace-nowrap'
          >
            See more
          </a>
        )}
      </div>

      <div
        className='relative'
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Navigation buttons */}
        <div className='hidden md:block'>
          {/* Left Button */}
          <div
            onKeyDown={() =>
              !isAnimating && canScrollLeft && smoothScroll('left')
            }
            className={cn(
              'absolute inset-y-0 left-0 w-12 z-10 opacity-0 transition-opacity duration-200 cursor-pointer',
              showControls && 'opacity-100'
            )}
            onClick={() =>
              !isAnimating && canScrollLeft && smoothScroll('left')
            }
          >
            <button
              type='button'
              disabled={isAnimating || !canScrollLeft}
              className={cn(
                getButtonStyles('left'),
                canScrollLeft
                  ? 'hover:bg-gray-50'
                  : 'opacity-50 cursor-not-allowed',
                isAnimating && 'cursor-not-allowed'
              )}
              aria-label='Scroll left'
            >
              <ChevronLeft className='w-6 h-6' />
            </button>
          </div>

          {/* Right Button */}
          <div
            onKeyDown={() =>
              !isAnimating && canScrollRight && smoothScroll('right')
            }
            className={cn(
              'absolute inset-y-0 right-0 w-12 z-10 opacity-0 transition-opacity duration-200 cursor-pointer',
              showControls && 'opacity-100'
            )}
            onClick={() =>
              !isAnimating && canScrollRight && smoothScroll('right')
            }
          >
            <button
              type='button'
              disabled={isAnimating || !canScrollRight}
              className={cn(
                getButtonStyles('right'),
                canScrollRight
                  ? 'hover:bg-gray-50'
                  : 'opacity-50 cursor-not-allowed',
                isAnimating && 'cursor-not-allowed'
              )}
              aria-label='Scroll right'
            >
              <ChevronRight className='w-6 h-6' />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className={cn(
            'flex gap-4 overflow-x-auto scroll-smooth pb-4',
            'scrollbar-none md:hover:scrollbar-thin md:hover:scrollbar-track-transparent md:hover:scrollbar-thumb-gray-300'
          )}
          style={{
            gridAutoColumns: 'minmax(140px, 1fr)',
            '--scrollbar-thumb-height': '8px',
          }}
          onScroll={handleScroll}
        >
          <div className='flex gap-4'>
            {(items.length > 0 ? items : React.Children.toArray(children)).map(
              (item, index) => (
                <div key={item?.id || index} className='scroll-item'>
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HorizontalScrollerWithButton);
