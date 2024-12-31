import { useQuery } from '@tanstack/react-query';
import { productService } from '../../api/services/product.service';

export const useProducts = () => {
  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  return { products, isProductsLoading, productsError };
};
