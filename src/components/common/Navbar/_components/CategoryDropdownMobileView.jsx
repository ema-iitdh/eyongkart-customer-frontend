import { ROUTES } from '@/constants/routes';
import { useCategory } from '@/features/category/hooks/useCategory';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function CategoryDropdownMobileView({ toggleSidebar }) {
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
    <>
      {[
        { title: 'MEN', items: filteredMen },
        { title: 'WOMEN', items: filteredWomen },
        { title: 'KIDS', items: filteredKids },
        { title: 'HANDICRAFT', items: filteredHandicraft },
      ].map(({ title, items }) => (
        <div key={title} className='py-2'>
          <button
            type='button'
            onClick={() =>
              setActiveDropdown(activeDropdown === title ? null : title)
            }
            className='flex items-center justify-between w-full px-2 py-1.5 text-gray-700 hover:text-red-500 transition-colors'
          >
            <span>{title}</span>
            <ChevronDown
              className={`w-4 h-4 transform transition-transform ${
                activeDropdown === title ? 'rotate-180' : ''
              }`}
            />
          </button>

          {activeDropdown === title && (
            <div className='mt-2 pl-4 space-y-2'>
              {items.length === 0 && (
                <div className='text-sm text-gray-500'>No categories found</div>
              )}
              {items.map((category) => (
                <div key={category._id} className='space-y-1'>
                  <NavLink
                    to={`${ROUTES.COLLECTIONS}/${category.name}?category=${category._id}`}
                    className='block text-sm font-medium text-gray-700 hover:text-red-500'
                    onClick={toggleSidebar}
                  >
                    {category.name}
                  </NavLink>
                  <div className='pl-3 space-y-1'>
                    {category.subCategories?.map((subCategory) => (
                      <NavLink
                        key={subCategory._id}
                        to={`${ROUTES.COLLECTIONS}/${subCategory.subCategoryName}?category=${category._id}&subcategory=${subCategory._id}`}
                        className='block text-xs text-gray-600 hover:text-red-500'
                        onClick={toggleSidebar}
                      >
                        {subCategory.subCategoryName}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
