import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL,
  "Content-Type": "application/x-www-form-urlencoded",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = Object.assign({
        Authorization: `Bearer ${token}`,
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
