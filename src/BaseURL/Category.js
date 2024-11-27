import { Axios } from "../../api";

export async function fetchCategory() {
  const response = await Axios.get("/category");
  return response.data;
}
