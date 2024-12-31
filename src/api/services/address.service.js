import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const addressService = {
  addAddress: async (address) => {
    const response = await Axios.post(API_ENDPOINTS.address.add, {
      address,
    });
    return response.data;
  },
  updateAddress: async ({
    addressId,
    address,
    district,
    state,
    pincode,
    landmark,
    street,
    deliveredToWhom,
    phone,
  }) => {
    const response = await Axios.put(API_ENDPOINTS.address.update(addressId), {
      address,
      district,
      state,
      pincode,
      landmark,
      street,
      deliveredToWhom,
      phone,
    });
    return response.data;
  },
  deleteAddress: async (addressId) => {
    const response = await Axios.delete(
      API_ENDPOINTS.address.delete(addressId)
    );
    return response.data;
  },
  getMyAddress: async () => {
    const response = await Axios.get(API_ENDPOINTS.address.getMyAddress);
    return response.data;
  },
  setDefaultAddress: async (addressId) => {
    const response = await Axios.post(
      API_ENDPOINTS.address.setDefaultAddress(addressId)
    );
    return response.data;
  },
};
