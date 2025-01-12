import { wishlistService } from '@/api/services/wishlist.service';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

export const useWishlist = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistService.getWishlist,
    enabled: isAuthenticated,
  });
};

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const loginRedirect = () => {
    navigate(ROUTES.LOGIN, { state: { from: location } });
  };

  return useMutation({
    mutationKey: ['toggleWishlist'],
    mutationFn: (...args) => {
      if (!isAuthenticated) {
        loginRedirect();
        throw new Error('User not authenticated');
      }
      return wishlistService.toggleWishlist(...args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    enabled: isAuthenticated,
  });
};
