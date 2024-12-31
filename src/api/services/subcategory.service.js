import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const subcategoryService = {
  getSubcategories: async ({ categoryId }) => {
    const response = await Axios.get(
      API_ENDPOINTS.subcategory.list(categoryId)
    );
    return response.data;
  },
  getSubcategoryById: async ({ subcategoryId }) => {
    const response = await Axios.get(
      API_ENDPOINTS.subcategory.getSubcategoryById(subcategoryId)
    );
    return response.data;
  },
};
