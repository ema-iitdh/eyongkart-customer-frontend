import axios from "axios";

// export const url = "https://eyongkart.com/api";
export const url = "https://e-commerce-ten-rust.vercel.app";
// baseURL: "https://e-commerce-ten-rust.vercel.app",
// baseURL: "http://localhost:3000",
export const Axios = axios.create({
  baseURL: url,
});
