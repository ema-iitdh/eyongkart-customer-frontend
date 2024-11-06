import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../api";

export async function fetchProducts() {
  const response = await Axios.get("/product/allproduct");
  return response.data;
}

//rating
export async function fetchProductWithComments(productId) {
  const response = await Axios.get(
    `/commentrating/comment/product/${productId}`
  );
  return response.data;
}

export const useProductWithComments = (productId) => {
  return useQuery(["productWithComments", productId], () =>
    fetchProductWithComments(productId)
  );
};
