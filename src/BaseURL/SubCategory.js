import { Axios } from "../../api";

export async function fetchSubCategory() {
  const response = await Axios.get(
    "/subCategory/674179a0bded14dc4d57d0bf/getSubCategory"
  );
  return response.data;
}
