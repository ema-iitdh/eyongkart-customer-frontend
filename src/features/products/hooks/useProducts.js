import { productService } from '@/api/services/product.service';
import { useQuery } from '@tanstack/react-query';

export const useProducts = ({ filter = '' }) => {
  return useQuery({
    queryKey: ['products', filter],
    queryFn: () => productService.getProducts({ filter }),
  });
};

export const useProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    cacheTime: 0,
    staleTime: 0,
  });
};

export const useProductByShopId = (shopId) => {
  return useQuery({
    queryKey: ['product', shopId],
    queryFn: () => productService.getProductByShopId(shopId),
    enabled: !!shopId,
  });
};
