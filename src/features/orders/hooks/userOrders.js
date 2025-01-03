import { ordersService } from '@/api/services/orders.service';
import {
  useCart,
  useClearCart,
  useRemoveFromCart,
} from '@/features/cart/hooks/useCart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useShippingDetails = () => {
  return useMutation({
    mutationKey: ['shippingDetails'],
    mutationFn: ({ pincode, state, city }) =>
      ordersService.getShippingDetails({ pincode, state, city }),
  });
};
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { data: cartData } = useCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: clearCart } = useClearCart();

  return useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (order) => ordersService.addOrder(order),
    onSuccess: async (data, variables) => {
      toast.success('Order created successfully');

      // Get ordered items
      const orderedItems = variables.products || [];

      // Remove matching items from cart
      if (cartData?.cart) {
        try {
          // Find all matching items first
          const itemsToRemove = cartData.cart.filter((cartItem) => {
            return orderedItems.some(
              (orderItem) => orderItem.productId === cartItem.product._id
            );
          });

          // If all items in cart are ordered, clear the entire cart
          if (itemsToRemove.length === cartData.cart.length) {
            clearCart();
          } else {
            // Remove items one by one
            await Promise.all(
              itemsToRemove.map((item) => removeFromCart(item.product._id))
            );
          }

          // Invalidate cart query after all operations
          queryClient.invalidateQueries({ queryKey: ['cart'] });
        } catch (error) {
          console.error('Error removing items from cart:', error);
          toast.error('Failed to update cart after order creation');
        }
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetMyOrders = () => {
  return useQuery({
    queryKey: ['myOrders'],
    queryFn: ordersService.getMyOrders,
  });
};

export const useGetOrderById = (orderId) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => ordersService.getOrderById(orderId),
    enabled: !!orderId,
  });
};
