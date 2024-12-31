import { subcategoryService } from '@/api/services/subcategory.service';
import { useQuery } from '@tanstack/react-query';

export const useSubcategory = (categoryId) => {
  return useQuery({
    queryKey: ['subcategory', categoryId],
    queryFn: () => subcategoryService.getSubcategories(categoryId),
  });
};

export const useSubcategoryById = (id) => {
  return useQuery({
    queryKey: ['subcategory', id],
    queryFn: () => subcategoryService.getSubcategoryById(id),
  });
};
