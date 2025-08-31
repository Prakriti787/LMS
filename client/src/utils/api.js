import axios from "axios";
import Cookies from "js-cookie";

export const publicAPI = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export const privateAPI = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

privateAPI.interceptors.request.use((api) => {
  const token = Cookies.get("token");
  if (token) {
    api.headers.Authorization = `Bearer ${token}`;
  }
  return api;
});