import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../api";

export async function fetchProducts() {
  const response = await Axios.get("/product/allproduct");
  return response.data;
}

//rating
const fetchProductWithComments = async (productId) => {
  const response = await Axios.get(`/products/${productId}/comments`);
  return response.data;
};

export const useProductWithComments = (productId) => {
  return useQuery(["productWithComments", productId], () =>
    fetchProductWithComments(productId)
  );
};
