import { Axios } from "../../api";

export async function fetchFooter() {
  const response = await Axios.get("/footer/getfooter");
  return response.data;
}

export async function fetchFooterSub() {
  const response = await Axios.get("/footersub/getfootersub");
  return response.data;
}
