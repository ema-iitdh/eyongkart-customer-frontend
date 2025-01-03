import Axios from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoints';

export const eyongkartInfoService = {
  getEyongkartInfo: async () => {
    const response = await Axios.get(
      API_ENDPOINTS.eyongkartInfo.getEyongkartInfo
    );
    return response.data;
  },

  updateEyongkartInfo: async (eyongkartInfoId, data) => {
    const response = await Axios.put(
      API_ENDPOINTS.eyongkartInfo.updateEyongkartInfo(eyongkartInfoId),
      data
    );
    return response.data;
  },
};
