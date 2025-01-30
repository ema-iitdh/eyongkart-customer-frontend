import React, { useState, useEffect, memo, useCallback } from 'react';
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
  title,
  description,
}) => {
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);

  const calculateItemsToShow = useCallback(() => {
    if (window.innerWidth < 640) return 8; // Mobile
    if (window.innerWidth < 1024) return 12; // Tablet
    return Math.max(15, initialItemsToShow); // Desktop
  }, [initialItemsToShow]);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(calculateItemsToShow());
    };

    setItemsToShow(calculateItemsToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateItemsToShow]);

  const displayedItems = React.Children.toArray(children).slice(0, itemsToShow);
  const hasMoreItems = React.Children.count(children) > itemsToShow;

  const wrappedItems = displayedItems.map((child, index) => (
    <motion.div
      key={v4()}
      className={cn('flex-shrink-0', itemClassName)}
      // whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {child}
    </motion.div>
  ));

  return (
    <div className='relative'>
      {
        <div className='flex justify-end mb-4'>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='px-4 mr-10 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md hover:from-orange-600 hover:to-orange-700 transition-colors'
            onClick={onViewMore}
          >
            See more
          </motion.button>
        </div>
      }

      <HorizontalScrollerWithButton
        buttonPosition={buttonPosition}
        items={wrappedItems}
        title={title}
        description={description}
      />
    </div>
  );
};

export default memo(HorizontalScrollWithViewMore);
