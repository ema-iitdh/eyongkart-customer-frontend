import axios from "axios";
const instance = axios.create({
  baseURL: "http://139.59.24.128/api",
  // baseURL: "http://localhost:3000",
});
export default instance;
