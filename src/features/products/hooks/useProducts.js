import { productService } from '@/api/services/product.service';
import { useQuery } from '@tanstack/react-query';

export const useProducts = ({ filter = '' }, options) => {
  return useQuery({
    queryKey: ['products', filter],
    queryFn: () => {
      return productService.getProducts({ filter });
    },
    ...options,
  });
};

export const useCarouselProducts = () => {
  return useQuery({
    queryKey: ['carouselProducts'],
    queryFn: () => productService.getProducts({ filter: 'limit=50' }),
  });
};

export const useProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    cacheTime: 0,
    staleTime: 0,
    enabled: !!id,
  });
};

export const useProductByShopId = (shopId) => {
  return useQuery({
    queryKey: ['product', shopId],
    queryFn: () => productService.getProductByShopId(shopId),
    enabled: !!shopId,
  });
};
