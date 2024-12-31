import { ordersService } from '@/api/services/orders.service';
import { useClearCart } from '@/features/cart/hooks/useCart';
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
  const { mutate: clearCart } = useClearCart();

  return useMutation({
    mutationKey: ['createOrder'],
    mutationFn: (order) => ordersService.addOrder(order),
    onSuccess: () => {
      toast.success('Order created successfully');
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['cart'] });
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
