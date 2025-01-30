import { cartService } from '@/api/services/cart.service';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();

  const loginRedirect = () => {
    navigate(ROUTES.LOGIN, { state: { from: location } });
  };

  return useMutation({
    mutationKey: ['addToCart'],
    mutationFn: (...args) => {
      if (!isAuthenticated) {
        loginRedirect();
        throw new Error('Please login and try again');
      }
      return cartService.addToCart(...args);
    },
    onSuccess: () => {
      toast.success('Product added to cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
    enabled: isAuthenticated,
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const loginRedirect = () => {
    navigate(ROUTES.LOGIN, { state: { from: location } });
  };

  return useMutation({
    mutationKey: ['removeFromCart'],
    mutationFn: ({ productId, variantId }) => {
      if (!isAuthenticated) {
        loginRedirect();
        throw new Error('Please login and try again');
      }
      return cartService.removeFromCart(productId, variantId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    enabled: isAuthenticated,
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const loginRedirect = () => {
    navigate(ROUTES.LOGIN, { state: { from: location } });
  };

  return useMutation({
    mutationKey: ['updateCart'],
    mutationFn: (...args) => {
      if (!isAuthenticated) {
        loginRedirect();
        throw new Error('Please login and try again');
      }
      return cartService.updateCart(...args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    enabled: isAuthenticated,
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const loginRedirect = () => {
    navigate(ROUTES.LOGIN, { state: { from: location } });
  };

  return useMutation({
    mutationKey: ['clearCart'],
    mutationFn: (...args) => {
      if (!isAuthenticated) {
        loginRedirect();
        throw new Error('Please login and try again');
      }
      return cartService.clearCart(...args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    enabled: isAuthenticated,
  });
};
