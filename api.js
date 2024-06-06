import axios from "axios";
const instance = axios.create({
  baseURL: "https://e-commerce-ten-rust.vercel.app",
  // baseURL: "http://192.168.0.167:3000",
});
export default instance;
