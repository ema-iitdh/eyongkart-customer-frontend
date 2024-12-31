import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const categoryService = {
  getCategories: async (filter = '') => {
    const response = await Axios.get(API_ENDPOINTS.categories.list(filter));
    return response.data;
  },
};
