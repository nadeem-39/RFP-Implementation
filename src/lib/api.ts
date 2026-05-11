const apiUrl = import.meta.env.VITE_API_URL;
import axios from "axios";
import { useAuthStore } from "./authStore";

const instance = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    // coming from useAuthStrore.
    const token = useAuthStore.getState().token;
    // console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
