import { Axios } from "../../api";

export async function fetchProducts() {
  const response = await Axios.get("/product/allproduct");
  return response.data;
}

//rating

export const fetchProductWithComments = async (productId) => {
  const response = await Axios.get(
    `/commentrating/comment/product/${productId}`
  );
  return response.data;
};
