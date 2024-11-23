import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/public",
});

export default axiosInstance; 