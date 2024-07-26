import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error occurred:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
