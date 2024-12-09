import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/", 
});

// Thêm interceptor để tự động cập nhật token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") 
      ? JSON.parse(localStorage.getItem("token")) 
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
