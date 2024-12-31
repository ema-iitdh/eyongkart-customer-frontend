import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const authService = {
  login: async ({ email, password }) => {
    const response = await Axios.post(API_ENDPOINTS.auth.login, {
      email,
      password,
    });
    return response.data;
  },
  register: async ({ userName, email, password, phone }) => {
    const response = await Axios.post(API_ENDPOINTS.auth.register, {
      userName,
      email,
      password,
      phone,
    });
    return response.data;
  },
  logout: async () => {
    const response = await Axios.post(API_ENDPOINTS.auth.logout);
    return response.data;
  },
  // ! TODO: IMPLEMENT THIS LATER
  forgotPassword: async ({ email }) => {
    const response = await Axios.post(API_ENDPOINTS.auth.forgotPassword, {
      email,
    });
    return response.data;
  },
  resetPassword: async ({ email, password }) => {
    const response = await Axios.post(API_ENDPOINTS.auth.resetPassword, {
      email,
      password,
    });
    return response.data;
  },
  refresh: async () => {
    const response = await Axios.post(API_ENDPOINTS.auth.refresh);
    return response.data;
  },
};
