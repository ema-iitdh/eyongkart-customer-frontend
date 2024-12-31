import { wishlistService } from '@/api/services/wishlist.service';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  return useMutation({
    mutationKey: ['toggleWishlist'],
    mutationFn: wishlistService.toggleWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    enabled: isAuthenticated,
  });
};
