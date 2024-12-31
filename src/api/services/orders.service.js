import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const ordersService = {
  getMyOrders: async () => {
    const response = await Axios.get(API_ENDPOINTS.orders.getMyOrders);
    return response.data;
  },
  getOrderById: async (orderId) => {
    const response = await Axios.get(
      API_ENDPOINTS.orders.getOrderById(orderId)
    );
    return response.data;
  },
  addOrder: async ({ amount, payment_type, products, shipping_address }) => {
    const response = await Axios.post(API_ENDPOINTS.orders.add, {
      amount, // total amount of the order + shipping cost
      payment_type, // COD, ONLINE PAYMENT
      products, // [{productId, variantId, quantity}]
      shipping_address, // {full_name, address_line1, address_line2, landmark, city, state, pincode, phone}
    });
    return response.data;
  },
  getShippingDetails: async (address) => {
    const response = await Axios.post(
      API_ENDPOINTS.orders.getShippingDetails,
      address
    );
    return response.data;
  },
};
