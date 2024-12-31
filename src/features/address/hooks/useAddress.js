import { addressService } from '@/api/services/address.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAddress = () => {
  return useQuery({
    queryKey: ['address'],
    queryFn: addressService.getMyAddress,
  });
};

export const useCreateAddress = () => {
  return useMutation({
    mutationKey: ['address'],
    mutationFn: addressService.addAddress,
    onSuccess() {
      toast.success('Address added successfully');
    },
    onError() {
      toast.error('Failed to add address');
    },
  });
};

export const useUpdateAddress = () => {
  return useMutation({
    mutationKey: ['address'],
    mutationFn: addressService.updateAddress,
  });
};

export const useDeleteAddress = () => {
  return useMutation({
    mutationKey: ['address'],
    mutationFn: addressService.deleteAddress,
    onSuccess() {
      toast.success('Address deleted successfully');
    },
    onError() {
      toast.error('Failed to delete address');
    },
  });
};
