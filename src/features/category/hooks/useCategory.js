import { categoryService } from '@/api/services/category.service';
import { useQuery } from '@tanstack/react-query';

export const useCategory = ({ filter = '' }) => {
  return useQuery({
    queryKey: ['categories', filter],
    queryFn: () => categoryService.getCategories(filter),
  });
};
