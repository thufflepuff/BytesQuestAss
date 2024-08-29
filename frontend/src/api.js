import axios from 'axios';
import { ACCESS_TOKEN } from "./constants";

const apiUrl = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token && !config.url.includes('login') && !config.url.includes('register') && !config.url.includes('users')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
