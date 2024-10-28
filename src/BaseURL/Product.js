import { Axios } from "../../api";

export async function fetchProducts() {
  const response = await Axios.get("/product/allproduct");
  return response.data;
}
