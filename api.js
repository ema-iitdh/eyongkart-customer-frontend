import axios from "axios";
const instance = axios.create({
  // baseURL: "https://e-commerce-ten-rust.vercel.app",

  baseURL: "http://139.59.24.128/api",
  // baseURL: "http://localhost:3000",
});
export default instance;
