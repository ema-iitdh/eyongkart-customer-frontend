import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import HorizontalScrollerWithButton from './HorizontalScrollerWithButton';
import { cn } from '@/lib/utils';
import { v4 } from 'uuid';

const HorizontalScrollWithViewMore = ({
  children,
  className,
  initialItemsToShow = 4,
  itemClassName,
  onViewMore,
  showViewMore = true,
  buttonPosition = 'middle',
}) => {
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);

  // Calculate items to show based on screen width
  const calculateItemsToShow = () => {
    if (window.innerWidth < 640) return 4; // Mobile
    if (window.innerWidth < 1024) return 6; // Tablet
    return Math.max(8, initialItemsToShow); // Desktop - show at least 8 items
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(calculateItemsToShow());
    };

    // Set initial value
    setItemsToShow(calculateItemsToShow());

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [initialItemsToShow]);

  const displayedItems = React.Children.toArray(children).slice(0, itemsToShow);
  const hasMoreItems = React.Children.count(children) > itemsToShow;

  return (
    <div className='relative'>
      <div className='flex justify-between items-center mb-4'>
        <div /> {/* Empty div for spacing */}
        {showViewMore && hasMoreItems && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-colors'
            onClick={onViewMore}
          >
            View more
          </motion.button>
        )}
      </div>

      <HorizontalScrollerWithButton buttonPosition={buttonPosition}>
        {displayedItems.map((child, index) => {
          return (
            <motion.div
              key={v4()}
              className={cn('flex-shrink-0', itemClassName)}
              whileHover={{ y: -5 }}
            >
              {child}
            </motion.div>
          );
        })}
      </HorizontalScrollerWithButton>
    </div>
  );
};

export default memo(HorizontalScrollWithViewMore);
