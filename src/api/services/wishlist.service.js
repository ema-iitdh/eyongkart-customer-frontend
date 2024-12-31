import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const wishlistService = {
  getWishlist: async () => {
    const response = await Axios.get(API_ENDPOINTS.wishlist.list);
    return response.data;
  },
  toggleWishlist: async ({ productId, variantId }) => {
    console.log(productId, variantId, 'productId, variantId');
    const response = await Axios.post(API_ENDPOINTS.wishlist.toggle, {
      productId,
      variantId,
    });
    return response.data;
  },
};
