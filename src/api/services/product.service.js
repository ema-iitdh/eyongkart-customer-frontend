import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const productService = {
  getProducts: async ({ filter = '' }) => {
    const response = await Axios.get(API_ENDPOINTS.products.list(filter));
    return response.data;
  },

  getCarouselProducts: async () => {
    const response = await Axios.get(API_ENDPOINTS.products.carousel);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await Axios.get(API_ENDPOINTS.products.detail(id));
    return response.data;
  },

  getProductByShopId: async (shopId) => {
    const response = await Axios.get(
      API_ENDPOINTS.products.getProductByShopId(shopId)
    );
    return response.data;
  },
};
