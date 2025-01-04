import { AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCategory } from '@/features/category/hooks/useCategory';
import { ROUTES } from '@/constants/routes';

export default function CategoryDropdown() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const {
    data: filteredMenCategories,
    isLoading: filteredMenCategoriesLoading,
    isError: filteredMenCategoriesError,
  } = useCategory({ filter: 'gender=Male' });
  const {
    data: filteredWomenCategories,
    isLoading: filteredWomenCategoriesLoading,
    isError: filteredWomenCategoriesError,
  } = useCategory({
    filter: 'gender=Female',
  });
  const {
    data: filteredKidsCategories,
    isLoading: filteredKidsCategoriesLoading,
    isError: filteredKidsCategoriesError,
  } = useCategory({
    filter: 'gender=Kids',
  });
  const {
    data: filteredHandicraftCategories,
    isLoading: filteredHandicraftCategoriesLoading,
    isError: filteredHandicraftCategoriesError,
  } = useCategory({
    filter: 'gender=Unisex',
  });

  const filteredMen = filteredMenCategories?.categories || [];
  const filteredWomen = filteredWomenCategories?.categories || [];
  const filteredKids = filteredKidsCategories?.categories || [];
  const filteredHandicraft = filteredHandicraftCategories?.categories || [];

  return (
    <nav className='hidden lg:block'>
      <ul className='flex items-center gap-8 text-sm font-sans'>
        {[
          { title: 'MEN', items: filteredMen },
          { title: 'WOMEN', items: filteredWomen },
          { title: 'KIDS', items: filteredKids },
          { title: 'HANDICRAFT', items: filteredHandicraft },
        ].map(({ title, items }) => (
          <li
            key={title}
            className='relative group'
            onMouseEnter={() => setActiveDropdown(title)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <motion.button
              type='button'
              className='flex items-center gap-1 py-4 font-semibold hover:text-red-500 transition-colors'
              onClick={() =>
                setActiveDropdown(title === activeDropdown ? null : title)
              }
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {title}
              <motion.div
                animate={{ rotate: activeDropdown === title ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className='w-4 h-4' />
              </motion.div>
            </motion.button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeDropdown === title && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                  className='absolute top-full left-0 bg-white shadow-xl rounded-lg p-6 z-50'
                  style={{
                    width: 'max-content',
                    minWidth: '200px',
                    maxWidth: '800px',
                  }}
                >
                  {items.length === 0 && (
                    <div className='text-sm text-gray-500 font-medium'>
                      No categories found
                    </div>
                  )}
                  <div
                    className='grid gap-6'
                    style={{
                      gridTemplateColumns: `repeat(${Math.min(
                        items.length,
                        4
                      )}, minmax(150px, 1fr))`,
                    }}
                  >
                    {items.map((category) => (
                      <motion.div
                        key={category._id}
                        className='space-y-3'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <NavLink
                          to={`${ROUTES.COLLECTIONS}/${category.name}?category=${category._id}`}
                          className='block font-bold text-gray-800 hover:text-red-500 transition-colors tracking-wide'
                          onClick={() => setActiveDropdown(null)}
                        >
                          {category.name}
                        </NavLink>
                        <ul className='space-y-2'>
                          {category.subCategories
                            ?.sort((a, b) =>
                              a.subCategoryName.localeCompare(b.subCategoryName)
                            )
                            .map((subCategory) => (
                              <motion.li
                                key={subCategory._id}
                                whileHover={{ x: 5 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 300,
                                }}
                              >
                                <NavLink
                                  to={`${ROUTES.COLLECTIONS}/${subCategory.subCategoryName}?category=${category._id}&subcategory=${subCategory._id}`}
                                  className='text-sm text-gray-600 hover:text-red-500 transition-colors block font-medium'
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {subCategory.subCategoryName}
                                </NavLink>
                              </motion.li>
                            ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </nav>
  );
}
