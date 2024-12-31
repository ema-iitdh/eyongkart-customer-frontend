import { cartService } from '@/api/services/cart.service';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useCart = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['cart'],
    queryFn: cartService.getCart,
    enabled: isAuthenticated,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  return useMutation({
    mutationKey: ['addToCart'],
    mutationFn: cartService.addToCart,
    onSuccess: () => {
      toast.success('Product added to cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    enabled: isAuthenticated,
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  return useMutation({
    mutationKey: ['removeFromCart'],
    mutationFn: cartService.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    enabled: isAuthenticated,
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  return useMutation({
    mutationKey: ['updateCart'],
    mutationFn: cartService.updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    enabled: isAuthenticated,
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  return useMutation({
    mutationKey: ['clearCart'],
    mutationFn: cartService.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    enabled: isAuthenticated,
  });
};
