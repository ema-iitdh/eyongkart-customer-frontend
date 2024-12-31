import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const cartService = {
  getCart: async () => {
    const response = await Axios.get(API_ENDPOINTS.cart.list);
    return response.data;
  },
  addToCart: async ({ productId, quantity, variantId }) => {
    const response = await Axios.post(API_ENDPOINTS.cart.add, {
      productId,
      quantity,
      variantId,
    });
    return response.data;
  },
  removeFromCart: async (productId) => {
    const response = await Axios.delete(API_ENDPOINTS.cart.remove(productId));
    return response.data;
  },
  updateCart: async ({ productId, quantity, variantId }) => {
    const response = await Axios.put(API_ENDPOINTS.cart.update, {
      productId,
      quantity,
      variantId,
    });
    return response.data;
  },
  // !!! Implement this later
  clearCart: async () => {
    const response = await Axios.delete(API_ENDPOINTS.cart.clear);
    return response.data;
  },
};
